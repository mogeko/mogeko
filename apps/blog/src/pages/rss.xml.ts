import emoji from "remark-emoji";
import rss from "@astrojs/rss";
import { siteConfig } from "@/config";
import { createMarkdownProcessor } from "@astrojs/markdown-remark";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const { author, title, description } = siteConfig;
  const processor = await createMarkdownProcessor({ remarkPlugins: [emoji] });
  const blogs = await getCollection("posts");

  return rss({
    title: title,
    description: description,
    site: context.site ?? import.meta.env.SITE,
    items: await Promise.all(
      blogs.map(async ({ data, slug, body }) => ({
        title: data.title,
        description: data.description,
        author: data.author ?? author,
        content: (await processor.render(body)).code,
        pubDate: data.date,
        link: `/posts/${slug}`,
      })),
    ),
    stylesheet: "/rss/pretty-feed-v3.xsl",
  });
}
