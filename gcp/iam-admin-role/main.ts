import { Construct } from "constructs";
import { App, TerraformStack, TerraformVariable } from "cdktf";
import { GoogleProvider } from "./.gen/providers/google/provider";
import {
  ProjectIamMember,
  ProjectIamMemberConfig,
} from "./.gen/providers/google/project-iam-member";
import { ServiceAccount } from "./.gen/providers/google/service-account";

class IamAdmin extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new GoogleProvider(this, "Google", {
      region: "us-central1",
      zone: "us-central1-c",
    });

    const serviceAccount = new ServiceAccount(this, "AdminServiceAccount", {
      accountId: "dvldb",
      displayName: "DVLDB",
    });
    const projectId = new TerraformVariable(this, "projectId", {
      type: "String",
      description: "Project ID to make IAM service account.",
    });
    const orgMemberConfig: ProjectIamMemberConfig = {
      project: projectId.toString(),
      role: "roles/owner",
      member: serviceAccount.email,
    };
    new ProjectIamMember(this, "iamMember", orgMemberConfig);
    // define resources here
  }
}

const app = new App();
new IamAdmin(app, "iam-admin-role");
app.synth();
