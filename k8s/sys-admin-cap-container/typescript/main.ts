import { Construct } from "constructs";
import { App, Chart, ChartProps } from "cdk8s";

// imported constructs
import { KubeDeployment, KubeService, IntOrString } from "./imports/k8s";

export class SysAdminCapChart extends Chart {
  constructor(scope: Construct, id: string, props: ChartProps = {}) {
    super(scope, id, props);

    const label = { app: "sys-admin-cap-container" };

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
                ports: [{ containerPort: 8080 }],
                securityContext: { capabilities: { add: ["SYS_ADMIN"] } },
              },
            ],
          },
        },
      },
    });
  }
}

const app = new App();
new SysAdminCapChart(app, "dvldb-sys-admin-cap-container");
app.synth();
