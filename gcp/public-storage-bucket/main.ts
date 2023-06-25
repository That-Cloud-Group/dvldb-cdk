import { Construct } from "constructs";
import { App, TerraformStack } from "cdktf";
import { GoogleProvider } from "./.gen/providers/google/provider";
import {
  StorageBucket,
  StorageBucketConfig,
} from "./.gen/providers/google/storage-bucket";
import {
  StorageBucketIamPolicy,
  StorageBucketIamPolicyConfig,
} from "./.gen/providers/google/storage-bucket-iam-policy";
import {
  DataGoogleIamPolicy,
  DataGoogleIamPolicyConfig,
  DataGoogleIamPolicyBinding,
} from "./.gen/providers/google/data-google-iam-policy";

class PublicStorageBucket extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new GoogleProvider(this, "Google", {
      region: "us-central1",
      zone: "us-central1-c",
    });

    const bucketConfig: StorageBucketConfig = {
      name: "PublicBucket",
      location: "us-central1-c",
      publicAccessPrevention: "false",
    };

    const publicBucket = new StorageBucket(this, "PublicBucket", bucketConfig);

    const policyBinding: DataGoogleIamPolicyBinding = {
      members: ["allUsers"],
      role: "roles/storage.objectViewer",
    };
    const policyConfig: DataGoogleIamPolicyConfig = {
      binding: [policyBinding],
    };
    const publicIamPolicy = new DataGoogleIamPolicy(
      this,
      "PublicPolicy",
      policyConfig
    );
    const bucketPolicyConfig: StorageBucketIamPolicyConfig = {
      bucket: publicBucket.name,
      policyData: publicIamPolicy.policyData,
    };
    new StorageBucketIamPolicy(this, "BucketPolicy", bucketPolicyConfig);
  }
}

const app = new App();
new PublicStorageBucket(app, "public-storage-bucket");
app.synth();
