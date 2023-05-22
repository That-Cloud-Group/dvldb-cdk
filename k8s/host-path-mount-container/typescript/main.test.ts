import { HostPathMountChart } from "./main";
import { Testing } from "cdk8s";

describe("HostPathMount synth", () => {
  test("Service deployment and volume mount", () => {
    const app = Testing.app();
    const chart = new HostPathMountChart(app, "test-chart");
    const results = Testing.synth(chart);

    // Basic infra tests
    expect(results.length).toEqual(2);
    expect(results[0].kind).toEqual("Service");
    expect(results[1].kind).toEqual("Deployment");

    // Guarantee insecure
    expect(
      results[1].spec.template.spec.containers[0].volumeMounts.length
    ).toEqual(1);
    expect(results[1].spec.template.spec.volumes[0].hostPath.path).toEqual(
      "/var/log/"
    );

    //  Snapshot tests
    expect(results).toMatchSnapshot();
  });
});
