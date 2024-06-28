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
