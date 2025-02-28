// import { Equation } from "@/components/equation";
import { RichText } from "@/components/text";
import { Details } from "@/components/toggle";
import type { GetBlockResponse } from "@/lib/api-endpoints";
import { colorVariants } from "@/lib/color-variants";
import { notion } from "@/lib/notion";
import dynamic from "next/dynamic";
import { twMerge } from "tailwind-merge";

const Equation = dynamic(async () => {
  return import("@/components/equation").then((m) => m.Equation);
});

export const NotionRender: React.FC<{
  block: GetBlockResponse;
}> = async ({ block }) => {
  if ("type" in block) {
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

      case "equation": {
        const { expression } = block.equation;

        return (
          <Equation className="flex justify-center items-center">
            {expression}
          </Equation>
        );
      }

      case "toggle": {
        return <Details>{block}</Details>;
      }

      case "child_page": {
        return <NotionBlockChildren>{block}</NotionBlockChildren>;
      }
    }
  }
};

export const NotionBlockChildren: React.FC<{
  children: GetBlockResponse;
}> = async ({ children: block }) => {
  if ("type" in block && block.has_children) {
    const { results } = await notion.blocks.children.list({
      block_id: block.id,
    });

    return results.map((block) => {
      return <NotionRender key={block.id} block={block} />;
    });
  }
};
