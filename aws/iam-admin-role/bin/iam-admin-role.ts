#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { IamAdminRoleStack } from '../lib/iam-admin-role-stack';

const app = new cdk.App();
new IamAdminRoleStack(app, 'IamAdminRoleStack');
