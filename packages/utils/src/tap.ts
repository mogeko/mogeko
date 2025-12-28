/**
 * Runs the given function with the supplied object, then returns the object.
 *
 * Acts as a transducer if a transformer is given as second parameter.
 *
 * @param fn - The function to call with `x`. The return value of `fn` will be thrown away.
 * @param x - The value to pass to `fn`.
 * @return `x`.
 *
 * @example
 * ```typescript
 * const sayX = (x) => console.log("x is " + x);
 * tap(sayX, 100); //=> 100
 * // logs "x is 100"
 * ```
 */
export function tap<T>(fn: (x: T) => void): (x: T) => T {
  return (x: T) => (fn(x), x);
}
