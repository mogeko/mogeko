import { assocPath } from "@/lib/utils";
import { describe, it, expect } from "vitest";

describe("assocPath", () => {
  it("sets a value at a path", () => {
    const obj = { a: { b: { c: 1 } } };
    const result = assocPath(["a", "b", "d"], 2, obj);

    expect(result).toEqual({ a: { b: { c: 1, d: 2 } } });
  });

  it("creates nested objects if they don't exist", () => {
    const obj = {};
    const result = assocPath(["a", "b", "c"], 1, obj);

    expect(result).toEqual({ a: { b: { c: 1 } } });
  });

  it("overwrites existing values", () => {
    const obj = { a: { b: { c: 1 } } };
    const result = assocPath(["a", "b", "c"], 2, obj);

    expect(result).toEqual({ a: { b: { c: 2 } } });
  });

  it("sets a value at the root", () => {
    const obj = { a: { b: { c: 1 } } };
    const result = assocPath([], 2, obj);

    expect(result).toEqual(2);
  });
});
