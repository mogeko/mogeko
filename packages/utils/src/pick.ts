/**
 * Creates a new object by picking specified keys from the original object.
 *
 * @param obj - The source object
 * @param keys - The keys to pick
 * @returns A new object with only the picked keys
 *
 * @example
 * ```typescript
 * const obj = { a: 1, b: 2, c: 3 };
 * pick(obj, ['a', 'c']); //=> { a: 1, c: 3 }
 * ```
 */
export function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
): Pick<T, K> {
  const result = {} as Pick<T, K>;

  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key];
    }
  }

  return result;
}
