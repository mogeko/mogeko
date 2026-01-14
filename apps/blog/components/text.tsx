import type { RichTextItemResponse } from "@notionhq/client";
import { cva } from "class-variance-authority";
import { Equation } from "@/components/equation";
import { Mention } from "@/components/mention";
import { Link } from "@/components/ui/link";
import { colorVariants } from "@/lib/colors";
import { cn as cx } from "@/lib/utils";

const textVariants = cva([], {
  variants: {
    bold: { true: ["font-bold"], false: null },
    italic: { true: ["italic"], false: null },
    strikethrough: { true: ["line-through"], false: null },
    underline: {
      true: ["underline underline-offset-2 decoration-2"],
      false: null,
    },
    code: {
      true: ["bg-muted text-destructive -mx-[3px] px-[3px]"],
      false: null,
    },
  },
});

export function plainText(richText: Array<RichTextItemResponse>) {
  return richText.map(({ plain_text }) => plain_text).join();
}

export const RichText: React.FC<{
  richText: Array<RichTextItemResponse>;
  className?: string;
}> = ({ richText, className }) => {
  return richText.map((richTextItem, i) => {
    const { color, ...rest } = richTextItem.annotations;
    const cn = cx(textVariants(rest), colorVariants({ color }), className);
    const key = `${richTextItem.plain_text}-${i}`;

    if (richTextItem.type === "text") {
      const { link, content } = richTextItem.text;

      if (!link) {
        return (
          <span key={key} className={cn.length ? cn : void 0}>
            {content}
          </span>
        );
      }

      if (new URLPattern().test(link.url)) {
        return (
          <Link key={key} className={cn} href={link.url}>
            {content}
          </Link>
        );
      }

      if (link.url.startsWith("/")) {
        return (
          <Link key={key} className={cn} href={`/posts${link.url}`}>
            {content}
          </Link>
        );
      }
    }

    if (richTextItem.type === "equation") {
      const { expression } = richTextItem.equation;

      return (
        <Equation
          key={key}
          className={cn.length ? cn : void 0}
          expression={expression}
          inline
        />
      );
    }

    if (richTextItem.type === "mention") {
      const { mention, plain_text } = richTextItem;

      return (
        <Mention
          key={key}
          className={cn.length ? cn : void 0}
          mention={mention}
        >
          {plain_text}
        </Mention>
      );
    }

    return null;
  });
};
