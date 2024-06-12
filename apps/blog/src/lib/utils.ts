import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const memoize: {
  <T, F extends (...args: any[]) => T>(
    fn: F,
    hasher?: (...args: Parameters<F>) => any,
  ): F & { cache: Map<any, T> };
  Cache: MapConstructor;
} = function (fn, hasher) {
  const memoized = function (this: any, ...args: any) {
    const keys = hasher ? hasher.apply(this, args) : args[0];
    const cache = memoized.cache;

    if (!cache.has(keys)) {
      memoized.cache = cache.set(keys, fn.apply(this, args));
    }

    return cache.get(keys);
  };
  memoized.cache = new (memoize.Cache || Map)();

  return memoized as any;
};
memoize.Cache = Map;

export { slug } from "github-slugger";
