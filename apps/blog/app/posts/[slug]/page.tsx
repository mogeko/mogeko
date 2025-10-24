import type { Metadata, NextPage } from "next";
import { Suspense } from "react";
import { PostAuthor, PostBcItem, PostHeader } from "@/components/post-staffs";
import { NotionRender } from "@/components/render";
import { plainText } from "@/components/text";
import { Breadcrumb, BreadcrumbItem } from "@/components/ui/breadcrumb";
import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { retrievePage } from "@/lib/retrieve-page";
import { formatUUID } from "@/lib/utils";

export async function generateMetadata({ params }: PageProps<"/posts/[slug]">) {
  const id = formatUUID((await params).slug);
  const props = (await retrievePage(id))?.properties;

  if (props?.Name.type === "title" && props.Tags.type === "multi_select") {
    return {
      title: plainText(props.Name.title),
      keywords: props.Tags.multi_select.map((tag) => tag.name),
    } satisfies Metadata;
  }
}

const Page: NextPage<PageProps<"/posts/[slug]">> = ({ params }) => {
  const id = params.then(({ slug }) => formatUUID(slug));

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
          <BreadcrumbItem.Separator />
          <Suspense fallback={<BreadcrumbItem>...</BreadcrumbItem>}>
            <PostBcItem id={id} />
          </Suspense>
        </Breadcrumb>
        <Suspense fallback={<Spinner className="h-2" />}>
          <PostAuthor id={id} />
        </Suspense>
      </section>
      <Separator className="mt-1 mb-3" />
      <article>
        <Suspense fallback={<HeadingLoading />}>
          <PostHeader id={id} />
        </Suspense>
        <Suspense fallback={<Spinner />}>
          <PostBody id={id} />
        </Suspense>
      </article>
    </div>
  );
};

const HeadingLoading: React.FC = () => {
  return (
    <Heading className="my-1" level={1}>
      ...
    </Heading>
  );
};

export const PostBody: React.FC<{
  id: Promise<string | undefined>;
}> = async (props) => {
  const id = await props.id;

  if (id) {
    return <NotionRender block_id={id} />;
  }
};

export default Page;
