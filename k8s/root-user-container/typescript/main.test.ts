import { RootContainerChart } from "./main";
import { Testing } from "cdk8s";

describe("RootContainerChart synth", () => {
  test("Service deployment and run as root", () => {
    const app = Testing.app();
    const chart = new RootContainerChart(app, "test-chart");
    const results = Testing.synth(chart);

    // Basic infra tests
    expect(results.length).toEqual(2);
    expect(results[0].kind).toEqual("Service");
    expect(results[1].kind).toEqual("Deployment");

    // Guarantee insecure
    expect(
      results[1].spec.template.spec.containers[0].securityContext.runAsUser
    ).toEqual(0);

    //  Snapshot tests
    expect(results).toMatchSnapshot();
  });
});
