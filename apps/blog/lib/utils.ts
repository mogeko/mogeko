import { type ClassValue, clsx } from "clsx";
import { createElement } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function withWraper<W extends React.FC | string>(Wrap: W) {
  let components: Array<React.ReactNode> = [];
  const Wraped: React.FC<React.Attributes> & {
    push: (node: React.ReactNode) => void;
  } = (props) => {
    const node = createElement(Wrap, props, ...components);

    return (components = []), node;
  };
  Wraped.push = (node) => components.push(node);

  return Wraped;
}

export async function* iterateHelper<T>(
  iterator: AsyncIterableIterator<T>,
): AsyncGenerator<[T, T | undefined]> {
  let initialize: T = (await iterator.next()).value;

  for await (const value of iterator) {
    yield [initialize, ((initialize = value), value)];
  }

  yield [initialize, void 0];
}

export function groupBy<K, T>(
  items: Iterable<T>,
  keySelector: (item: T, index: number) => K,
): Array<[K, Array<T>]> {
  const result: Array<[K, T[]]> = [];
  let index = 0;

  for (const item of items) {
    const key = keySelector(item, index++);
    const group = result.find(([k]) => k === key);

    if (group) {
      group[1].push(item);
    } else {
      result.push([key, [item]]);
    }
  }

  return result;
}

export function shortenUUID(uuid?: string) {
  let result: string | undefined;

  if (uuid?.length === 36) result = uuid.replace(/[-]/g, "");
  if (uuid?.length === 32) result = uuid;

  return result?.trim().toLocaleLowerCase();
}
