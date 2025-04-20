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
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const page_id = formatShortId((await params).slug);

  if (!page_id) return notFound();

  const page = await notion.pages.retrieve({ page_id });

  if (!isFullPage(page)) return notFound();

  const { Name, Tags } = page.properties;

  if (Name.type === "title" && Tags.type === "multi_select") {
    return {
      title: plainText(Name.title),
      keywords: Tags.multi_select.map((tag) => tag.name),
    } satisfies Metadata;
  }
}

const Page: NextPage<Props> = async ({ params }) => {
  const page_id = formatShortId((await params).slug);

  if (!page_id) return notFound();

  const page = await notion.pages.retrieve({ page_id });

  if (!isFullPage(page)) return notFound();

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
          {page.properties.Name.type === "title" && (
            <>
              <BreadcrumbItem.Separator />
              <BreadcrumbItem>
                <Link href={`/posts/${page_id}`}>
                  <RichText richText={page.properties.Name.title} />
                </Link>
              </BreadcrumbItem>
            </>
          )}
        </Breadcrumb>
        <Suspense
          // In order to optimize Cumulative Layout Shift (CLS)
          fallback={<Loading className="h-2" />}
        >
          <Author page={page} />
        </Suspense>
      </section>
      <Separator className="mt-1 mb-3" />
      <article>
        {page.properties.Name.type === "title" && (
          <Heading id={page_id} className="my-1" level={1}>
            <RichText richText={page.properties.Name.title} />
          </Heading>
        )}
        <Suspense fallback={<Loading />}>
          <NotionRender id={page_id} />
        </Suspense>
      </article>
    </div>
  );
};

export default Page;
