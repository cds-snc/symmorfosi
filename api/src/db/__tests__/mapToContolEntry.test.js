const { mapToControlEntry } = require("../save");

const fixture = {
  origin: "cdssnc/pod-check-compliance:latest",
  timestamp: "2018-11-19T17:21:44Z",
  satisfies: ["CA-2 (2)", "RA-5", "SA-11", "SA-15 (4)"],
  passed: false,
  description: "The cluster uses Kube hunter for vulnerability scanning.",
  references: "kube-hunter",
  component: "Infrastructure",
  release: "60e61288-ef33-11e8-908e-06d86cf01138",
};

describe("mapToControlEntry", () => {
  it("parses file data", async () => {
    const result = await mapToControlEntry(fixture);
    expect(result.controls.length).toEqual(4);
    expect(result.controls[1].control).toEqual("RA-5");
  });
});
