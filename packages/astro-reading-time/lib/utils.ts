const isObject = (val: any): boolean => !!val && typeof val === "object";

export function assocPath(path: string[], val: any, obj: Obj): Obj {
  if (path.length === 0) return val;

  const [idx, ...tail] = path;

  return Object.assign(obj, {
    [idx]: assocPath(tail, val, isObject(obj[idx]) ? obj[idx] : {}),
  });
}

type Obj = Record<string, any>;

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;

  describe("isObject", () => {
    it("returns true for objects", () => {
      expect(isObject({})).toBe(true);
      expect(isObject({ a: 1 })).toBe(true);
    });

    it("returns false for non-objects", () => {
      expect(isObject(1)).toBe(false);
      expect(isObject(null)).toBe(false);
      expect(isObject(undefined)).toBe(false);
    });
  });
}
