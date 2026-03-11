import type { Prospect } from "./schema";

export type InterestFilter = "All" | "High" | "Medium" | "Low";

export function filterProspectsByInterest(
  prospects: Prospect[],
  filter: InterestFilter,
): Prospect[] {
  if (filter === "All") return prospects;
  return prospects.filter((p) => p.interestLevel === filter);
}
