import { env } from "node:process";
import { isFullPage } from "@notionhq/client";
import { getYear } from "date-fns";
import type { NextPage } from "next";
import { Suspense } from "react";
import { RichText } from "@/components/text";
import { Details, Summary } from "@/components/ui/accordion";
import { ActionLink } from "@/components/ui/action-link";
import { Badge } from "@/components/ui/badges";
import { Heading } from "@/components/ui/heading";
import { Spinner } from "@/components/ui/spinner";
import { queryDataSources, retrieveDatabase } from "@/lib/notion";
import { groupBy, shortenUUID } from "@/lib/utils";
import pkg from "@/package.json";

const Home: NextPage<PageProps<"/">> = async () => {
  const database_id = shortenUUID(env.NOTION_DATABASE_ID);
  const database = await retrieveDatabase(database_id);

  if (!database) {
    throw new Error(`Unable to retrieve Notion Database: ${database_id}.`);
  }

  return (
    <div className="flex flex-1 flex-col gap-1 max-w-[80ch] px-[2ch] py-2">
      <section>
        <hgroup className="flex gap-[1ch]">
          <h1>
            <RichText richText={database.title} />
          </h1>
          <Badge>{pkg.version}</Badge>
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
  const { results } = await queryDataSources({
    data_source_id: id,
    sorts: [{ property: "%3DTrF", direction: "descending" }],
    filter:
      env.NODE_ENV === "production"
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
                  <ActionLink href={`/posts/${shortenUUID(page.id)}`} icon="→">
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
