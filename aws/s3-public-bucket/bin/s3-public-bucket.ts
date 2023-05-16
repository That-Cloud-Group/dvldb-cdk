#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { S3PublicBucketStack } from '../lib/s3-public-bucket-stack';

const app = new cdk.App();
new S3PublicBucketStack(app, 'S3PublicBucketStack');
