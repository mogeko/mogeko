// TypeScript does not have a `NaN` type yet.
// See: https://github.com/Microsoft/TypeScript/issues/28682
export function isNil<T>(
  value: unknown,
): value is (null | undefined | typeof NaN) & T {
  return value == null || Number.isNaN(value);
}
