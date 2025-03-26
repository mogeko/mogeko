import { RichText } from "@/components/text";
import { Details, Summary } from "@/components/ui/accordion";
import { ActionLink } from "@/components/ui/action-link";
import { Badges } from "@/components/ui/badges";
import { Heading } from "@/components/ui/heading";
import { isFullDatabase, isFullPage, notion } from "@/lib/notion";
import { groupBy } from "@/lib/utils";
import pkg from "@/package.json";
import { getYear } from "date-fns";
import type { NextPage } from "next";

const Home: NextPage = async () => {
  const database_id = process.env.NOTION_DATABASE_ID;

  if (database_id) {
    const database = await notion.databases.retrieve({ database_id });

    if (isFullDatabase(database)) {
      const { title, description } = database;

      const pages = await notion.databases.query({
        database_id,
        sorts: [{ property: "Publish Date", direction: "descending" }],
      });

      return (
        <article className="flex flex-col gap-1 max-w-[80ch] px-[2ch] py-2">
          <section>
            <header className="flex gap-[1ch]">
              <h1>
                <RichText rich_text={title} />
              </h1>
              <Badges>{pkg.version}</Badges>
            </header>
            <p>
              <RichText rich_text={description} />
            </p>
          </section>

          {groupBy(pages.results, (page) => {
            if (isFullPage(page)) {
              const { "Publish Date": _date } = page.properties;
              const date = _date.type === "date" && _date.date?.start;
              return date ? getYear(date) : "Unknown";
            }

            return "Unknown";
          }).map(([date, pages]) => {
            return (
              <section key={date}>
                <Details open>
                  <Summary asChild>
                    <Heading level={2}>{date}</Heading>
                  </Summary>
                  <ul className="pl-[1ch]">
                    {pages?.map((page) => {
                      if (!isFullPage(page)) return;

                      const { Name } = page.properties;

                      if (Name.type === "title" && !("name" in Name)) {
                        return (
                          <li key={page.id}>
                            <ActionLink icon="→" href={`/posts/${page.id}`}>
                              <RichText rich_text={Name.title} />
                            </ActionLink>
                          </li>
                        );
                      }
                    })}
                  </ul>
                </Details>
              </section>
            );
          })}
        </article>
      );
    }
  }
};

export default Home;
