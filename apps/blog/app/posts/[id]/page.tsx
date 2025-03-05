import { NotionRender } from "@/components/render";
import { RichText } from "@/components/text";
import { notionBlockRetrieve, notionPagesRetrieve } from "@/lib/notion";
import type { NextPage } from "next";

const Page: NextPage<{
  params: Promise<{ id: string }>;
}> = async ({ params }) => {
  const { id } = await params;

  if (id === "installHook.js.map") return;

  const page = await notionPagesRetrieve({ page_id: id });

  if ("properties" in page) {
    const {
      properties: { Name, "Publish Date": _date, "Featured Image": _cover },
    } = page;

    const block = await notionBlockRetrieve({ block_id: page.id });

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
