import { isNil } from "@/is-nil";

/**
 * Creates a new object with the own properties of the two provided objects.
 *
 * If a key exists in all objects:
 *
 * - and all associated values are also objects then the values will be
 *   recursively merged.
 * - otherwise the provided function is applied to associated values using the
 *   resulting value as the new value associated with the key.
 *
 * If a key only exists in one object, the value will be associated with the key
 * of the resulting object.
 *
 * @param fn - The function to merge the values
 * @param objs - The objects to merge
 * @return The new object
 *
 * @example
 * ```typescript
 * deepMergeWith((a, b) => a.concat(b))(
 *               { a: true, c: { value: [1, 2] } },
 *               { b: true, c: { value: [3, 4] } }
 * ); // { a: true, b: true, c: { value: [1, 2, 3, 4] } }
 * ```
 */
export function deepMergeWith<T1, T2>(
  fn: (x: any, z: any) => any,
): (a: T1, b: T2) => any {
  const _isObject = (x: any) => x.toString() === "[object Object]";
  const deepMerge = (...objs: any[]) => {
    return objs.reduce((acc, obj) => {
      if (isNil(acc) || isNil(obj)) return fn(acc, obj);

      for (const key in obj) {
        acc[key] = !isNil(acc[key])
          ? _isObject(obj[key]) && _isObject(acc[key])
            ? deepMerge(acc[key], obj[key])
            : fn(acc[key], obj[key])
          : obj[key];
      }

      return acc;
    });
  };

  return deepMerge;
}
