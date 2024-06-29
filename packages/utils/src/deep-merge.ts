import { deepMergeWith } from "@/deep-merge-with";

/**
 * Creates a new object with the own properties of the first object merged with
 * the own properties of the second object. If a key exists in all objects:
 *
 * - and all values are objects, the two values will be recursively merged
 * - otherwise the value from the second object will be used.
 *
 * @param objs - The objects to merge
 * @return The new object
 *
 * @example
 * ```typescript
 * deepMerge({ a: 1, b: 2 }, { b: 3, c: 4 });   //=> { a: 1, b: 3, c: 4 }
 * deepMerge({ a: { b: 1 } }, { a: { c: 2 } }); //=> { a: { b: 1, c: 2 } }
 * deepMerge([1, 2], [3, 4]);                   //=> [3, 4]
 * deepMerge({ a: 1, b: 2 }, null);             //=> { a: 1, b: 2 }
 * deepMerge(null, { a: 1, b: 2 });             //=> { a: 1, b: 2 }
 * ```
 */
export const deepMerge = deepMergeWith((_a, b) => b);
