import { Log4shellContainerChart } from "./main";
import { Testing } from "cdk8s";

describe("Log4shellContainerChart synth", () => {
  test("Deploy service with vulnerable image", () => {
    const app = Testing.app();
    const chart = new Log4shellContainerChart(app, "test-chart");
    const results = Testing.synth(chart);

    // Basic infra tests
    expect(results.length).toEqual(2);
    expect(results[0].kind).toEqual("Service");
    expect(results[1].kind).toEqual("Deployment");

    // Guarantee insecure
    expect(
      results[1].spec.template.spec.containers[0].image
    ).toEqual("ghcr.io/christophetd/log4shell-vulnerable-app");

    //  Snapshot tests
    expect(results).toMatchSnapshot();
  });
});
