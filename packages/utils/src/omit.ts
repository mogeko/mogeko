/**
 * Omit properties from an object, returning a new object without the specified keys.
 *
 * @param obj - The source object
 * @param keys - The keys to omit
 * @returns A new object without the omitted keys
 *
 * @example
 * ```typescript
 * const obj = { a: 1, b: 2, c: 3 };
 * omit(obj, ['a', 'c']); //=> { b: 2 }
 * ```
 */

export function omit<U extends object, Keys extends keyof U>(
  obj: U,
  names: readonly Keys[],
): Omit<U, Keys> {
  const result = structuredClone(obj);

  for (const key of names) {
    if (key in result) {
      delete result[key];
    }
  }

  return result;
}
