import { filterProspectsByInterest } from "@shared/filter-helpers";
import type { Prospect } from "@shared/schema";

function makeProspect(id: number, interestLevel: string): Prospect {
  return {
    id,
    companyName: `Company ${id}`,
    roleTitle: "Engineer",
    jobUrl: null,
    status: "Bookmarked",
    interestLevel,
    notes: null,
    salary: null,
    createdAt: new Date(),
  };
}

const prospects = [
  makeProspect(1, "High"),
  makeProspect(2, "Medium"),
  makeProspect(3, "Low"),
  makeProspect(4, "High"),
];

describe("filterProspectsByInterest", () => {
  test("returns all prospects when filter is All", () => {
    expect(filterProspectsByInterest(prospects, "All")).toHaveLength(4);
  });

  test("filters to only High interest prospects", () => {
    const result = filterProspectsByInterest(prospects, "High");
    expect(result).toHaveLength(2);
    expect(result.every((p) => p.interestLevel === "High")).toBe(true);
  });

  test("filters to only Medium interest prospects", () => {
    const result = filterProspectsByInterest(prospects, "Medium");
    expect(result).toHaveLength(1);
    expect(result[0].interestLevel).toBe("Medium");
  });

  test("filters to only Low interest prospects", () => {
    const result = filterProspectsByInterest(prospects, "Low");
    expect(result).toHaveLength(1);
    expect(result[0].interestLevel).toBe("Low");
  });

  test("returns empty array when no prospects match the filter", () => {
    const highOnly = [makeProspect(1, "High")];
    expect(filterProspectsByInterest(highOnly, "Low")).toHaveLength(0);
  });

  test("handles an empty prospects array", () => {
    expect(filterProspectsByInterest([], "High")).toHaveLength(0);
  });
});
