import { isObject } from "@/is-object";

export function assocPath(path: Path, val: any, obj: Obj): Obj {
  if (path.length === 0) return val;

  const [idx, ...tail] = path as [Path[0], ...Path];
  const next = isObject(obj[idx]) ? obj[idx] : {};

  return Object.assign(obj, {
    [idx]: assocPath(tail, val, next),
  });
}

type Path = (string | number)[];
type Obj = Record<string, any>;
