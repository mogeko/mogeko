import { isNil } from "@/is-nil";
import { is } from "@/is";

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
 * const merge = deepMergeWith((a, b) => a + b);
 * merge({ a: 1, b: 2 }, { b: 3, c: 4 });   //=> { a: 1, b: 5, c: 4 }
 * merge({ a: { b: 1 } }, { a: { c: 2 } }); //=> { a: { b: 1, c: 2 } }
 * merge([1, 2], [3, 4]);                   //=> [4, 6]
 * merge({ a: 1, b: 2 }, null);             //=> { a: 1, b: 2 }
 * merge(null, { a: 1, b: 2 });             //=> { a: 1, b: 2 }
 * ```
 */
export function deepMergeWith(fn: (a: any, b: any) => any) {
  const deepMerge = (...objs: any[]) => {
    return objs.reduce((acc, obj) => {
      if (isNil(acc) || !is(Object, acc)) return obj;
      if (isNil(obj) || !is(Object, obj)) return acc;

      Object.keys(obj).forEach((key) => {
        acc[key] = !isNil(acc[key])
          ? is(Object, acc[key]) || is(Object, obj[key])
            ? deepMerge(acc[key], obj[key])
            : fn(acc[key], obj[key])
          : obj[key];
      });

      return acc;
    });
  };

  return deepMerge;
}
