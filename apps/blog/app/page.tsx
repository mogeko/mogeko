import { RichText } from "@/components/text";
import { Details, Summary } from "@/components/ui/accordion";
import { ActionLink } from "@/components/ui/action-link";
import { Badges } from "@/components/ui/badges";
import { Heading } from "@/components/ui/heading";
import { Loading } from "@/components/ui/loading";
import { isFullDatabase, isFullPage, notion } from "@/lib/notion";
import { formatShortId, groupBy } from "@/lib/utils";
import pkg from "@/package.json";
import { getYear } from "date-fns";
import type { NextPage } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const PageFeeds: React.FC<{ id: string }> = async ({ id }) => {
  const { results } = await notion.databases.query({
    database_id: id,
    sorts: [{ property: "Publish Date", direction: "descending" }],
  });

  return groupBy(results.filter(isFullPage), (page) => {
    const { "Publish Date": _date } = page.properties;
    const date = _date.type === "date" && _date.date?.start;
    return date ? getYear(date) : "Unknown";
  }).map(([date, pages]) => (
    <section key={date}>
      <Details open>
        <Summary asChild>
          <Heading level={2}>{date}</Heading>
        </Summary>
        <ul className="pl-[1ch]">
          {pages.map((page) => {
            return (
              page.properties.Name.type === "title" && (
                <li key={page.id}>
                  <ActionLink
                    href={`/posts/${formatShortId(page.id)}`}
                    icon="→"
                  >
                    <RichText richText={page.properties.Name.title} />
                  </ActionLink>
                </li>
              )
            );
          })}
        </ul>
      </Details>
    </section>
  ));
};

const Home: NextPage = async () => {
  const database_id = formatShortId(process.env.NOTION_DATABASE_ID);

  if (!database_id) return notFound();

  const database = await notion.databases.retrieve({ database_id });

  if (!isFullDatabase(database)) return notFound();

  const { title, description } = database;

  return (
    <div className="flex flex-1 flex-col gap-1 max-w-[80ch] px-[2ch] py-2">
      <section>
        <hgroup className="flex gap-[1ch]">
          <h1>
            <RichText richText={title} />
          </h1>
          <Badges>{pkg.version}</Badges>
        </hgroup>
        <p>
          <RichText richText={description} />
        </p>
      </section>
      <Suspense fallback={<Loading />}>
        <PageFeeds id={database_id} />
      </Suspense>
    </div>
  );
};

export default Home;
