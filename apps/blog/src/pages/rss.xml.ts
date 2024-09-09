import { SITE_AUTHOR, SITE_DESCRIPTION, SITE_TITLE } from "astro:env/server";
import { getEntries } from "@/utils";
import rss from "@astrojs/rss";
import type { APIRoute } from "astro";

export const GET: APIRoute = async (context) => {
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site ?? import.meta.env.SITE,
    items: (await getEntries()).map(({ data, slug }) => ({
      title: data.title,
      description: data.description,
      author: data.author ?? SITE_AUTHOR,
      pubDate: data.date,
      link: `/posts/${slug}`,
    })),
    stylesheet: "/rss/pretty-feed-v3.xsl",
  });
};
