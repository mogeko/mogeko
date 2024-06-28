export function range(to: number): number[];
export function range(from: number, to: number): number[];
export function range(from: number, to?: number, step?: number): number[];
export function range(from: number, to?: number, step = 1) {
  return Array.from(
    { length: Math.ceil((to ? to - from : from) / step) },
    (_, i) => (to ? from + i : i) * step,
  );
}
