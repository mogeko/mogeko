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
 * deepMerge(
 *   { name: "fred", age: 10, contact: { email: "moo@example.com" } },
 *   { age: 40, contact: { email: "baa@example.com" } },
 * ); // { name: "fred", age: 40, contact: { email: "baa@example.com" } }
 * ```
 */
export const deepMerge = deepMergeWith((_a, b) => b);
