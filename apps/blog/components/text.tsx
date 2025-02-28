import { Equation } from "@/components/equation";
import type { RichTextItemResponse } from "@/lib/api-endpoints";
import { colorVariants } from "@/lib/color-variants";
import { cn as cx } from "@/lib/utils";
import { cva } from "class-variance-authority";
import Link from "next/link";

export function plainText(richtext: RichTextItemResponse) {
  return richtext.plain_text;
}

const textVariants = cva([], {
  variants: {
    bold: { true: ["font-bold"], false: null },
    italic: { true: ["italic"], false: null },
    strikethrough: { true: ["line-through"], false: null },
    underline: { true: ["underline"], false: null },
    code: { true: ["notion-code"], false: null },
  },
});

export const RichText: React.FC<
  RichTextItemResponse & { className?: string }
> = ({ annotations: { color, ...rest }, className, ...rich_text }) => {
  const cn = cx(textVariants(rest), colorVariants({ color }), className);
  if (rich_text.type === "text") {
    const { link, content } = rich_text.text;

    return link ? (
      <Link className={cn.length ? cn : void 0} href={link.url}>
        {content}
      </Link>
    ) : (
      <span className={cn.length ? cn : void 0}>{content}</span>
    );
  }

  if (rich_text.type === "equation") {
    const { expression } = rich_text.equation;

    return (
      <Equation className={cn.length ? cn : void 0} inline>
        {expression}
      </Equation>
    );
  }
};
