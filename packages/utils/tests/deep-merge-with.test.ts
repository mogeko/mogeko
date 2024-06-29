import { describe, it, expect } from "vitest";
import { deepMergeWith } from "@/deep-merge-with";

describe("deepMergeWith", () => {
  it("merges objects", () => {
    const merge = deepMergeWith((a: number, b: number) => a + b);
    expect(merge({ a: 1, b: 2 }, { b: 3, c: 4 })).toEqual({ a: 1, b: 5, c: 4 });
  });

  it("merges arrays", () => {
    const merge = deepMergeWith((a, b) => a + b);
    expect(merge([1, 2], [3, 4])).toEqual([4, 6]);
  });

  it("merges nested objects", () => {
    const merge = deepMergeWith((a: number[], b: number[]) => a.concat(b));
    expect(
      merge({ a: true, c: [1, 2, 3] }, { b: false, c: [4, 5, 6] }),
    ).toEqual({ a: true, b: false, c: [1, 2, 3, 4, 5, 6] });
  });

  it("merges nested objects and null", () => {
    const merge = deepMergeWith((a, _b) => a);
    expect(merge({ a: 1, b: [2] }, null)).toEqual({ a: 1, b: [2] });
    expect(merge(null, { a: 1, b: [2] })).toEqual(null);
  });
});
