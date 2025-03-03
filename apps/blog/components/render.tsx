import { Table } from "@/components/table";
import { RichText } from "@/components/text";
import { Details, Summary } from "@/components/toggle";
import { Heading } from "@/components/ui/heading";
import { ListItem } from "@/components/ui/list";
import type { GetBlockResponse } from "@/lib/api-endpoints";
import { colorVariants } from "@/lib/color-variants";
import { notion } from "@/lib/notion";
import dynamic from "next/dynamic";
import { cache } from "react";

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
        const heading = (
          <Heading id={block.id} color={color} level={1}>
            <RichText rich_text={rich_text} />
          </Heading>
        );

        return is_toggleable ? (
          <Details>
            <Summary>{heading}</Summary>
            <NotionBlockChildren block={block} />
          </Details>
        ) : (
          heading
        );
      }

      case "heading_2": {
        const { color, rich_text, is_toggleable } = block.heading_2;
        const heading = (
          <Heading id={block.id} color={color} level={2}>
            <RichText rich_text={rich_text} />
          </Heading>
        );

        return is_toggleable ? (
          <Details>
            <Summary>{heading}</Summary>
            <NotionBlockChildren block={block} />
          </Details>
        ) : (
          heading
        );
      }

      case "heading_3": {
        const { color, rich_text, is_toggleable } = block.heading_3;
        const heading = (
          <Heading id={block.id} color={color} level={3}>
            <RichText rich_text={rich_text} />
          </Heading>
        );

        return is_toggleable ? (
          <Details>
            <Summary>{heading}</Summary>
            <NotionBlockChildren block={block} />
          </Details>
        ) : (
          heading
        );
      }

      case "paragraph": {
        const { color, rich_text } = block.paragraph;
        const className = colorVariants({ color });

        return (
          <p className={className.length ? className : void 0}>
            <RichText rich_text={rich_text} />
          </p>
        );
      }

      case "code": {
        return <Code code={block} />;
      }

      case "equation": {
        const { expression } = block.equation;

        return (
          <Equation
            className="flex justify-center items-center"
            expression={expression}
          />
        );
      }

      case "quote": {
        const { color, rich_text } = block.quote;
        const className = colorVariants({ color });

        return (
          <blockquote className={className.length ? className : void 0}>
            <p>
              <RichText rich_text={rich_text} />
            </p>
            <NotionBlockChildren block={block} />
          </blockquote>
        );
      }

      case "table": {
        return <Table table={block} />;
      }

      case "bulleted_list_item": {
        const { color, rich_text } = block.bulleted_list_item;
        const className = colorVariants({ color });

        return (
          <ListItem className={className}>
            <RichText rich_text={rich_text} />
          </ListItem>
        );
      }

      case "toggle": {
        const cn = colorVariants({ color: block.toggle.color });

        return (
          <Details className={cn.length ? cn : void 0}>
            <Summary>
              <RichText rich_text={block.toggle.rich_text} />
            </Summary>
            <NotionBlockChildren block={block} />
          </Details>
        );
      }

      case "child_database":
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
          const { color, rich_text } = block.numbered_list_item;
          const className = colorVariants({ color });

          return (
            <ListItem
              className={className.length ? className : void 0}
              key={block.id}
              data-count={++numberedListcounter}
            >
              <RichText rich_text={rich_text} />
            </ListItem>
          );
        }
        numberedListcounter = 0;

        return <NotionRender key={block.id} block={block} />;
      });
    }
  },
);
