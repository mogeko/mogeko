import { describe, expect, it } from "bun:test";
import { assocPath } from "@/assoc-path";

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

    expect(result).toEqual(2 as any);
  });

  it("if a path incloud a number", () => {
    const obj = { a: [1, { b: 2 }, 3] };
    const result = assocPath(["a", 1, "b"], 4, obj);

    expect(result).toEqual({ a: [1, { b: 4 }, 3] });
  });

  it("if a path ends with a number", () => {
    const obj = { a: { b: 1 } };
    const result = assocPath(["a", "b", 1], 2, obj);

    expect(result).toEqual({ a: { b: [undefined, 2] } });
  });

  it("throws an error for dangerous property names", () => {
    expect(() => assocPath(["__proto__"], 2, {})).toThrowError(
      /Invalid property name: __proto__/,
    );
    expect(() => assocPath(["constructor"], 2, {})).toThrowError(
      /Invalid property name: constructor/,
    );
    expect(() => assocPath(["prototype"], 2, {})).toThrowError(
      /Invalid property name: prototype/,
    );
  });
});
