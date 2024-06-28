import { describe, it, expect } from "vitest";
import { cn } from "@/cn";

describe("cn", () => {
  it("returns a string", () => {
    expect(cn("a", "b", "c")).toBe("a b c");
  });

  it("filters out falsy values", () => {
    expect(cn("a", undefined, "b", null, "c")).toBe("a b c");
  });

  it("merges objects", () => {
    expect(cn({ a: true, b: false }, { c: true })).toBe("a c");
  });

  it("merges arrays", () => {
    expect(cn(["a", "b"], ["c"])).toBe("a b c");
  });

  it("merges arrays and objects", () => {
    expect(cn(["a", "b"], { c: true })).toBe("a b c");
  });

  it("merges arrays and objects and filters out falsy values", () => {
    expect(cn(["a", "b"], undefined, { c: true }, null)).toBe("a b c");
  });
});
