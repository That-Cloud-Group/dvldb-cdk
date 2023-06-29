import { Construct } from "constructs";
import { App, Chart, ChartProps } from "cdk8s";

// imported constructs
import { KubeDeployment, KubeService, IntOrString } from "./imports/k8s";

export class Log4shellContainerChart extends Chart {
  constructor(scope: Construct, id: string, props: ChartProps = {}) {
    super(scope, id, props);

    const label = { app: "dvldb-log4shell-container" };

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
                name: "tomcat",
                image: "ghcr.io/christophetd/log4shell-vulnerable-app",
                ports: [{ containerPort: 8080 }],
              },
            ],
          },
        },
      },
    });
  }
}

const app = new App();
new Log4shellContainerChart(app, "dvldb-log4shell-container");
app.synth();
