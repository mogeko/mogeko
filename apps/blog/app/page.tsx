import { getYear } from "date-fns";
import type { NextPage } from "next";
import { cacheLife, cacheTag } from "next/cache";
import { Suspense } from "react";
import { RichText } from "@/components/text";
import { Details, Summary } from "@/components/ui/accordion";
import { ActionLink } from "@/components/ui/action-link";
import { Badges } from "@/components/ui/badges";
import { Heading } from "@/components/ui/heading";
import { Spinner } from "@/components/ui/spinner";
import { isFullDatabase, isFullPage, notion } from "@/lib/notion";
import { formatUUID, groupBy } from "@/lib/utils";
import pkg from "@/package.json";

async function retrieveDatabase(database_id?: string) {
  "use cache";

  if (database_id) {
    const database = await notion.databases.retrieve({ database_id });

    cacheTag("notion", "database", database_id);
    cacheLife("default");

    if (isFullDatabase(database)) {
      return database;
    }
  }
}

const Home: NextPage = async () => {
  const database_id = formatUUID(process.env.NOTION_DATABASE_ID);

  const database = await retrieveDatabase(database_id);

  if (!database) {
    throw new Error(
      `Unable to retrieve Notion Database: ${database_id ?? ""}.`,
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-1 max-w-[80ch] px-[2ch] py-2">
      <section>
        <hgroup className="flex gap-[1ch]">
          <h1>
            <RichText richText={database.title} />
          </h1>
          <Badges>{pkg.version}</Badges>
        </hgroup>
        <p>
          <RichText richText={database.description} />
        </p>
      </section>
      {database.data_sources.map(({ id }) => (
        <Suspense key={id} fallback={<Spinner />}>
          <PageFeeds id={id} />
        </Suspense>
      ))}
    </div>
  );
};

const PageFeeds: React.FC<{ id: string }> = async ({ id }) => {
  const { results } = await notion.dataSources.query({
    data_source_id: id,
    sorts: [{ property: "%3DTrF", direction: "descending" }],
    filter:
      process.env.NODE_ENV === "production"
        ? { property: "wG%5CE", status: { equals: "Published" } }
        : void 0,
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
                  <ActionLink href={`/posts/${formatUUID(page.id)}`} icon="→">
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

export default Home;
