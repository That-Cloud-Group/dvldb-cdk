import { SshdNonstandardPortContainerChart } from "./main";
import { Testing } from "cdk8s";

describe("SshdNonstandardPortContainerChart synth", () => {
  test("Deploy service and set priveleged true", () => {
    const app = Testing.app();
    const chart = new SshdNonstandardPortContainerChart(app, "test-chart");
    const results = Testing.synth(chart);

    // Basic infra tests
    expect(results.length).toEqual(3);
    expect(results[0].kind).toEqual("Service");
    expect(results[1].kind).toEqual("Deployment");

    // Guarantee insecure
    expect(results[1].spec.template.spec.containers[0].image).toEqual(
      "rjulian/sshdalpine:latest",
    );

    expect(results[0].spec.ports[0].port).toEqual(8080);

    //  Snapshot tests
    expect(results).toMatchSnapshot();
  });
});
