import { Construct } from "constructs";
import { App, Chart, ChartProps } from "cdk8s";

// imported constructs
import {
  KubeDeployment,
  KubePod,
  KubeService,
  IntOrString,
} from "./imports/k8s";

export class SshdNonstandardPortContainerChart extends Chart {
  constructor(scope: Construct, id: string, props: ChartProps = {}) {
    super(scope, id, props);

    const label = { app: "dvldb-sshd-nonstandard-port-container" };

    new KubeService(this, "service", {
      metadata: {
        name: "nonstandard-sshd-service",
      },

      spec: {
        type: "LoadBalancer",
        ports: [{ port: 8080, targetPort: IntOrString.fromNumber(8080) }],
        selector: label,
      },
    });

    new KubeDeployment(this, "deployment", {
      spec: {
        replicas: 2,
        selector: {
          matchLabels: label,
        },
        template: {
          metadata: { labels: label },
          spec: {
            containers: [
              {
                name: "sshdalpine",
                image: "rjulian/sshdalpine:latest",
                ports: [{ containerPort: 8080 }],
              },
            ],
          },
        },
      },
    });

    new KubePod(this, "sshclient", {
      spec: {
        containers: [
          {
            name: "sshdalpine-client",
            image: "rjulian/sshdalpine:latest",
            command: [
              "sh",
              "-c",
              'ssh -p 8080 -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no root@nonstandard-sshd-service.$(cat /var/run/secrets/kubernetes.io/serviceaccount/namespace).svc.cluster.local "sleep 500"',
            ],
          },
        ],
        initContainers: [
          {
            name: "init-sshd-service",
            image: "busybox:latest",
            command: [
              "sh",
              "-c",
              "until nslookup nonstandard-sshd-service.$(cat /var/run/secrets/kubernetes.io/serviceaccount/namespace).svc.cluster.local; do echo waiting for myservice; sleep 2; done",
            ],
          },
        ],
      },
    });
  }
}

const app = new App();
new SshdNonstandardPortContainerChart(
  app,
  "dvldb-sshd-nonstandard-port-container",
);
app.synth();
