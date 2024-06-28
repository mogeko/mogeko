export function tap<T>(fn: (x: T) => void) {
  return (x: T) => (fn(x), x);
}
