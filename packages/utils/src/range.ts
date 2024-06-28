export function range(length: number): number[];
export function range(start: number, stop: number): number[];
export function range(start: number, stop?: number, step?: number): number[];
export function range(start: number, stop?: number, step = 1) {
  return Array.from(
    { length: Math.ceil((stop ? stop - start : start) / step) },
    (_, i) => (stop ? start + i : i) * step,
  );
}
