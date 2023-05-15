# dvldb CDK 
![master](https://github.com/rjulian/dvldb-cdk/actions/workflows/master.yml/badge.svg)

An inventory of CDK generated Infrastructure as Code (IaC) templates that you can use to test your defenses against possible misconfigurations and vulnerable settings.

## Platforms

### Kubernetes

* [cluster-admin-used](./k8s/cluster-admin-used/) - deploys a ServiceAccount and a ClusterRoleBinding binding the default admin role to the new ServiceAccount.
* [privileged-container](./k8s/privileged-container/) - Runs a deployment featuring containers running with the SecurityContext setting "privileged" set to true.
* [root-user-container](./k8s/root-user-container/) - Runs a deployment featuring containers running as user 0 (root).

### AWS

### GCP

