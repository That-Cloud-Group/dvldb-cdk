import { Stack, StackProps } from "aws-cdk-lib";
import * as iam from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";

export class IamAdminRoleStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const alexaRole = new iam.Role(this, "DVLDBAdminRole", {
      assumedBy: new iam.ServicePrincipal("alexa.amazonaws.com"),
      description: "Example superadmin role deployed by DVLDB",
    });

    alexaRole.addToPolicy(
      new iam.PolicyStatement({
        resources: ["*"],
        actions: ["*"],
      })
    );
  }
}
