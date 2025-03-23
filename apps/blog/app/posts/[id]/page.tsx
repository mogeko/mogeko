import { NotionRender } from "@/components/render";
import { RichText } from "@/components/text";
import { Heading } from "@/components/ui/heading";
import { notion } from "@/lib/notion";
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

  const block = await notion.blocks.retrieve({ block_id: id });
  const page = await notion.pages.retrieve({ page_id: id });

  if ("properties" in page) {
    const {
      properties: { Name, "Publish Date": _date, "Featured Image": _cover },
    } = page;

    return (
      <article className="flex flex-col max-w-[80ch] px-[2ch] py-2">
        <header>
          {Name.type === "title" && (
            <Heading id={page.id} level={1}>
              <RichText rich_text={Name.title} />
            </Heading>
          )}
        </header>
        <main>
          <NotionRender block={block} />
        </main>
      </article>
    );
  }
};

export default Page;
