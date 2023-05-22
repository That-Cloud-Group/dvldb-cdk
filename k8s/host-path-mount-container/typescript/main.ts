import { Construct } from "constructs";
import { App, Chart, ChartProps } from "cdk8s";

// imported constructs
import { KubeDeployment, KubeService, IntOrString } from "./imports/k8s";

export class HostPathMountChart extends Chart {
  constructor(scope: Construct, id: string, props: ChartProps = {}) {
    super(scope, id, props);

    const label = { app: "host-path-mount-container" };

    new KubeService(this, "service", {
      spec: {
        type: "LoadBalancer",
        ports: [{ port: 80, targetPort: IntOrString.fromNumber(8080) }],
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
                name: "nginx",
                image: "nginx:latest",
                volumeMounts: [
                  { mountPath: "/mounted/", name: "host-mounted" },
                ],
                ports: [{ containerPort: 8080 }],
              },
            ],
            volumes: [
              {
                name: "host-mounted",
                hostPath: { path: "/var/log/" },
              },
            ],
          },
        },
      },
    });
  }
}

const app = new App();
new HostPathMountChart(app, "dvldb-host-path-mount-container");
app.synth();
