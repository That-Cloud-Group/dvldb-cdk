import * as cdk from "aws-cdk-lib";
import { Template, Match } from "aws-cdk-lib/assertions";
import * as S3PublicBucket from "../lib/s3-public-bucket-stack";

test("Public S3 Bucket Created", () => {
  const app = new cdk.App();
  // WHEN
  const stack = new S3PublicBucket.S3PublicBucketStack(app, "MyTestStack");
  // THEN

  const template = Template.fromStack(stack);

  template.hasResourceProperties("AWS::S3::BucketPolicy", {
    PolicyDocument: {
      Statement: [
        {
          Action: "s3:GetObject",
          Effect: "Allow",
          Principal: "*",
        },
      ],
    },
  });
  template.resourceCountIs("AWS::S3::Bucket", 1);
});
