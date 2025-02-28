import { NotionRender } from "@/components/render";
import { RichText } from "@/components/text";
import { notion } from "@/lib/notion";
import type { NextPage } from "next";

const Page: NextPage<{
  params: Promise<{ id: string }>;
}> = async ({ params }) => {
  const { id } = await params;

  if (id === "installHook.js.map") return;

  const page = await notion.pages.retrieve({ page_id: id });

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
              {Name.title.map((text, i) => (
                <RichText key={`title-richtext-${i}`} {...text} />
              ))}
            </h1>
          )}
        </header>
        <main>
          <NotionRender {...block} />
        </main>
      </article>
    );
  }
};

export default Page;
