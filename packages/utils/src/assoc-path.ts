import { is } from "@/is";

/**
 * Makes a shallow clone of an object, setting or overriding the nodes required
 * to create the given path, and placing the specific value at the tail end of
 * that path. Note that this copies and flattens prototype properties onto the
 * new object as well. All non-primitive properties are copied by reference.
 *
 * @param path - the path to set
 * @param value - The new value
 * @param obj -  The object to clone
 * @return A new object equivalent to the original except along the specified path.
 *
 * @example
 * ```typescript
 * assocPath(["a", "b", "c"], 42, {a: {b: {c: 0}}}); //=> {a: {b: {c: 42}}}
 * // Any missing or non-object keys in path will be overridden
 * assocPath(["a", "b", "c"], 42, {a: 5});           //=> {a: {b: {c: 42}}}
 * // If the path includes a number, it will create an array
 * assocPath(["a", "b", 1, "c"], 42, {a: 5});        //=> {a: {b: [undefined, {c: 42}]}}
 * ```
 */
export function assocPath(path: Path, value: any, obj: Obj): Obj {
  if (path.length === 0) return value;

  const [idx, ...tail] = path as [Path[0], ...Path];
  const next = is(Object, obj[idx]) ? obj[idx] : is(Number, tail[0]) ? [] : {};

  return Object.assign(obj, { [idx]: assocPath(tail, value, next) });
}

type Path = (string | number)[];
type Obj = Record<string, any>;
