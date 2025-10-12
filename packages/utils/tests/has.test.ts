import { describe, expect, it } from "vitest";
import { has } from "@/has";

describe("has", () => {
  it("returns true if the object has the key", () => {
    expect(has("a", { a: 1 })).toBe(true);
  });

  it("returns false if the object does not have the key", () => {
    expect(has("a", { b: 1 })).toBe(false);
  });

  it("returns false if the object is null", () => {
    expect(has("a", null)).toBe(false);
  });
});
