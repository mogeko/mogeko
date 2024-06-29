import { describe, it, expect } from "vitest";
import { deepMergeWith } from "@/deep-merge-with";

describe("deepMergeWith", () => {
  it("merges objects", () => {
    const merge = deepMergeWith((a, b) => a + b);
    expect(merge({ a: 1, b: 2 }, { b: 3, c: 4 })).toEqual({ a: 1, b: 5, c: 4 });
  });

  it("merges arrays", () => {
    const merge = deepMergeWith((a: number, b: number) => a + b);
    expect(merge([1, 2], [3, 4])).toEqual([4, 6]);
  });

  it("merges nested objects", () => {
    const merge = deepMergeWith((a, b) => a + b);
    expect(
      merge(
        { a: 1, b: { c: 2 }, d: { c: 3 } },
        { a: { c: 4 }, b: { c: 5 }, d: 6 },
      ),
    ).toEqual({ a: { c: 4 }, b: { c: 7 }, d: { c: 3 } });
  });

  it("merges nested arrays", () => {
    const merge = deepMergeWith((a: number, b: number) => a + b);
    expect(merge([1, [2]], [3, [4]])).toEqual([4, [6]]);
  });

  it("merges nested objects and null", () => {
    const merge = deepMergeWith((a, b) => a + b);
    expect(merge({ a: 1, b: [2] }, null)).toEqual({ a: 1, b: [2] });
    expect(merge(null, { a: 1, b: [2] })).toEqual({ a: 1, b: [2] });
  });
});
