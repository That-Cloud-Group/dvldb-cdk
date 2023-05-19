import * as kplus from "cdk8s-plus-26";
import { Construct } from "constructs";
import { App, Chart, ChartProps } from "cdk8s";

import { KubeClusterRoleBinding } from "./imports/k8s";
// imported constructs

export class ClusterAdminChart extends Chart {
  constructor(scope: Construct, id: string, props: ChartProps = {}) {
    super(scope, id, props);

    const serviceAccount = new kplus.ServiceAccount(
      this,
      "DvlDbAdminServiceAccount"
    );
    new KubeClusterRoleBinding(this, "AdminRoleBinding", {
      metadata: { name: "dvldb-cluster-admin" },
      roleRef: {
        apiGroup: "rbac.authorization.k8s.io",
        kind: "ClusterRole",
        name: "cluster-admin",
      },
      subjects: [
        {
          kind: "ServiceAccount",
          name: serviceAccount.name,
          namespace: "default",
        },
      ],
    });
  }
}

const app = new App();
new ClusterAdminChart(app, "dvldb-cluster-admin-used");
app.synth();
