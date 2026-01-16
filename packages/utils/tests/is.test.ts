import { describe, expect, it } from "bun:test";
import { is } from "@/is";

describe("is", () => {
  it("should return true", () => {
    expect(is(Object, {})).toBe(true);
    expect(is(Object, [])).toBe(true);
    expect(is(String, "")).toBe(true);
    expect(is(String, new String(""))).toBe(true);
    expect(is(Array, [])).toBe(true);
    expect(is(Number, 0)).toBe(true);
    expect(is(Boolean, false)).toBe(true);
    expect(is(Function, () => {})).toBe(true);
  });

  it("should return false", () => {
    expect(is(Object, "")).toBe(false);
    expect(is(String, 0)).toBe(false);
    expect(is(String, new Number(0))).toBe(false);
    expect(is(Array, {})).toBe(false);
    expect(is(Number, "")).toBe(false);
    expect(is(Boolean, 0)).toBe(false);
    expect(is(Function, {})).toBe(false);
  });
});
