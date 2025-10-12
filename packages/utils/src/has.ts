import { isNil } from "@/is-nil";

/**
 * Returns whether or not an object has an own property with the specified name
 *
 * @param key - The name of the property to check for.
 * @param obj - The object to query.
 * @return Whether the property exists.
 *
 * @example
 * ```typescript
 * has("a", { a: 1 }); //=> true
 * has("a", { b: 1 }); //=> false
 * has("a", null);     //=> false
 * ```
 */
export function has<K extends PropertyKey>(
  key: K,
  obj: unknown,
): obj is ObjectHavingSome<K> {
  return !isNil(obj) && Object.hasOwn(obj, key);
}

type ObjectHavingSome<Key extends PropertyKey> = {
  [K in Key]: { [P in K]: unknown };
}[Key];
