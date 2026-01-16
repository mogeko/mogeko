import { describe, expect, it } from "bun:test";

import { memoize } from "@/memoize";

describe("memoize", () => {
  it("memoizes a function", () => {
    const fn = memoize((a: number, b: number) => a + b);

    expect(fn(1, 2)).toBe(3);
    expect(fn.cache instanceof Map).toBe(true);
    expect(fn.cache).toEqual(new Map([[1, 3]]));
  });

  it("memoizes a function with a custom hasher", () => {
    const fn = memoize(
      (a: number, b: number) => a + b,
      (a, b) => a + b,
    );

    expect(fn(1, 2)).toBe(3);
    expect(fn.cache instanceof Map).toBe(true);
    expect(fn.cache).toEqual(new Map([[3, 3]]));
  });
});
