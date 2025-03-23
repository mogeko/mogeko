import { Equation } from "@/components/equation";
import { Link } from "@/components/ui/link";
import type { RichTextItemResponse } from "@/lib/api-endpoints";
import { colorVariants } from "@/lib/color-variants";
import { cn as cx } from "@/lib/utils";
import { cva } from "class-variance-authority";

export function plainText(richText: Array<RichTextItemResponse>) {
  return richText.map(({ plain_text }) => plain_text).join();
}

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

export const RichText: React.FC<{
  rich_text: RichTextItemResponse | Array<RichTextItemResponse>;
  className?: string;
}> = ({ rich_text, className }) => {
  const RichTextRender: React.FC<{ richText: RichTextItemResponse }> = ({
    richText,
  }) => {
    const { color, ...rest } = richText.annotations;
    const cn = cx(textVariants(rest), colorVariants({ color }), className);

    if (richText.type === "text") {
      const { link, content } = richText.text;

      return link ? (
        <Link className={cn} href={link.url}>
          {content}
        </Link>
      ) : (
        <span className={cn.length ? cn : void 0}>{content}</span>
      );
    }

    if (richText.type === "equation") {
      const { expression } = richText.equation;

      return (
        <Equation
          className={cn.length ? cn : void 0}
          expression={expression}
          inline
        />
      );
    }

    if (richText.type === "mention") {
    }
  };

  return Array.isArray(rich_text) ? (
    rich_text.map((text, i) => {
      return <RichTextRender key={`${text.plain_text}-${i}`} richText={text} />;
    })
  ) : (
    <RichTextRender richText={rich_text} />
  );
};
