export function isNil(value: unknown) {
  return value == null || Number.isNaN(value);
}
