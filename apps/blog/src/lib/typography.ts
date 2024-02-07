import Heading1 from "@/components/mdx/h1.astro";
import Heading2 from "@/components/mdx/h2.astro";
import Heading3 from "@/components/mdx/h3.astro";
import Heading4 from "@/components/mdx/h4.astro";
import Paragraph from "@/components/mdx/p.astro";
import Blockquote from "@/components/mdx/blockquote.astro";
import OrderedList from "@/components/mdx/ol.astro";
import UnoderedList from "@/components/mdx/ul.astro";
import Link from "@/components/link.astro";
import InlineCode from "@/components/mdx/code.astro";
import Image from "@/components/mdx/img.astro";

export const components = {
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  h4: Heading4,
  p: Paragraph,
  blockquote: Blockquote,
  ol: OrderedList,
  ul: UnoderedList,
  a: Link,
  code: InlineCode,
  img: Image,
};
