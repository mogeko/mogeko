import { isNil } from "@/is-nil";
import { is } from "@/is";

export function deepMergeWith(fn: (a: any, b: any) => any) {
  const deepMerge = (...objs: any[]) => {
    return objs.reduce((acc, obj) => {
      if (isNil(acc) || !is(Object, acc)) return obj;
      if (isNil(obj) || !is(Object, obj)) return acc;

      Object.keys(obj).forEach((key) => {
        acc[key] = !isNil(acc[key])
          ? is(Object, acc[key]) || is(Object, obj[key])
            ? deepMerge(acc[key], obj[key])
            : fn(acc[key], obj[key])
          : obj[key];
      });

      return acc;
    });
  };

  return deepMerge;
}
