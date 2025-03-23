import { NotionRender } from "@/components/render";
import { RichText } from "@/components/text";
import { Avatar } from "@/components/ui/avatar";
import { Breadcrumb, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";
import { Separator } from "@/components/ui/separator";
import { notion } from "@/lib/notion";
import { intlFormat } from "date-fns";
import type { Metadata, NextPage } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;

  const block = await notion.blocks.retrieve({ block_id: id });

  if ("type" in block && block.type === "child_page") {
    return {
      title: block.child_page.title,
    } satisfies Metadata;
  }
}

const Page: NextPage<Props> = async ({ params }) => {
  const { id } = await params;

  const page = await notion.pages.retrieve({ page_id: id });

  if ("properties" in page) {
    const {
      properties: { Name, "Publish Date": _date, "Featured Image": _cover },
    } = page;
    const block = await notion.blocks.retrieve({ block_id: id });
    const author = await notion.users.retrieve({ user_id: page.created_by.id });
    const date = _date.type === "date" && _date.date?.start;

    return (
      <article className="flex flex-col max-w-[80ch] px-[2ch] py-2">
        <header>
          <section className="mb-1">
            <Breadcrumb>
              <Link href="/">Home</Link>
              <BreadcrumbSeparator />
              <Link href="/">Posts</Link>
              {Name.type === "title" && (
                <>
                  <BreadcrumbSeparator />
                  <Link href={`/posts/${id}`}>
                    <RichText rich_text={Name.title} />
                  </Link>
                </>
              )}
            </Breadcrumb>
          </section>
          <section className="flex justify-start items-center">
            {author.avatar_url && (
              <Avatar
                src={author.avatar_url}
                className="w-[43px] mr-[calc(5ch-43px)]"
                width={43}
                alt={author.name ?? "Author"}
              />
            )}
            <div>
              <p>{author.name ?? "Anonymous"}</p>
              <p>{date && intlFormat(date)}</p>
            </div>
          </section>
        </header>
        <Separator className="mt-1 mb-3" />
        <main>
          {Name.type === "title" && (
            <Heading className="mb-1" id={page.id} level={1}>
              <RichText rich_text={Name.title} />
            </Heading>
          )}
          <NotionRender block={block} />
        </main>
      </article>
    );
  }
};

export default Page;
