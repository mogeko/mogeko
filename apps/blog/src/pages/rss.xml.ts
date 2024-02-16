import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { siteConfig } from "@/config";
import { blogs } from "@/pages/index.astro";

export async function GET(context: APIContext) {
  const { author, title, description } = siteConfig;

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
}
