import { Heading } from "@/components/heading";
import { ListItem } from "@/components/list";
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
        const heading = (
          <Heading id={block.id} level={1}>
            {block.heading_1}
          </Heading>
        );

        return block.heading_1.is_toggleable ? (
          <Details summary={heading}>{block}</Details>
        ) : (
          heading
        );
      }

      case "heading_2": {
        const heading = (
          <Heading id={block.id} level={2}>
            {block.heading_2}
          </Heading>
        );

        return block.heading_2.is_toggleable ? (
          <Details summary={heading}>{block}</Details>
        ) : (
          heading
        );
      }

      case "heading_3": {
        const heading = (
          <Heading id={block.id} level={3}>
            {block.heading_3}
          </Heading>
        );

        return block.heading_3.is_toggleable ? (
          <Details summary={heading}>{block}</Details>
        ) : (
          heading
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

      case "bulleted_list_item": {
        return <ListItem>{block.bulleted_list_item}</ListItem>;
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
      let numberedListcounter = 0;

      return results.map((block) => {
        if ("type" in block && block.type === "numbered_list_item") {
          return (
            <ListItem key={block.id} data-count={++numberedListcounter}>
              {block.numbered_list_item}
            </ListItem>
          );
        }
        numberedListcounter = 0;

        return <NotionRender key={block.id} block={block} />;
      });
    }
  },
);
