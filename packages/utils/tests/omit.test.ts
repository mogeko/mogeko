import { describe, expect, it } from "bun:test";
import { omit } from "@/omit";

describe("omit", () => {
  it("should omit specified keys from the object", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = omit(obj, ["a", "c"]);
    expect(result).toEqual({ b: 2 });
  });

  it("should ignore keys that do not exist in the object", () => {
    const obj = { a: 1, b: 2 };
    const result = omit(obj, ["a", "c" as keyof typeof obj]);
    expect(result).toEqual({ b: 2 });
  });

  it("should return the original object if no keys are provided", () => {
    const obj = { a: 1, b: 2 };
    const result = omit(obj, []);
    expect(result).toEqual({ a: 1, b: 2 });
  });

  it("should return the original object if none of the keys exist in the object", () => {
    const obj = { a: 1, b: 2 };
    const result = omit(obj, [
      "c" as keyof typeof obj,
      "d" as keyof typeof obj,
    ]);
    expect(result).toEqual({ a: 1, b: 2 });
  });
});
