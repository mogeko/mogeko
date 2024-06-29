/**
 * Checks if the input value is `null` or `undefined`.
 *
 * @param value - The value to test.
 * @return `true` if `value` is `undefined` or `null`, otherwise `false`.
 *
 * @example
 * ```typescript
 * isNil(null);      //=> true
 * isNil(undefined); //=> true
 * isNil(NaN);       //=> true
 * isNil(0);         //=> false
 * ```
 */
export function isNil<T>(
  value: unknown,
  //=> TypeScript does not have a `NaN` type yet.
  //=> See: https://=>github.com/Microsoft/TypeScript/issues/28682
): value is (null | undefined | typeof NaN) & T {
  return value == null || Number.isNaN(value);
}
