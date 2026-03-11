import { validateProspect } from "../prospect-helpers";

describe("prospect creation validation", () => {
  test("rejects a blank company name", () => {
    const result = validateProspect({
      companyName: "",
      roleTitle: "Software Engineer",
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Company name is required");
  });

  test("rejects a blank role title", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "",
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Role title is required");
  });
});

describe("salary validation", () => {
  test("accepts a valid positive integer salary", () => {
    const result = validateProspect({
      companyName: "Acme",
      roleTitle: "Engineer",
      salary: 120000,
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test("accepts zero as a salary", () => {
    const result = validateProspect({
      companyName: "Acme",
      roleTitle: "Engineer",
      salary: 0,
    });

    expect(result.valid).toBe(true);
  });

  test("accepts null salary (field is optional)", () => {
    const result = validateProspect({
      companyName: "Acme",
      roleTitle: "Engineer",
      salary: null,
    });

    expect(result.valid).toBe(true);
  });

  test("accepts undefined salary (field is optional)", () => {
    const result = validateProspect({
      companyName: "Acme",
      roleTitle: "Engineer",
    });

    expect(result.valid).toBe(true);
  });

  test("rejects a negative salary", () => {
    const result = validateProspect({
      companyName: "Acme",
      roleTitle: "Engineer",
      salary: -1,
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Salary must be a non-negative number");
  });

  test("rejects a salary above 10,000,000", () => {
    const result = validateProspect({
      companyName: "Acme",
      roleTitle: "Engineer",
      salary: 10_000_001,
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Salary must be a non-negative number");
  });

  test("rejects a non-integer salary", () => {
    const result = validateProspect({
      companyName: "Acme",
      roleTitle: "Engineer",
      salary: 1.5,
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Salary must be a whole number");
  });

  test("rejects a string salary", () => {
    const result = validateProspect({
      companyName: "Acme",
      roleTitle: "Engineer",
      salary: "not-a-number",
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Salary must be a number");
  });
});
