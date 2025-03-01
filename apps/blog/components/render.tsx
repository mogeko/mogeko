import { RichText } from "@/components/text";
import { Details } from "@/components/toggle";
import type { GetBlockResponse } from "@/lib/api-endpoints";
import { colorVariants } from "@/lib/color-variants";
import { notion } from "@/lib/notion";
import dynamic from "next/dynamic";
import { cache } from "react";
import { twMerge } from "tailwind-merge";

const Equation = dynamic(async () => {
  return import("@/components/equation").then((m) => m.Equation);
});
const Code = dynamic(async () => {
  return import("@/components/code").then((m) => m.Code);
});

export const NotionRender: React.FC<{ block: GetBlockResponse }> = cache(
  async ({ block }) => {
    if (!("type" in block)) return;

    switch (block.type) {
      case "heading_1": {
        const { color, rich_text, is_toggleable } = block.heading_1;
        const InternalHeading: React.FC = () => {
          return (
            <h1
              className={twMerge(
                colorVariants({
                  className: ["notion-h1"],
                  color,
                }),
              )}
            >
              <RichText>{rich_text}</RichText>
            </h1>
          );
        };

        return is_toggleable ? (
          <Details summary={<InternalHeading />}>{block}</Details>
        ) : (
          <InternalHeading />
        );
      }

      case "heading_2": {
        const { color, rich_text, is_toggleable } = block.heading_2;
        const InternalHeading: React.FC = () => {
          return (
            <h2
              className={twMerge(
                colorVariants({
                  className: ["notion-h2"],
                  color,
                }),
              )}
            >
              <RichText>{rich_text}</RichText>
            </h2>
          );
        };

        return is_toggleable ? (
          <Details summary={<InternalHeading />}>{block}</Details>
        ) : (
          <InternalHeading />
        );
      }

      case "heading_3": {
        const { color, rich_text, is_toggleable } = block.heading_3;
        const InternalHeading: React.FC = () => {
          return (
            <h3
              className={twMerge(
                colorVariants({
                  className: ["notion-h3"],
                  color,
                }),
              )}
            >
              <RichText>{rich_text}</RichText>
            </h3>
          );
        };

        return is_toggleable ? (
          <Details summary={<InternalHeading />}>{block}</Details>
        ) : (
          <InternalHeading />
        );
      }

      case "paragraph": {
        const { color, rich_text } = block.paragraph;
        const className = twMerge(colorVariants({ color }));

        return (
          <p className={className.length ? className : void 0}>
            <RichText>{rich_text}</RichText>
          </p>
        );
      }

      case "code": {
        return <Code code={block} />;
      }

      case "equation": {
        const { expression } = block.equation;

        return (
          <Equation className="flex justify-center items-center">
            {expression}
          </Equation>
        );
      }

      case "quote": {
        const cn = colorVariants({ color: block.quote.color });

        return (
          <blockquote className={cn.length ? cn : void 0}>
            <p>
              <RichText>{block.quote.rich_text}</RichText>
            </p>
            <NotionBlockChildren block={block} />
          </blockquote>
        );
      }

      case "toggle": {
        return <Details>{block}</Details>;
      }

      case "child_page": {
        return <NotionBlockChildren block={block} />;
      }
    }
  },
);

export const NotionBlockChildren: React.FC<{ block: GetBlockResponse }> = cache(
  async ({ block }) => {
    if ("type" in block && block.has_children) {
      const { results } = await notion.blocks.children.list({
        block_id: block.id,
      });

      return results.map((block) => {
        return <NotionRender key={block.id} block={block} />;
      });
    }
  },
);
