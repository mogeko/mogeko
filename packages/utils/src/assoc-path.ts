import { is } from "@/is";

export function assocPath(path: Path, value: any, obj: Obj): Obj {
  if (path.length === 0) return value;

  const [idx, ...tail] = path as [Path[0], ...Path];
  const next = is(Object, obj[idx]) ? obj[idx] : is(Number, tail[0]) ? [] : {};

  return Object.assign(obj, { [idx]: assocPath(tail, value, next) });
}

type Path = (string | number)[];
type Obj = Record<string, any>;
