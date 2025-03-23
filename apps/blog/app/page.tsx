import { RichText } from "@/components/text";
import { Details, Summary } from "@/components/ui/accordion";
import { ActionLink } from "@/components/ui/action-link";
import { Heading } from "@/components/ui/heading";
import { notion } from "@/lib/notion";
import { getYear } from "date-fns";
import type { NextPage } from "next";

const Home: NextPage = async () => {
  const database_id = process.env.NOTION_DATABASE_ID;

  if (database_id) {
    const database = await notion.databases.retrieve({ database_id });

    if ("title" in database) {
      const { title, description } = database;

      const pages = await notion.databases.query({
        database_id,
        sorts: [{ timestamp: "created_time", direction: "descending" }],
      });
      const pagesGroup = Object.groupBy(pages.results, (page) => {
        if ("properties" in page) {
          const { "Publish Date": _date } = page.properties;
          const date = _date.type === "date" && _date.date?.start;
          return date ? getYear(date) : "Unknown";
        }

        return "Unknown";
      });

      return (
        <article className="flex flex-col gap-1 max-w-[80ch] px-[2ch] py-2">
          <section>
            <Heading level={1}>
              <RichText rich_text={title} />
            </Heading>
            <p>
              <RichText rich_text={description} />
            </p>
          </section>
          {Object.entries(pagesGroup).map(([date, pages]) => {
            return (
              <section key={date}>
                <Details open>
                  <Summary asChild>
                    <Heading level={2}>{date}</Heading>
                  </Summary>
                  <ul className="pl-[1ch]">
                    {pages?.map((page) => {
                      if (!("properties" in page)) return;

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
