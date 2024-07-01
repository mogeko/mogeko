# remark-anchor-link

[![Monorepo Build](https://github.com/mogeko/mogeko/actions/workflows/mono-build.yml/badge.svg)](https://github.com/mogeko/mogeko/actions/workflows/mono-build.yml)
[![CodeQL](https://github.com/mogeko/mogeko/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/mogeko/mogeko/actions/workflows/github-code-scanning/codeql)
[![codecov](https://codecov.io/gh/mogeko/mogeko/graph/badge.svg?token=WU7ZGP8Y3F)](https://codecov.io/gh/mogeko/mogeko)

A Remark plugin to add anchor links to headings.

This plugin processes headings in the markdown and adds anchor links to them so that they can be linked to directly. The anchor links are added as an `a` tag with a `href` attribute pointing to the heading's `id`. The anchor links are also given a class of `"anchor"` for styling purposes and an `aria-hidden="true"` attribute to hide them from screen readers.

### Input:

```markdown
# Heading 1

## Heading 2

### Heading 3
```

### Output:

```html
<h1 id="heading-1">
  <a href="#heading-1" class="anchor" aria-hidden="true">#</a>
  Heading 1
</h1>
<h2 id="heading-2">
  <a href="#heading-2" class="anchor" aria-hidden="true">#</a>
  Heading 2
</h2>
<h3 id="heading-3">
  <a href="#heading-3" class="anchor" aria-hidden="true">#</a>
  Heading 3
</h3>
```

## Installation

```bash
npm install remark-anchor-link
```

## Usage

```typescript
remark().use(remarkAnchorLink [, options]);
```

```typescript
import { remark } from "remark";
import { remarkAnchorLink } from "remark-anchor-link";

const doc = "# Heading 1";
const processor = remark().use(remarkAnchorLink);
const file = await processor.process(doc);

console.log(String(file)); // # [#](#heading-1)Heading 1
```

> [!NOTE]
>
> - You may need other plugins (e.g. [`remark-parse`](https://www.npmjs.com/package/remark-parse), [`remark-html`](https://www.npmjs.com/package/remark-html), etc.) to parse markdown to HTML.
> - The `class` and `aria-hidden` attributes may behave differently depending on the plugin used.

## Options

### `options.location`

- Type: `"prefix" | "suffix"`
- Default: `"prefix"`

The location of the anchor link relative to the heading text.

### `options.className`

- Type: `string`
- Default: `"anchor"`

To customize the class name of the anchor link.

### `options.levels`

- Type: `(1 | 2 | 3 | 4 | 5 | 6)[]`
- Default: `[1, 2, 3, 4]`

To specify which heading levels to add anchor links to.

### `options.marker`

- Type: `string`
- Default: `"#"`

The marker to use for the anchor link.

## License

The code in this package under the [MIT License](./LICENSE).
