import { is } from "@/is";

export function isEmpty(value: unknown): boolean {
  return !is(Number, value) && value != null && !Object.keys(value).length;
}
