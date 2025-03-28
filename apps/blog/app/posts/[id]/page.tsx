import { NotionRender } from "@/components/render";
import { RichText } from "@/components/text";
import { Avatar } from "@/components/ui/avatar";
import { Breadcrumb, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";
import { Loading } from "@/components/ui/loading";
import { Separator } from "@/components/ui/separator";
import { isFullBlock, isFullPage, notion } from "@/lib/notion";
import { intlFormat } from "date-fns";
import type { Metadata, NextPage } from "next";
import { Suspense } from "react";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;

  const block = await notion.blocks.retrieve({ block_id: id });

  if (isFullBlock(block) && block.type === "child_page") {
    return {
      title: block.child_page.title,
    } satisfies Metadata;
  }
}

const Page: NextPage<Props> = async ({ params }) => {
  const { id } = await params;

  const page = await notion.pages.retrieve({ page_id: id });

  if (!isFullPage(page)) return;

  const {
    properties: { Name, "Publish Date": _date, "Featured Image": _cover },
  } = page;
  const date = _date.type === "date" && _date.date?.start;

  const Author: React.FC<{ id: string }> = async ({ id }) => {
    const { avatar_url, name } = await notion.users.retrieve({ user_id: id });

    return (
      <div className="flex justify-start items-center">
        {avatar_url && (
          <Avatar
            src={avatar_url}
            className="w-[43px] mr-[calc(5ch-43px)]"
            width={43}
            alt={name ?? "Author"}
          />
        )}
        <div>
          <p>{name ?? "Anonymous"}</p>
          <p>{date && intlFormat(date)}</p>
        </div>
      </div>
    );
  };

  return (
    <article className="flex flex-col max-w-[80ch] px-[2ch] py-2">
      <header>
        <Breadcrumb className="mb-1">
          <Link href="/">Home</Link>
          <BreadcrumbSeparator />
          <Link href="/">Posts</Link>
          {Name.type === "title" && (
            <>
              <BreadcrumbSeparator />
              <Link href={`/posts/${id}`}>
                <RichText richText={Name.title} />
              </Link>
            </>
          )}
        </Breadcrumb>
        <Suspense
          // CLS: Ensure that the height we need has the highest priority
          fallback={<Loading style={{ height: "calc(var(--spacing) * 2)" }} />}
        >
          <Author id={page.created_by.id} />
        </Suspense>
      </header>
      <Separator className="mt-1 mb-3" />
      <main>
        {Name.type === "title" && (
          <Heading className="mb-1" id={page.id} level={1}>
            <RichText richText={Name.title} />
          </Heading>
        )}
        <Suspense fallback={<Loading />}>
          <NotionRender id={id} />
        </Suspense>
      </main>
    </article>
  );
};

export default Page;
