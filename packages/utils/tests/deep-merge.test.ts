import { describe, it, expect } from "vitest";
import { deepMerge } from "@/deep-merge";

describe("deepMerge", () => {
  it("merges objects", () => {
    const result = deepMerge({ a: 1, b: 2 }, { b: 3, c: 4 });
    expect(result).toEqual({ a: 1, b: 3, c: 4 });
  });

  it("merges arrays", () => {
    expect(deepMerge([1, 2], [3, 4])).toEqual([3, 4]);
  });

  it("merges nested objects", () => {
    expect(
      deepMerge(
        { a: 1, b: { c: 2 }, d: { c: 3 } },
        { a: { c: 4 }, b: { c: 5 }, d: 6 },
      ),
    ).toEqual({ a: { c: 4 }, b: { c: 5 }, d: { c: 3 } });
  });

  it("merges nested arrays", () => {
    expect(deepMerge([1, [2]], [3, [4]])).toEqual([3, [4]]);
  });

  it("merges nested objects and null", () => {
    expect(deepMerge({ a: 1, b: [2] }, null)).toEqual({ a: 1, b: [2] });
    expect(deepMerge(null, { a: 1, b: [2] })).toEqual({ a: 1, b: [2] });
  });
});
