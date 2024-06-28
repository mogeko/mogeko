import rss from "@astrojs/rss";
import { siteConfig } from "@/config";
import { getEntries } from "@/data";
import type { APIRoute } from "astro";

export const GET: APIRoute = async (context) => {
  const { author, title, description } = siteConfig;

  return rss({
    title: title,
    description: description,
    site: context.site ?? import.meta.env.SITE,
    items: (await getEntries()).map(({ data, slug }) => ({
      title: data.title,
      description: data.description,
      author: data.author ?? author,
      pubDate: data.date,
      link: `/posts/${slug}`,
    })),
    stylesheet: "/rss/pretty-feed-v3.xsl",
  });
};
