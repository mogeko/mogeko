import dynamic from "next/dynamic";
import { Fragment, Suspense } from "react";
import { twMerge } from "tailwind-merge";
import { Icon } from "@/components/icon";
import { Image } from "@/components/image";
import { TableBox } from "@/components/table-box";
import { plainText, RichText } from "@/components/text";
import { Details, Summary } from "@/components/ui/accordion";
import { ActionLink } from "@/components/ui/action-link";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { ListItem } from "@/components/ui/list";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { colorVariants } from "@/lib/colors";
import {
  type BlockObjectResponse,
  isFullBlock,
  type ListBlockChildrenParameters,
  queryBlocks,
} from "@/lib/notion";
import { shortenUUID } from "@/lib/utils";

const Equation = dynamic(async () => {
  return import("@/components/equation").then((m) => m.Equation);
});
const Code = dynamic(async () => {
  return import("@/components/code").then((m) => m.Code);
});

const NotionBlock: React.FC<{ block: BlockObjectResponse }> = ({ block }) => {
  switch (block.type) {
    case "heading_1": {
      const { color, rich_text, is_toggleable } = block.heading_1;

      return is_toggleable ? (
        <Details className="my-1">
          <Summary asChild>
            <Heading id={block.id} color={color} level={1}>
              <RichText richText={rich_text} />
            </Heading>
          </Summary>
          {block.has_children && (
            <Suspense fallback={<Spinner />}>
              <NotionRender block_id={block.id} />
            </Suspense>
          )}
        </Details>
      ) : (
        <Heading id={block.id} className="my-1" color={color} level={1}>
          <RichText richText={rich_text} />
        </Heading>
      );
    }

    case "heading_2": {
      const { color, rich_text, is_toggleable } = block.heading_2;

      return is_toggleable ? (
        <Details className="mt-1">
          <Summary asChild>
            <Heading id={block.id} color={color} level={2}>
              <RichText richText={rich_text} />
            </Heading>
          </Summary>
          {block.has_children && (
            <Suspense fallback={<Spinner />}>
              <NotionRender block_id={block.id} />
            </Suspense>
          )}
        </Details>
      ) : (
        <Heading className="mt-1" id={block.id} color={color} level={2}>
          <RichText richText={rich_text} />
        </Heading>
      );
    }

    case "heading_3": {
      const { color, rich_text, is_toggleable } = block.heading_3;

      return is_toggleable ? (
        <Details className="mt-1">
          <Summary asChild>
            <Heading id={block.id} color={color} level={3}>
              <RichText richText={rich_text} />
            </Heading>
          </Summary>
          {block.has_children && (
            <Suspense fallback={<Spinner />}>
              <NotionRender block_id={block.id} />
            </Suspense>
          )}
        </Details>
      ) : (
        <Heading className="mt-1" id={block.id} color={color} level={3}>
          <RichText richText={rich_text} />
        </Heading>
      );
    }

    case "paragraph": {
      const { color, rich_text } = block.paragraph;

      return (
        <p
          className={twMerge(
            colorVariants({
              color,
              className: "not-first:mt-1 text-clip",
            }),
          )}
        >
          <RichText richText={rich_text} />
        </p>
      );
    }

    case "image": {
      let props: { notionId?: string; src: string } | undefined;

      if (block.image.type === "file") {
        props = { src: block.image.file.url, notionId: block.id };
      } else if (block.image.type === "external") {
        props = { src: block.image.external.url };
      }

      if (!props) return;

      const alt = plainText(block.image.caption);

      return (
        <div className="mt-1">
          <Image width={729.6} alt={alt} {...props} />
        </div>
      );
    }

    case "code": {
      return <Code className="mt-1" code={block} />;
    }

    case "equation": {
      const { expression } = block.equation;

      return (
        <Equation
          className="flex justify-center items-center mt-1 overflow-x-auto"
          expression={expression}
        />
      );
    }

    case "callout": {
      return (
        <Card className="mt-1" title="Notice" variant="left">
          <div className="flex gap-[1ch]">
            <div>
              <Icon icon={block.callout.icon} />
            </div>
            <div>
              <p>
                <RichText richText={block.callout.rich_text} />
              </p>
              {block.has_children && (
                <Suspense fallback={<Spinner />}>
                  <NotionRender block_id={block.id} />
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
                "box-border shadow-[inset_2px_0_0_0] shadow-border mt-1 pl-[2ch]",
              color,
            }),
          )}
        >
          <p>
            <RichText richText={rich_text} />
          </p>
          {block.has_children && (
            <Suspense fallback={<Spinner />}>
              <NotionRender block_id={block.id} />
            </Suspense>
          )}
        </blockquote>
      );
    }

    case "table": {
      return (
        <Suspense fallback={<Spinner />}>
          <TableBox className="my-1" block={block} />
        </Suspense>
      );
    }

    case "bulleted_list_item": {
      const { color, rich_text } = block.bulleted_list_item;

      return (
        <ListItem
          tabIndex={0}
          className="flex gap-[1ch] before:content-['▪'] [&:not(&+&)]:mt-1"
          color={color}
        >
          <div className="flex-1 [&>:last-child:not(:first-child)]:mb-1">
            <p>
              <RichText richText={rich_text} />
            </p>
            {block.has_children && (
              <Suspense fallback={<Spinner />}>
                <NotionRender block_id={block.id} />
              </Suspense>
            )}
          </div>
        </ListItem>
      );
    }

    case "numbered_list_item": {
      const { color, rich_text } = block.numbered_list_item;

      return (
        <ListItem
          tabIndex={0}
          className="numbered-list-item flex gap-[1ch] [&:not(&+&)]:mt-1"
          color={color}
        >
          <div className="flex-1 [&>:last-child:not(:first-child)]:mb-1">
            <p>
              <RichText richText={rich_text} />
            </p>
            {block.has_children && (
              <Suspense fallback={<Spinner />}>
                <NotionRender block_id={block.id} />
              </Suspense>
            )}
          </div>
        </ListItem>
      );
    }

    case "toggle": {
      return (
        <Details className="mt-1" color={block.toggle.color}>
          <Summary>
            <RichText richText={block.toggle.rich_text} />
          </Summary>
          {block.has_children && (
            <Suspense fallback={<Spinner />}>
              <NotionRender block_id={block.id} />
            </Suspense>
          )}
        </Details>
      );
    }

    case "divider": {
      return <Separator className="my-1" />;
    }

    case "column_list": {
      return (
        <div className="flex flex-col justify-stretch items-stretch not-first:mt-1 sm:gap-[1ch] sm:flex-row">
          {block.has_children && (
            <Suspense fallback={<Spinner />}>
              <NotionRender block_id={block.id} />
            </Suspense>
          )}
        </div>
      );
    }

    case "column": {
      return (
        <div className="flex-initial flex-col justify-start items-start w-full">
          {block.has_children && (
            <Suspense fallback={<Spinner />}>
              <NotionRender block_id={block.id} />
            </Suspense>
          )}
        </div>
      );
    }

    case "child_page": {
      const { child_page, parent } = block;

      let parent_id: string | undefined;

      if (parent.type === "block_id") parent_id = parent.block_id;
      if (parent.type === "page_id") parent_id = parent.page_id;

      if (!parent_id) return;

      return (
        <ActionLink
          className="[&:not(&+&):not(:first-child)]:mt-1"
          href={`/posts/${shortenUUID(parent_id)}/${shortenUUID(block.id)}`}
          icon="→"
        >
          {child_page.title}
        </ActionLink>
      );
    }
  }
};

export const NotionRender: React.FC<
  Omit<ListBlockChildrenParameters, "start_cursor"> & {
    start_cursor?: string | null;
  }
> = async ({ start_cursor, ...props }) => {
  const { results, has_more, next_cursor } = await queryBlocks({
    ...props,
    start_cursor: start_cursor ?? void 0,
  });

  return (
    <Fragment>
      {results.map((block, i) => {
        return (
          isFullBlock(block) && (
            <NotionBlock key={`notion-${i}-${block.id}`} block={block} />
          )
        );
      })}
      {has_more && (
        <Suspense fallback={<Spinner />}>
          <NotionRender start_cursor={next_cursor} {...props} />
        </Suspense>
      )}
    </Fragment>
  );
};
