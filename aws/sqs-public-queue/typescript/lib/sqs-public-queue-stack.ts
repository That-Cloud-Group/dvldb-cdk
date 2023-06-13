import { Duration, Stack, StackProps } from "aws-cdk-lib";
import * as sqs from "aws-cdk-lib/aws-sqs";
import * as iam from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";

export class SqsPublicQueueStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const queue = new sqs.Queue(this, "SqsPublicQueueQueue", {
      visibilityTimeout: Duration.seconds(300),
    });

    queue.addToResourcePolicy(
      new iam.PolicyStatement({
        actions: ["sqs:ReceiveMessage"],
        resources: [queue.queueArn],
        principals: [new iam.StarPrincipal()],
      })
    );
  }
}
