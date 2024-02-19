const isObject = (val: any): boolean => !!val && typeof val === "object";

export function assocPath(path: Path, val: any, obj: Obj): Obj {
  if (path.length === 0) return val;

  const [idx, ...tail] = path as [Path[0], ...Path];
  const next = isObject(obj[idx]) ? obj[idx] : {};

  return Object.assign(obj, {
    [idx]: assocPath(tail, val, next),
  });
}

type Path = (string | number)[];
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
