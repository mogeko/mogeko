import { describe, expect, it } from "bun:test";
import { pick } from "@/pick";

describe("pick", () => {
  it("should pick specified keys from the object", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = pick(obj, ["a", "c"]);
    expect(result).toEqual({ a: 1, c: 3 });
  });

  it("should ignore keys that do not exist in the object", () => {
    const obj = { a: 1, b: 2 };
    const result = pick(obj, ["a", "c" as keyof typeof obj]);
    expect(result).toEqual({ a: 1 } as any);
  });

  it("should return an empty object if no keys are provided", () => {
    const obj = { a: 1, b: 2 };
    const result = pick(obj, []);
    expect(result).toEqual({});
  });

  it("should return an empty object if none of the keys exist in the object", () => {
    const obj = { a: 1, b: 2 };
    const result = pick(obj, [
      "c" as keyof typeof obj,
      "d" as keyof typeof obj,
    ]);
    expect(result).toEqual({} as any);
  });
});
