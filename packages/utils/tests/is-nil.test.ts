import { describe, it, expect } from "vitest";
import { isNil } from "@/is-nil";

describe("isNil", () => {
  it("should be true", () => {
    expect(isNil(null)).toBe(true);
    expect(isNil(undefined)).toBe(true);
    expect(isNil(NaN)).toBe(true);
  });

  it("should return false", () => {
    expect(isNil(0)).toBe(false);
    expect(isNil({})).toBe(false);
    expect(isNil("")).toBe(false);
    expect(isNil([])).toBe(false);
  });
});
