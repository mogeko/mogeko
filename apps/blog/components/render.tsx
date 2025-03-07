import type { GetBlockResponse } from "@/lib/api-endpoints";
import { colorVariants } from "@/lib/color-variants";
import { iteratePaginatedAPI, notionBlocksChildrenList } from "@/lib/notion";
import { _type, iterateHelper, withWraper } from "@/lib/utils";
import dynamic from "next/dynamic";

import { Icon } from "@/components/icon";
import { TRow } from "@/components/table-row";
import { RichText } from "@/components/text";
import { Details, Summary } from "@/components/toggle";
import { Callout } from "@/components/ui/callout";
import { Heading } from "@/components/ui/heading";
import { ListItem } from "@/components/ui/list";
import { Table, TableBody, TableHeader } from "@/components/ui/table";

const Equation = dynamic(async () => {
  return import("@/components/equation").then((m) => m.Equation);
});
const Code = dynamic(async () => {
  return import("@/components/code").then((m) => m.Code);
});

export const NotionRender: React.FC<{
  block: GetBlockResponse;
}> = async ({ block }) => {
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

    case "callout": {
      const { icon, rich_text, color } = block.callout;

      return (
        <Callout color={color} icon={<Icon icon={icon} />}>
          <p>
            <RichText rich_text={rich_text} />
          </p>
          {block.has_children && <NotionBlockChildren block={block} />}
        </Callout>
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
      const { has_column_header, has_row_header } = block.table;
      const [head, ...rest] = (
        await notionBlocksChildrenList({ block_id: block.id })
      ).results;

      return (
        <Table>
          {has_column_header && (
            <TableHeader>
              <TRow hasCH={has_column_header} block={head} />
            </TableHeader>
          )}
          <TableBody>
            {!has_column_header && <TRow hasRH={has_row_header} block={head} />}
            {rest.map((cell) => {
              return (
                <TRow
                  key={`${block.id}-${cell.id}`}
                  hasRH={has_row_header}
                  block={cell}
                />
              );
            })}
          </TableBody>
        </Table>
      );
    }

    case "bulleted_list_item": {
      const { color, rich_text } = block.bulleted_list_item;
      const className = colorVariants({ color });

      return (
        <ListItem className={className.length ? className : void 0}>
          <RichText rich_text={rich_text} />
        </ListItem>
      );
    }

    case "numbered_list_item": {
      const { color, rich_text } = block.numbered_list_item;
      const className = colorVariants({ color });

      return (
        <ListItem className={className.length ? className : void 0}>
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
};

export const NotionBlockChildren: React.FC<{
  block: GetBlockResponse;
}> = async ({ block: { id, ...rest } }) => {
  if ("type" in rest && rest.has_children) {
    const [OList, UList] = ["ol", "ul"].map(withWraper);

    const acc: Array<React.ReactNode> = [];

    for await (const [block, next] of iterateHelper<GetBlockResponse>(
      iteratePaginatedAPI(notionBlocksChildrenList, { block_id: id }),
    )) {
      if (_type(block) === "bulleted_list_item") {
        UList.push(<NotionRender key={block.id} block={block} />);

        if (next && _type(next) !== "bulleted_list_item") {
          acc.push(<UList key={`ul-${block.id}`} />);
        }
      } else if (_type(block) === "numbered_list_item") {
        OList.push(<NotionRender key={block.id} block={block} />);

        if (next && _type(next) !== "numbered_list_item") {
          acc.push(<OList key={`ol-${block.id}`} />);
        }
      } else {
        acc.push(<NotionRender key={block.id} block={block} />);
      }
    }

    return acc;
  }
};
