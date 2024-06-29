import { isNil } from "@/is-nil";
import { is } from "@/is";

export function deepMergeWith(fn: (a: any, b: any) => any) {
  return (...objs: any[]) => {
    return objs.reduce((acc, obj) => {
      if (isNil(acc) || !is(Object, acc)) return obj;
      if (isNil(obj) || !is(Object, obj)) return acc;

      Object.keys(obj).forEach((key) => {
        if (!isNil(acc[key])) {
          if (is(Object, acc[key]) || is(Object, obj[key])) {
            acc[key] = deepMergeWith(fn)(acc[key], obj[key]);
          } else {
            acc[key] = fn(acc[key], obj[key]);
          }
        } else {
          acc[key] = obj[key];
        }
      });

      return acc;
    });
  };
}
