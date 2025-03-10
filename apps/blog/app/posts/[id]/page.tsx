import { NotionRender } from "@/components/render";
import { RichText } from "@/components/text";
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
      <article>
        <header>
          {Name.type === "title" && (
            <h1>
              <RichText rich_text={Name.title} />
            </h1>
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
