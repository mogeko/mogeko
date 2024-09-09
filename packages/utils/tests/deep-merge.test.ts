import { deepMerge } from "@/deep-merge";
import { describe, expect, it } from "vitest";

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
        { name: "fred", age: 10, contact: { email: "moo@example.com" } },
        { age: 40, contact: { email: "baa@example.com" } },
      ),
    ).toEqual({ name: "fred", age: 40, contact: { email: "baa@example.com" } });
  });

  it("merges nested arrays", () => {
    expect(deepMerge([1, [2]], [3, [4]])).toEqual([3, [4]]);
  });

  it("merges nested objects and null", () => {
    expect(deepMerge(null, { a: 1, b: [2] })).toEqual({ a: 1, b: [2] });
    expect(deepMerge({ a: 1, b: [2] }, null)).toEqual(null);
  });
});
