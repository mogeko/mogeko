import type { Metadata, NextPage } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Author } from "@/components/article-author";
import { NotionRender } from "@/components/render";
import { plainText, RichText } from "@/components/text";
import { Breadcrumb, BreadcrumbItem } from "@/components/ui/breadcrumb";
import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { isFullPage, notion, type PageObjectResponse } from "@/lib/notion";
import { formatShortId } from "@/lib/utils";

type PagePromise = Promise<PageObjectResponse>;
type PostProps = PageProps<"/posts/[slug]">;

async function retrievePage(id: Promise<string>): PagePromise {
  "use cache";

  const page = await notion.pages.retrieve({ page_id: await id });

  return isFullPage(page) ? page : notFound();
}

export async function generateMetadata({ params }: PostProps) {
  const { properties } = await retrievePage(
    params.then(({ slug }) => formatShortId(slug) || notFound()),
  );
  const { Tags, Name } = properties;

  if (Name.type === "title" && Tags.type === "multi_select") {
    return {
      title: plainText(Name.title),
      keywords: Tags.multi_select.map((tag) => tag.name),
    } satisfies Metadata;
  }
}

const Page: NextPage<PostProps> = ({ params }) => {
  const id = params.then(({ slug }) => formatShortId(slug) || notFound());
  const page = retrievePage(id);

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
          <Suspense fallback={<Spinner />}>
            <PostBreadcrumbItem page={page} />
          </Suspense>
        </Breadcrumb>
        <Suspense
          // In order to optimize Cumulative Layout Shift (CLS)
          fallback={<Spinner className="h-2" />}
        >
          <Author page={page} />
        </Suspense>
      </section>
      <Separator className="mt-1 mb-3" />
      <article>
        <Suspense fallback={<Spinner />}>
          <PostHeader page={page} />
        </Suspense>
        <Suspense fallback={<Spinner />}>
          <PostBody id={id} />
        </Suspense>
      </article>
    </div>
  );
};

const PostBreadcrumbItem: React.FC<{ page: PagePromise }> = async (props) => {
  const { properties, id } = await props.page;

  if (properties.Name.type === "title") {
    return (
      <>
        <BreadcrumbItem.Separator />
        <BreadcrumbItem>
          <Link href={`/posts/${id}`}>
            <RichText richText={properties.Name.title} />
          </Link>
        </BreadcrumbItem>
      </>
    );
  }
};

const PostHeader: React.FC<{ page: PagePromise }> = async (props) => {
  const { properties, id } = await props.page;

  if (properties.Name.type === "title") {
    return (
      <Heading id={id} className="my-1" level={1}>
        <RichText richText={properties.Name.title} />
      </Heading>
    );
  }
};

const PostBody: React.FC<{ id: Promise<string> }> = async ({ id }) => {
  return <NotionRender id={await id} />;
};

export default Page;
