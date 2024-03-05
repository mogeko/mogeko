import rss from "@astrojs/rss";
import { siteConfig } from "@/config";
import { getCollection } from "astro:content";
import { getTime } from "date-fns";
import type { APIRoute } from "astro";

export const GET: APIRoute = async (context) => {
  const { author, title, description } = siteConfig;
  const blogs = (
    await getCollection("posts", ({ data }) => {
      return import.meta.env.PROD ? data.draft !== true : true;
    })
  ).sort(({ data: a }, { data: b }) => {
    return getTime(b.date) - getTime(a.date);
  });

  return rss({
    title: title,
    description: description,
    site: context.site ?? import.meta.env.SITE,
    items: blogs.map(({ data, slug }) => ({
      title: data.title,
      description: data.description,
      author: data.author ?? author,
      pubDate: data.date,
      link: `/posts/${slug}`,
    })),
    stylesheet: "/rss/pretty-feed-v3.xsl",
  });
};
