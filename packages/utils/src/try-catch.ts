/**
 * Functional wrapper for try…catch…
 *
 * @param tryer - The function that may throw.
 * @param catcher - The function that will be evaluated if `tryer` throws.
 * @typeParam P - The type of the parameter of tryer; if throw, it will be passed to catcher.
 * @typeParam T - The return type of tryer.
 * @typeParam C - The return type of catcher.
 * @returns A new function that will catch exceptions and send them to the catcher.
 *
 * @example
 * ```typescript
 * const result = tryCatch(
 *   (_) => {
 *     throw "this is not a valid value"
 *   },
 *   (err, value) => ({ error: err, value })
 * )("bar");
 *
 * console.log(result); // { error: "this is not a valid value", value: "bar" }
 * ```
 */
export function tryCatch<P extends any[], T, C>(
  tryer: (...args: P) => T,
  catcher: (err: any, ...args: P) => C,
) {
  return (...args: P): T | C => {
    try {
      return tryer(...args);
    } catch (err: any) {
      return catcher(err, ...args);
    }
  };
}
