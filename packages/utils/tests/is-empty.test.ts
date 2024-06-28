import { describe, it, expect } from "vitest";
import { isEmpty } from "@/is-empty";

describe("isEmpty", () => {
  it("should return true", () => {
    expect(isEmpty({})).toBe(true);
    expect(isEmpty("")).toBe(true);
    expect(isEmpty([])).toBe(true);
  });

  it("should return false", () => {
    expect(isEmpty({ a: 1, b: 2 })).toBe(false);
    expect(isEmpty("text")).toBe(false);
    expect(isEmpty([1, 2])).toBe(false);
    expect(isEmpty(0)).toBe(false);
    expect(isEmpty(null)).toBe(false);
    expect(isEmpty(undefined)).toBe(false);
    expect(isEmpty(NaN)).toBe(false);
  });
});
