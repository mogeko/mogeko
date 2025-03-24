import type { GetBlockResponse } from "@/lib/api-endpoints";
import { colorVariants } from "@/lib/color-variants";
import { iteratePaginatedAPI, notion } from "@/lib/notion";
import { iterateHelper, withWraper } from "@/lib/utils";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { twMerge } from "tailwind-merge";

import { Icon } from "@/components/icon";
import { TRow } from "@/components/table-row";
import { RichText, plainText } from "@/components/text";
import { Details, Summary } from "@/components/ui/accordion";
import { AlertBanner } from "@/components/ui/alert-banner";
import { Heading } from "@/components/ui/heading";
import { Image } from "@/components/ui/image";
import { ListItem, OrderedList, UnorderedList } from "@/components/ui/list";
import { Loading } from "@/components/ui/loading";
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

      return is_toggleable ? (
        <Details className="my-1">
          <Summary asChild>
            <Heading id={block.id} color={color} level={1}>
              <RichText rich_text={rich_text} />
            </Heading>
          </Summary>
          <Suspense fallback={<Loading />}>
            <NotionBlockChildren block={block} />
          </Suspense>
        </Details>
      ) : (
        <Heading className="my-1" id={block.id} color={color} level={1}>
          <RichText rich_text={rich_text} />
        </Heading>
      );
    }

    case "heading_2": {
      const { color, rich_text, is_toggleable } = block.heading_2;

      return is_toggleable ? (
        <Details className="my-1">
          <Summary asChild>
            <Heading id={block.id} color={color} level={2}>
              <RichText rich_text={rich_text} />
            </Heading>
          </Summary>
          <Suspense fallback={<Loading />}>
            <NotionBlockChildren block={block} />
          </Suspense>
        </Details>
      ) : (
        <Heading className="my-1" id={block.id} color={color} level={2}>
          <RichText rich_text={rich_text} />
        </Heading>
      );
    }

    case "heading_3": {
      const { color, rich_text, is_toggleable } = block.heading_3;

      return is_toggleable ? (
        <Details className="my-1">
          <Summary asChild>
            <Heading id={block.id} color={color} level={3}>
              <RichText rich_text={rich_text} />
            </Heading>
          </Summary>
          <Suspense fallback={<Loading />}>
            <NotionBlockChildren block={block} />
          </Suspense>
        </Details>
      ) : (
        <Heading className="my-1" id={block.id} color={color} level={3}>
          <RichText rich_text={rich_text} />
        </Heading>
      );
    }

    case "paragraph": {
      const { color, rich_text } = block.paragraph;

      return (
        <p
          className={twMerge(
            colorVariants({ color, className: "[&:not(:first-child)]:mt-1" }),
          )}
        >
          <RichText rich_text={rich_text} />
        </p>
      );
    }

    case "image": {
      if (block.image.type === "file") {
        const { file, caption } = block.image;
        const alt = plainText(caption);

        return (
          <div className="[&:not(:first-child)]:mt-1">
            <Image width={729.6} src={file.url} alt={alt} />
          </div>
        );
      }

      return;
    }

    case "code": {
      return <Code className="[&:not(:first-child)]:mt-1" code={block} />;
    }

    case "equation": {
      const { expression } = block.equation;

      return (
        <Equation
          className="flex justify-center items-center [&:not(:first-child)]:mt-1"
          expression={expression}
        />
      );
    }

    case "callout": {
      const { icon, rich_text, color } = block.callout;

      return (
        <AlertBanner
          className="[&:not(:first-child)]:mt-1"
          color={color as any}
          icon={<Icon icon={icon} />}
        >
          <p>
            <RichText rich_text={rich_text} />
          </p>
          {block.has_children && (
            <Suspense fallback={<Loading />}>
              <NotionBlockChildren block={block} />
            </Suspense>
          )}
        </AlertBanner>
      );
    }

    case "quote": {
      const { color, rich_text } = block.quote;

      return (
        <blockquote
          className={twMerge(
            colorVariants({
              className:
                "box-border shadow-[inset_2px_0_0_0] shadow-border [&:not(:first-child)]:mt-1 pl-[2ch]",
              color,
            }),
          )}
        >
          <p>
            <RichText rich_text={rich_text} />
          </p>
          <Suspense fallback={<Loading />}>
            <NotionBlockChildren block={block} />
          </Suspense>
        </blockquote>
      );
    }

    case "table": {
      const { has_column_header, has_row_header } = block.table;
      const [head, ...rest] = (
        await notion.blocks.children.list({ block_id: block.id })
      ).results;

      return (
        <div className="[&:not(:first-child)]:mt-1">
          <Table>
            {has_column_header && (
              <TableHeader>
                <TRow hasCH={has_column_header} block={head} />
              </TableHeader>
            )}
            <TableBody>
              {!has_column_header && (
                <TRow hasRH={has_row_header} block={head} />
              )}
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
        </div>
      );
    }

    case "bulleted_list_item": {
      const { color, rich_text } = block.bulleted_list_item;

      return (
        <ListItem color={color}>
          <RichText rich_text={rich_text} />
        </ListItem>
      );
    }

    case "numbered_list_item": {
      const { color, rich_text } = block.numbered_list_item;

      return (
        <ListItem color={color}>
          <RichText rich_text={rich_text} />
        </ListItem>
      );
    }

    case "toggle": {
      return (
        <Details color={block.toggle.color}>
          <Summary>
            <RichText rich_text={block.toggle.rich_text} />
          </Summary>
          <Suspense fallback={<Loading />}>
            <NotionBlockChildren block={block} />
          </Suspense>
        </Details>
      );
    }

    case "child_page": {
      return (
        <Suspense fallback={<Loading />}>
          <NotionBlockChildren block={block} />
        </Suspense>
      );
    }
  }
};

export const NotionBlockChildren: React.FC<{
  block: GetBlockResponse;
}> = async ({ block: { id, ...rest } }) => {
  if ("type" in rest && rest.has_children) {
    const [OList, UList] = [OrderedList, UnorderedList].map(withWraper);

    const acc: Array<React.ReactNode> = [];

    for await (const [block, next] of iterateHelper<GetBlockResponse>(
      iteratePaginatedAPI(notion.blocks.children.list, { block_id: id }),
    )) {
      if ("type" in block && block.type === "bulleted_list_item") {
        UList.push(<NotionRender key={block.id} block={block} />);

        if (next && "type" in next && next.type !== "bulleted_list_item") {
          acc.push(<UList key={`ul-${block.id}`} />);
        }
      } else if ("type" in block && block.type === "numbered_list_item") {
        OList.push(<NotionRender key={block.id} block={block} />);

        if (next && "type" in next && next.type !== "numbered_list_item") {
          acc.push(<OList key={`ol-${block.id}`} />);
        }
      } else {
        acc.push(<NotionRender key={block.id} block={block} />);
      }
    }

    return acc;
  }
};
