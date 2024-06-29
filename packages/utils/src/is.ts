/**
 * See if an object (i.e. `value`) is an instance of the supplied constructor. This
 * function will check up the inheritance chain, if any.
 *
 * If `value` was created using `Object.create`, `is(Object, val) === true`.
 *
 * @param ctor - A constructor
 * @param value - The value to test
 * @return `true` if `value` is an instance of `ctor`, otherwise `false`
 *
 * @example
 * ```typescript
 * is(Object, {});             //=> true
 * is(Number, 1);              //=> true
 * is(Object, 1);              //=> false
 * is(String, "s");            //=> true
 * is(String, new String("")); //=> true
 * is(Object, new String("")); //=> true
 * is(Object, "s");            //=> false
 * is(Number, {});             //=> false
 * ```
 */
export function is<C extends new (...args: any[]) => any>(
  ctor: C,
  value: unknown,
): value is InstanceType<C>;
export function is<C extends (...args: any[]) => any>(
  Ctor: C,
  value: unknown,
): value is ReturnType<C>;
export function is(Ctor: any, value: unknown): boolean {
  return (
    value instanceof Ctor ||
    (value != null &&
      (value.constructor === Ctor ||
        (Ctor.name === "Object" && typeof value === "object")))
  );
}
