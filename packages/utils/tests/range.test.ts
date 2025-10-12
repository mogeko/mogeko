import { describe, expect, it } from "vitest";
import { range } from "@/range";

describe("range", () => {
  it("creates a range from 0 to n", () => {
    expect(range(5)).toEqual([0, 1, 2, 3, 4]);
  });

  it("creates a range from m to n", () => {
    expect(range(2, 5)).toEqual([2, 3, 4]);
  });

  it("creates a range from m to n with a step", () => {
    expect(range(0, 10, 2)).toEqual([0, 2, 4, 6, 8]);
  });
});
