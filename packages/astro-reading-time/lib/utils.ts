const isObject = (val: any): boolean => val && typeof val === "object";

export function assocPath(path: string[], val: any, obj: Obj): Obj {
  if (path.length === 0) return val;

  const [idx, ...tail] = path;

  return Object.assign(obj, {
    [idx]: assocPath(tail, val, isObject(obj[idx]) ? obj[idx] : {}),
  });
}

type Obj = Record<string, any>;
