import type { GetBlockResponse } from "@/lib/api-endpoints";
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
