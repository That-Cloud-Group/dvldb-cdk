import * as cdk from "aws-cdk-lib";
import { Template, Match } from "aws-cdk-lib/assertions";
import * as SqsPublicQueue from "../lib/sqs-public-queue-stack";

test("SQS Queue Created With Public Policy", () => {
  const app = new cdk.App();
  // WHEN
  const stack = new SqsPublicQueue.SqsPublicQueueStack(app, "MyTestStack");
  // THEN

  const template = Template.fromStack(stack);

  template.hasResourceProperties("AWS::SQS::QueuePolicy", {
    PolicyDocument: {
      Statement: [
        {
          Action: "sqs:ReceiveMessage",
          Effect: "Allow",
          Principal: "*",
        },
      ],
    },
  });
  template.resourceCountIs("AWS::SQS::Queue", 1);
});
