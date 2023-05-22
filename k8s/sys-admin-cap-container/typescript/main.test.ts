import { SysAdminCapChart } from "./main";
import { Testing } from "cdk8s";

describe("SysAdminCap synth", () => {
  test("Service deployment and capabilities add", () => {
    const app = Testing.app();
    const chart = new SysAdminCapChart(app, "test-chart");
    const results = Testing.synth(chart);

    // Basic infra tests
    expect(results.length).toEqual(2);
    expect(results[0].kind).toEqual("Service");
    expect(results[1].kind).toEqual("Deployment");

    // Guarantee insecure
    expect(
      results[1].spec.template.spec.containers[0].securityContext.capabilities
        .add[0]
    ).toEqual("SYS_ADMIN");

    //  Snapshot tests
    expect(results).toMatchSnapshot();
  });
});
