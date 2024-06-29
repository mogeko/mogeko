import { is } from "@/is";

/**
 * This function checks if the given value is empty.
 *
 * @param input - Any data structure that may be empty
 * @returns if the `input` is empty
 *
 * @example
 * ```typescript
 * isEmpty("");        //=> true
 * isEmpty([]);        //=> true
 * isEmpty({});        //=> true
 * isEmpty(undefined); //=> false
 * isEmpty(null);      //=> false
 * isEmpty(fasle);     //=> false
 * isEmpty(true);      //=> false
 * isEmpty("foo");     //=> false
 * isEmpty(() => {});  //=> false
 * ```
 */
export function isEmpty(value: unknown): boolean {
  return value != null && !is(Number, value) && !Object.keys(value).length;
}
