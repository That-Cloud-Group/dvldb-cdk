import {ClusterAdminChart} from './main';
import {Testing} from 'cdk8s';

describe('Placeholder', () => {
  test('Empty', () => {
    const app = Testing.app();
    const chart = new ClusterAdminChart(app, 'test-chart');
    const results = Testing.synth(chart)
    
    // Basic infra tests
    expect(results.length).toEqual(2)
    expect(results[0].kind).toEqual("ServiceAccount")
    expect(results[1].kind).toEqual("ClusterRoleBinding")

    // Guarantee insecure
    expect(results[1].roleRef.name).toEqual("cluster-admin")
    expect(results[1].roleRef.kind).toEqual("ClusterRole")

    //  Snapshot tests
    expect(results).toMatchSnapshot();
  });
});
