import { NotionRender } from "@/components/render";
import { RichText, plainText } from "@/components/text";
import { notion } from "@/lib/notion";
import type { Metadata, NextPage } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await notion.pages.retrieve({ page_id: (await params).id });

  if ("properties" in page && page.properties.Name.type === "title") {
    return {
      title: plainText(page.properties.Name.title),
    };
  }

  return {};
}

const Page: NextPage<Props> = async ({ params }) => {
  const page = await notion.pages.retrieve({ page_id: (await params).id });

  if ("properties" in page) {
    const {
      properties: { Name, "Publish Date": _date, "Featured Image": _cover },
    } = page;

    const block = await notion.blocks.retrieve({ block_id: page.id });

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
