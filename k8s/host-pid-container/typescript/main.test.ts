import { HostPidChart } from "./main";
import { Testing } from "cdk8s";

describe("HostPid synth", () => {
  test("Service deployment and HostPid value", () => {
    const app = Testing.app();
    const chart = new HostPidChart(app, "test-chart");
    const results = Testing.synth(chart);

    // Basic infra tests
    expect(results.length).toEqual(2);
    expect(results[0].kind).toEqual("Service");
    expect(results[1].kind).toEqual("Deployment");

    // Guarantee insecure
    expect(results[1].spec.template.spec.hostPID).toEqual(true);

    //  Snapshot tests
    expect(results).toMatchSnapshot();
  });
});
