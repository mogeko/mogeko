import emoji from "remark-emoji";
import rss from "@astrojs/rss";
import { siteConfig } from "@/config";
import { createMarkdownProcessor } from "@astrojs/markdown-remark";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const { author, title, description } = siteConfig;
  const processor = await createMarkdownProcessor({ remarkPlugins: [emoji] });
  const blogs = await Promise.all(
    (await getCollection("posts")).map(async ({ body, ...rest }) => ({
      content: (await processor.render(body)).code,
      ...rest,
    })),
  );

  return rss({
    title: title,
    description: description,
    site: context.site ?? import.meta.env.SITE,
    items: blogs.map(({ data, slug, content }) => ({
      title: data.title,
      description: data.description,
      author: data.author ?? author,
      pubDate: data.date,
      content: content,
      link: `/posts/${slug}`,
    })),
  });
}
