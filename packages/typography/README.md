# @mogeko/typography

A typography plugin for [Tailwind CSS](https://tailwindcss.com).

It is a group of beautiful typographic that can be used to style any vanilla HTML you don’t control (like Markdown, or a CMS). Its usage is similar to the official [typography plug-in](https://tailwindcss.com/docs/typography-plugin) of Tailwind CSS (Use the `prose` class), but it is simpler. **This means that it is easier for you to develop your own plug-ins according to your project.**

## Installation

Install the plugin from `pnpm` (alse works with `npm` or `yarn`):

```shell
pnpm install -D @mogeko/typography
```

Then, add the plugin to your `tailwind.config.ts` file:

```ts
import type { Config } from "tailwindcss";

export default {
  theme: {
    // ...
  },
  plugins: [
    require("@mogeko/typography"),
    // ...
  ],
} satisfies Config;
```

## Usage

Use the `prose` classes to add sensible typography styles to any vanilla HTML:

```html
<article class="prose lg:prose-lg">
  <h1>Sonnet 1: From Fairest Creatures We Desire Increase</h1>
  <p>
    From fairest creatures we desire increase,<br />
    That thereby beauty’s rose might never die,<br />
    But as the riper should by time decrease,<br />
    His tender heir mught bear his memeory:<br />
    But thou, contracted to thine own bright eyes,<br />
    Feed’st thy light’st flame with self-substantial fuel,<br />
    Making a famine where abundance lies,<br />
    Thyself thy foe, to thy sweet self too cruel.<br />
    Thou that art now the world’s fresh ornament<br />
    And only herald to the gaudy spring,<br />
    Within thine own bud buriest thy content<br />
    And, tender churl, makest waste in niggarding.<br />
    Pity the world, or else this glutton be,<br />
    To eat the world’s due, by the grave and thee.
  </p>
  <!-- ... -->
</article>
```

### Adding or modify CSS

Add or modify CSS by setting `tailwind.config.ts` file:

```ts
import type { Config } from "tailwindcss";

export default {
  theme: {
    extend: {
      // ...
      typography: {
        sm: {
          /* under the class `prose-sm` */
          h1: { fontSize: "2rem" },
        },
        DEFAULT: {
          /* under the class `prose` */
          h1: { fontSize: "3rem" },
        },
        lg: {
          /* under the class `prose-lg` */
          h1: { fontSize: "4rem" },
        },
      },
      // ...
    },
  },
  plugins: [
    require("@mogeko/typography"),
    // ...
  ],
} satisfies Config;
```

Tailwind’s plugin system expects CSS rules written as JavaScript objects, using the same sort of syntax you might recognize from CSS-in-JS libraries like [Emotion](https://emotion.sh/docs/object-styles), powered by [postcss-js](https://github.com/postcss/postcss-js) under-the-hood.

```ts
{
  DEFAULT: {
    '.card': {
      'background-color': '#fff',
      'border-radius': '.25rem',
      'box-shadow': '0 2px 4px rgba(0,0,0,0.2)',
    }
  }
}
```

Nesting is also supported (powered by [postcss-nested](https://github.com/postcss/postcss-nested)), using the same syntax you might be familiar with from Sass or Less:

```ts
{
  DEFAULT: {
    '.card': {
      'background-color': '#fff',
      'border-radius': '.25rem',
      'box-shadow': '0 2px 4px rgba(0,0,0,0.2)',
      '&:hover': {
        boxShadow: '0 10px 15px rgba(0,0,0,0.2)',
      }
    }
  }
}
```

### Set custom colors

We use three simple CSS variables to set the _Primary color_, _Muted color_ and _radius of rounded corners_ respectively.

You can modify them directly in the `tailwind.config.ts` file:

```ts
import colors from "tailwindcss/colors";
import type { Config } from "tailwindcss";

export default {
  theme: {
    extend: {
      // ...
      typography: {
        DEFAULT: {
          "--tw-prose-primary": colors.slate[900] /* #0f172a */,
          "--tw-prose-muted": colors.slate[200] /* #e2e8f0 */,
          "--tw-prose-radius": ".5rem" /* 8px */,
        },
      },
      // ...
    },
  },
  plugins: [
    require("@mogeko/typography"),
    // ...
  ],
} satisfies Config;
```

### Changing the default class name

If you need to use a class name other than `prose` for any reason, you can do so using the `className` option when registering the plugin:

```ts
import type { Config } from "tailwindcss";

export default {
  theme: {
    // ...
  },
  plugins: [
    require("@mogeko/typography")({
      className: "wysiwyg",
    }),
    // ...
  ],
} satisfies Config;
```

Now every instance of `prose` in the default class names will be replaced by your custom class name:

```html
<article class="wysiwyg lg:wysiwyg-lg">
  <h1>My Heading</h1>
  <p>...</p>

  <p>...</p>

  <!-- ... -->
</article>
```

## LICENSE

The code in this package under the [MIT License](./LICENSE).
