import type { BlockObjectResponse } from "@/lib/api-endpoints";
import { colorVariants } from "@/lib/color-variants";
import { iteratePaginatedAPI, notion } from "@/lib/notion";
import { iterateHelper, withWraper } from "@/lib/utils";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { twMerge } from "tailwind-merge";

import { Icon } from "@/components/icon";
import { TableBox } from "@/components/table-box";
import { RichText, plainText } from "@/components/text";
import { Details, Summary } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Image } from "@/components/ui/image";
import { ListItem, OrderedList, UnorderedList } from "@/components/ui/list";
import { Loading } from "@/components/ui/loading";

type BlockProps = { block: BlockObjectResponse };

const Equation = dynamic(async () => {
  return import("@/components/equation").then((m) => m.Equation);
});
const Code = dynamic(async () => {
  return import("@/components/code").then((m) => m.Code);
});

export const NotionRender: React.FC<{ id: string }> = async ({ id }) => {
  const block = await notion.blocks.retrieve({ block_id: id });

  if ("type" in block) {
    return <NotionBlock block={block} />;
  }
};

const NotionBlock: React.FC<BlockProps> = ({ block }) => {
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
      return (
        <Card
          className="[&:not(:first-child)]:mt-1"
          title="Notice"
          variant="left"
        >
          <div className="flex gap-[1ch]">
            <div>
              <Icon icon={block.callout.icon} />
            </div>
            <div>
              <p>
                <RichText rich_text={block.callout.rich_text} />
              </p>
              {block.has_children && (
                <Suspense fallback={<Loading />}>
                  <NotionBlockChildren block={block} />
                </Suspense>
              )}
            </div>
          </div>
        </Card>
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
      return (
        <div className="[&:not(:first-child)]:mt-1">
          <Suspense fallback={<Loading />}>
            <TableBox block={block} />
          </Suspense>
        </div>
      );
    }

    case "bulleted_list_item": {
      const { color, rich_text } = block.bulleted_list_item;

      return (
        <ListItem tabIndex={0} color={color}>
          <RichText rich_text={rich_text} />
          <Suspense fallback={<Loading />}>
            <NotionBlockChildren block={block} />
          </Suspense>
        </ListItem>
      );
    }

    case "numbered_list_item": {
      const { color, rich_text } = block.numbered_list_item;

      return (
        <ListItem tabIndex={0} color={color}>
          <RichText rich_text={rich_text} />
          <Suspense fallback={<Loading />}>
            <NotionBlockChildren block={block} />
          </Suspense>
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

const NotionBlockChildren: React.FC<BlockProps> = async ({ block: _block }) => {
  if (!_block.has_children) return;

  const [OList, UList] = [OrderedList, UnorderedList].map(withWraper);
  const acc: Array<React.ReactNode> = [];
  const _type = (x: any, t: string): x is BlockObjectResponse => {
    return "type" in x && x.type === t;
  };

  for await (const [block, next] of iterateHelper(
    iteratePaginatedAPI(notion.blocks.children.list, { block_id: _block.id }),
  )) {
    if (!("type" in block)) return;

    if (block.type === "bulleted_list_item") {
      UList.push(<NotionBlock key={block.id} block={block} />);

      if (!next || !_type(next, "bulleted_list_item")) {
        acc.push(<UList key={`ul-${block.id}`} />);
      }
    } else if (block.type === "numbered_list_item") {
      OList.push(<NotionBlock key={block.id} block={block} />);

      if (!next || !_type(next, "numbered_list_item")) {
        acc.push(<OList key={`ol-${block.id}`} />);
      }
    } else {
      acc.push(<NotionBlock key={block.id} block={block} />);
    }
  }

  return acc;
};
