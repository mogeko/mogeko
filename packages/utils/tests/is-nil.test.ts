import { isNil } from "@/is-nil";
import { describe, expect, it } from "vitest";

describe("isNil", () => {
  it("should be true", () => {
    expect(isNil(null)).toBe(true);
    expect(isNil(undefined)).toBe(true);
    expect(isNil(Number.NaN)).toBe(true);
  });

  it("should return false", () => {
    expect(isNil(0)).toBe(false);
    expect(isNil({})).toBe(false);
    expect(isNil("")).toBe(false);
    expect(isNil([])).toBe(false);
  });
});
