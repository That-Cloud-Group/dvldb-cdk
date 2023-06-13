#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { SqsPublicQueueStack } from "../lib/sqs-public-queue-stack";

const app = new cdk.App();
new SqsPublicQueueStack(app, "SqsPublicQueueStack");
