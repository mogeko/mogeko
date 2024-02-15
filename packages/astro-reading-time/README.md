# astro-reading-time

[![Monorepo Build](https://github.com/mogeko/mogeko/actions/workflows/mono-build.yml/badge.svg)](https://github.com/mogeko/mogeko/actions/workflows/mono-build.yml)
[![Monorepo Test](https://github.com/mogeko/mogeko/actions/workflows/mono-test.yml/badge.svg)](https://github.com/mogeko/mogeko/actions/workflows/mono-test.yml)

An Astro integration for calculate reading time of Markdown/MDX files.

This idea is comes from the [official guide](https://docs.astro.build/en/recipes/reading-time), but I want to make it as an integration for easy to use.

## Installation

This integration supports the `astro add` command, you can install it by running:

```bash
npx astro add astro-reading-time
```

It will add and setup the integration automatically. If you prefer, you can [install integrations manually](#manual-install) instead.

> **Note**: If you use `@astrojs/mdx` integration as well, please **make sure** to keep `astro-reading-time` before `@astrojs/mdx` in the `astro.config.*` file.

### Manual Install

First, install the `astro-reading-time` package:

```bash
npm install astro-reading-time
```

Then, apply the integration to your `astro.config.*` file using the `integrations` property:

```javascript
import { defineConfig } from "astro/config";
import readingTime from "astro-reading-time";
import mdx from "@astrojs/mdx";

export default defineConfig({
  // ...
  integrations: [
    readingTime(), // Keep it before `mdx` integration
    mdx(),
  ],
});
```

## Usage

The usage of this integration is same as the [official guide](https://docs.astro.build/en/recipes/reading-time), you can use the `minutesRead` field which is injected into the frontmatters of your Markdown/MDX content.

If your blog posts are stored in a [content collection](https://docs.astro.build/en/guides/content-collections), access the `remarkPluginFrontmatter` from the `entry.render()` function. Then, render `minutesRead` in your template wherever you would like it to appear.

```astro
---
import { CollectionEntry, getCollection } from "astro:content";

export async function getStaticPaths() {
  const blog = await getCollection("blog");
  return blog.map((entry) => ({
    params: { slug: entry.slug },
    props: { entry },
  }));
}

const { entry } = Astro.props;
const { Content, remarkPluginFrontmatter } = await entry.render();
---

<html>
  <head></head>...
  <body>
    ...
    <p>{remarkPluginFrontmatter.minutesRead}</p>
    ...
  </body>
</html>
```

If you’re using a [Markdown layout](https://docs.astro.build/en/guides/markdown-content/#markdown-and-mdx-pages), use the `minutesRead` frontmatter property from `Astro.props` in your layout template.

```astro
---
const { minutesRead } = Astro.props.frontmatter;
---

<html>
  <head></head>...
  <body>
    <p>{minutesRead}</p>
    <slot />
  </body>
</html>
```

## License

The code in this package under the [MIT License](./LICENSE).
