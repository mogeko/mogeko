import { describe, it, expect } from "vitest";
import { isObject } from "@/index";

describe("isObject", () => {
  it("returns true for objects", () => {
    expect(isObject({})).toBe(true);
    expect(isObject({ a: 1 })).toBe(true);
  });

  it("returns false for non-objects", () => {
    expect(isObject(1)).toBe(false);
    expect(isObject(null)).toBe(false);
    expect(isObject(undefined)).toBe(false);
  });
});
