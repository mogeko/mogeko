import { NotionRender } from "@/components/render";
import { RichText, plainText } from "@/components/text";
import { Avatar } from "@/components/ui/avatar";
import { Breadcrumb, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";
import { Loading } from "@/components/ui/loading";
import { Separator } from "@/components/ui/separator";
import { isFullPage, notion } from "@/lib/notion";
import { formatShortId } from "@/lib/utils";
import { intlFormat } from "date-fns";
import type { Metadata, NextPage } from "next";
import { Suspense } from "react";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;

  const page = await notion.pages.retrieve({ page_id: id });

  if (!isFullPage(page)) return;

  const { Name, Tags } = page.properties;

  if (Name.type === "title" && Tags.type === "multi_select") {
    return {
      title: plainText(Name.title),
      keywords: Tags.multi_select.map((tag) => tag.name),
    } satisfies Metadata;
  }
}

const Page: NextPage<Props> = async ({ params }) => {
  const { id } = await params;

  const page = await notion.pages.retrieve({ page_id: id });

  if (!isFullPage(page)) return;

  const { Name, "Publish Date": date } = page.properties;
  const publidhDate = date.type === "date" && date.date?.start;

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
          <p>{publidhDate && intlFormat(publidhDate)}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col max-w-[80ch] px-[2ch] py-2">
      <section>
        <Breadcrumb className="mb-1">
          <Link href="/">Home</Link>
          <BreadcrumbSeparator />
          <Link href="/">Posts</Link>
          {Name.type === "title" && (
            <>
              <BreadcrumbSeparator />
              <Link href={`/posts/${formatShortId(id)}`}>
                <RichText richText={Name.title} />
              </Link>
            </>
          )}
        </Breadcrumb>
        <Suspense
          // In order to optimize Cumulative Layout Shift (CLS)
          fallback={<Loading className="h-2" />}
        >
          <Author id={page.created_by.id} />
        </Suspense>
      </section>
      <Separator className="mt-1 mb-3" />
      <article>
        {Name.type === "title" && (
          <Heading id={formatShortId(page.id)} className="my-1" level={1}>
            <RichText richText={Name.title} />
          </Heading>
        )}
        <Suspense fallback={<Loading />}>
          <NotionRender id={id} />
        </Suspense>
      </article>
    </div>
  );
};

export default Page;
