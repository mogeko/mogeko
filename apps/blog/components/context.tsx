import NextImage from "next/image";
import NextLink from "next/link";
import { createElement, forwardRef } from "react";

export const components = {
  Blockquote: helper<HTMLDivElement>("div"), // TODO
  Break: helper<HTMLBRElement>("br"),
  Code: helper<HTMLPreElement>("pre"), //TODO
  Emphasis: helper<HTMLElement>("em"),
  Heading: helper<HTMLHeadingElement>("h1"), // TODO
  Image: NextImage, //TODO
  InlineCode: helper<HTMLElement>("code"), // TODO
  Link: NextLink,
  // List: TOTO
  Paragraph: helper<HTMLParagraphElement>("p"),
  Strong: helper<HTMLElement>("strong"),
} as const;

function helper<T extends HTMLElement>(type: React.HTMLElementType) {
  return forwardRef<T, React.HTMLAttributes<T>>((props, ref) => {
    return createElement(type, { ...props, ref });
  });
}
