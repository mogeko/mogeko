import { Author } from "@/components/article-author";
import { NotionRender } from "@/components/render";
import { RichText, plainText } from "@/components/text";
import { Breadcrumb, BreadcrumbItem } from "@/components/ui/breadcrumb";
import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";
import { Loading } from "@/components/ui/loading";
import { Separator } from "@/components/ui/separator";
import { isFullPage, notion } from "@/lib/notion";
import { formatShortId } from "@/lib/utils";
import type { Metadata, NextPage } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type Props = {
  params: Promise<{ ids: Array<string> }>;
};

export async function generateMetadata({ params }: Props) {
  const [parent_id, page_id] = (await params).ids.map(formatShortId);

  if (!parent_id || !page_id) return notFound();

  const parent = await notion.pages.retrieve({ page_id: parent_id });
  const page = await notion.pages.retrieve({ page_id });

  if (!isFullPage(parent) || !isFullPage(page)) return {};

  const { Name, Tags } = parent.properties;

  if (Name.type === "title" && Tags.type === "multi_select") {
    const sub = page.properties.title;
    const tail = sub.type === "title" ? ` - ${plainText(sub.title)}` : "";

    return {
      title: `${plainText(Name.title)}${tail}`,
      keywords: Tags.multi_select.map((tag) => tag.name),
    } satisfies Metadata;
  }
}

const Page: NextPage<Props> = async ({ params }) => {
  const [parent_id, page_id] = (await params).ids.map(formatShortId);

  if (!parent_id || !page_id) return notFound();

  const parent = await notion.pages.retrieve({ page_id: parent_id });
  const page = await notion.pages.retrieve({ page_id });

  if (!isFullPage(parent) || !isFullPage(page)) return notFound();

  return (
    <div className="flex flex-1 flex-col max-w-[80ch] px-[2ch] py-2">
      <section>
        <Breadcrumb className="mb-1">
          <BreadcrumbItem>
            <Link href="/">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem.Separator />
          <BreadcrumbItem>
            <Link href="/">Posts</Link>
          </BreadcrumbItem>
          {parent.properties.Name.type === "title" && (
            <>
              <BreadcrumbItem.Separator />
              <BreadcrumbItem>
                <Link href={`/posts/${parent_id}`}>
                  <RichText richText={parent.properties.Name.title} />
                </Link>
              </BreadcrumbItem>
            </>
          )}
          {page.properties.title.type === "title" && (
            <>
              <BreadcrumbItem.Separator />
              <BreadcrumbItem>
                <Link href={`/posts/${parent_id}/${page_id}`}>
                  <RichText richText={page.properties.title.title} />
                </Link>
              </BreadcrumbItem>
            </>
          )}
        </Breadcrumb>
        <Suspense
          // In order to optimize Cumulative Layout Shift (CLS)
          fallback={<Loading className="h-2" />}
        >
          <Author page={parent} user_id={page.created_by.id /* Long ID */} />
        </Suspense>
      </section>
      <Separator className="mt-1 mb-3" />
      <article>
        {page.properties.title.type === "title" && (
          <Heading id={page_id} className="my-1" level={1}>
            <RichText richText={page.properties.title.title} />
          </Heading>
        )}
        <Suspense fallback={<Loading />}>
          <NotionRender id={page_id} hasChildren />
        </Suspense>
      </article>
    </div>
  );
};

export default Page;
