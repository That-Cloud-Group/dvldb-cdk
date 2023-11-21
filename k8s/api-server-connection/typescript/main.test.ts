import { ApiServerConnectionContainerChart } from "./main";
import { Testing } from "cdk8s";

describe("ApiServerConnectionContainerChart synth", () => {
  test("Deploy service and set priveleged true", () => {
    const app = Testing.app();
    const chart = new ApiServerConnectionContainerChart(app, "test-chart");
    const results = Testing.synth(chart);

    // Basic infra tests
    expect(results.length).toEqual(2);
    expect(results[0].kind).toEqual("Service");
    expect(results[1].kind).toEqual("Deployment");

    // Guarantee insecure
    expect(
      results[1].spec.template.spec.containers[0].command
    ).toEqual(["curl"]);

    //  Snapshot tests
    expect(results).toMatchSnapshot();
  });
});
