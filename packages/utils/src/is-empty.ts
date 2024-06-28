import { is } from "@/is";

export function isEmpty(value: unknown): boolean {
  return value != null && !is(Number, value) && !Object.keys(value).length;
}
