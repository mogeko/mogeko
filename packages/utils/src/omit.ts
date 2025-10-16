export function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
): Omit<T, K> {
  const result = structuredClone(obj);

  for (const key of keys) {
    if (key in result) {
      delete result[key];
    }
  }

  return result;
}
