# @mogeko/blog

## 0.2.5

### Patch Changes

- [#385](https://github.com/mogeko/mogeko/pull/385) [`bbedcb1`](https://github.com/mogeko/mogeko/commit/bbedcb13c47ee425d2beb8f569ea489dbb1341f9) Thanks [@mogeko](https://github.com/mogeko)! - Improve error handling and enable auto-merge for Changesets PRs

## 0.2.4

### Patch Changes

- [#380](https://github.com/mogeko/mogeko/pull/380) [`aa60b85`](https://github.com/mogeko/mogeko/commit/aa60b850332c74d25d798e581c4197545b9e8dc0) Thanks [@mogeko](https://github.com/mogeko)! - Adapt to the new Data Sources API for Notion API

- [#380](https://github.com/mogeko/mogeko/pull/380) [`7877c26`](https://github.com/mogeko/mogeko/commit/7877c26f28bf5776bf8116ca1f88060920bed7b0) Thanks [@mogeko](https://github.com/mogeko)! - Setup React Compiler.

- [#380](https://github.com/mogeko/mogeko/pull/380) [`9edfa74`](https://github.com/mogeko/mogeko/commit/9edfa743a04d520ec4f17b3d43d22b1e38dd0bfa) Thanks [@mogeko](https://github.com/mogeko)! - Integrate Redis for image caching.

## 0.2.3

### Patch Changes

- [#317](https://github.com/mogeko/mogeko/pull/317) [`1d51014`](https://github.com/mogeko/mogeko/commit/1d51014c9124c5a69d19d98501c72802c32ba63d) Thanks [@mogeko](https://github.com/mogeko)! - Add error handling for image loading.

  Since the Cloudinary CDN is not always available in China, we use ImageKitas a fallback. The image is stored in Cloudinary and proxied through ImageKit.

  See: https://imagekit.io/docs/integration/web-proxy

## 0.2.2

### Patch Changes

- [#311](https://github.com/mogeko/mogeko/pull/311) [`4137277`](https://github.com/mogeko/mogeko/commit/4137277e16fd4818ec80bb2cf9bcfee84e8f72b5) Thanks [@mogeko](https://github.com/mogeko)! - Filter out article pages with a Status of "Draft".

## 0.2.1

### Patch Changes

- [#306](https://github.com/mogeko/mogeko/pull/306) [`e4b8fb5`](https://github.com/mogeko/mogeko/commit/e4b8fb51c77ab21e3c6fe0ad5bae359a9b17e708) Thanks [@mogeko](https://github.com/mogeko)! - Remove nested pages to keep it simple.

  Since Cloudinary handles the image processing load, designing nested pages as a performance compromise is no longer necessary.

## 0.2.0

### Minor Changes

- [#303](https://github.com/mogeko/mogeko/pull/303) [`d46c048`](https://github.com/mogeko/mogeko/commit/d46c04867760e2d166bbec02150e1f80720dd8d4) Thanks [@mogeko](https://github.com/mogeko)! - Refactor image handling with Cloudinary integration.

### Patch Changes

- [#303](https://github.com/mogeko/mogeko/pull/303) [`9fa8b5a`](https://github.com/mogeko/mogeko/commit/9fa8b5a5a8b40154ea1d5cd6bdc6265f384096c5) Thanks [@mogeko](https://github.com/mogeko)! - Set up global Cache for the Notion API.

## 0.1.8

### Patch Changes

- [#298](https://github.com/mogeko/mogeko/pull/298) [`3d951af`](https://github.com/mogeko/mogeko/commit/3d951aff620e4ed416b15ca96fea1e6e4c0b3d57) Thanks [@mogeko](https://github.com/mogeko)! - Add support for column and column_list blocks in NotionRender.

- [#298](https://github.com/mogeko/mogeko/pull/298) [`39cf02c`](https://github.com/mogeko/mogeko/commit/39cf02ca7f14b4ae1a3a17c64d892364abc7f63a) Thanks [@mogeko](https://github.com/mogeko)! - Reduce one unnecessary network fetch.

## 0.1.7

### Patch Changes

- [#294](https://github.com/mogeko/mogeko/pull/294) [`2ab4582`](https://github.com/mogeko/mogeko/commit/2ab458262233d9f38a82d6d3c19b893576973197) Thanks [@mogeko](https://github.com/mogeko)! - Implement secondary pages.

## 0.1.6

### Patch Changes

- [#283](https://github.com/mogeko/mogeko/pull/283) [`9fe37db`](https://github.com/mogeko/mogeko/commit/9fe37db89901a083a59773f32a0ba34dfa47dd3d) Thanks [@mogeko](https://github.com/mogeko)! - Implement OAuth access token and authorization routes with AES-GCM encryption.

## 0.1.5

### Patch Changes

- [#279](https://github.com/mogeko/mogeko/pull/279) [`fffaa97`](https://github.com/mogeko/mogeko/commit/fffaa970e9721edb21331256bb7ce323387f0701) Thanks [@mogeko](https://github.com/mogeko)! - Update color variables for improved theming consistency.

  - Use a unified color system (`oklch`).
  - Choose colors from the [TailwindCSS color palette](https://tailwindcss.com/docs/colors) whenever possible.

## 0.1.4

### Patch Changes

- [#271](https://github.com/mogeko/mogeko/pull/271) [`3074f7f`](https://github.com/mogeko/mogeko/commit/3074f7f4562e7aa274de2768df0a0450120f8a2e) Thanks [@mogeko](https://github.com/mogeko)! - Update base URL handling in robots and sitemap functions to use Vercel production URL.

- [#271](https://github.com/mogeko/mogeko/pull/271) [`3074f7f`](https://github.com/mogeko/mogeko/commit/3074f7f4562e7aa274de2768df0a0450120f8a2e) Thanks [@mogeko](https://github.com/mogeko)! - Add custom 404 Not Found page with ASCII art and error message.

- [#271](https://github.com/mogeko/mogeko/pull/271) [`3074f7f`](https://github.com/mogeko/mogeko/commit/3074f7f4562e7aa274de2768df0a0450120f8a2e) Thanks [@mogeko](https://github.com/mogeko)! - Enhance error handling for database and page retrievals with notFound responses.

## 0.1.3

### Patch Changes

- [#268](https://github.com/mogeko/mogeko/pull/268) [`6f661a3`](https://github.com/mogeko/mogeko/commit/6f661a3473759f22c18e1366cb99b8ba23682dfb) Thanks [@mogeko](https://github.com/mogeko)! - Implement shortId utility and update links to use short IDs.

## 0.1.2

### Patch Changes

- [#265](https://github.com/mogeko/mogeko/pull/265) [`f9625bc`](https://github.com/mogeko/mogeko/commit/f9625bcad9ab14cd597b46ad304aec24a2064cd4) Thanks [@mogeko](https://github.com/mogeko)! - Allow the use of the `lang:<name>` tag in Notion's Code Block for languages not existing in the Code Block.

## 0.1.1

### Patch Changes

- [#263](https://github.com/mogeko/mogeko/pull/263) [`615e56f`](https://github.com/mogeko/mogeko/commit/615e56f292b8565e40954ec8b9f95da677cd6b72) Thanks [@mogeko](https://github.com/mogeko)! - Add sitemap.xml generation.

- [#263](https://github.com/mogeko/mogeko/pull/263) [`2dfbe6b`](https://github.com/mogeko/mogeko/commit/2dfbe6b1ea5edc7345ce3be77ab8acd4c2d87b95) Thanks [@mogeko](https://github.com/mogeko)! - Add robots.txt generation for SEO.

## 0.1.0

### Minor Changes

- [#258](https://github.com/mogeko/mogeko/pull/258) [`a853fab`](https://github.com/mogeko/mogeko/commit/a853fab90f8340c9ade7182ac046425aea39623b) Thanks [@mogeko](https://github.com/mogeko)! - Switch the web framework to Next.js.

## 0.0.17

### Patch Changes

- [#175](https://github.com/mogeko/mogeko/pull/175) [`c1ded6a`](https://github.com/mogeko/mogeko/commit/c1ded6a0a032b308c651699e7f9167a13eb8e90e) Thanks [@mogeko](https://github.com/mogeko)! - Completely move out of the [`prettier`](https://prettier.io).

- Updated dependencies [[`c1ded6a`](https://github.com/mogeko/mogeko/commit/c1ded6a0a032b308c651699e7f9167a13eb8e90e)]:
  - astro-reading-time@0.1.13
  - remark-anchor-link@0.1.11
  - astro-mermaid@0.1.5
  - @mogeko/utils@0.6.2

## 0.0.16

### Patch Changes

- [#173](https://github.com/mogeko/mogeko/pull/173) [`6dd0ef9`](https://github.com/mogeko/mogeko/commit/6dd0ef90c26e9e7584f9d13d0752e4665d5eeda7) Thanks [@mogeko](https://github.com/mogeko)! - Use [`biome`](https://biomejs.dev) instead of [`prettier`](https://prettier.io) to format the code.

- Updated dependencies [[`6dd0ef9`](https://github.com/mogeko/mogeko/commit/6dd0ef90c26e9e7584f9d13d0752e4665d5eeda7)]:
  - astro-reading-time@0.1.12
  - remark-anchor-link@0.1.10
  - astro-mermaid@0.1.4
  - @mogeko/utils@0.6.1

## 0.0.15

### Patch Changes

- Updated dependencies [[`d337619`](https://github.com/mogeko/mogeko/commit/d337619b163fd68a1e14a378319d02f823507867)]:
  - @mogeko/utils@0.6.0
  - astro-reading-time@0.1.11
  - remark-anchor-link@0.1.9

## 0.0.14

### Patch Changes

- Updated dependencies [[`85efca9`](https://github.com/mogeko/mogeko/commit/85efca9e27957cdfd1b002097b0d628f7363de99)]:
  - @mogeko/utils@0.5.0
  - astro-reading-time@0.1.10
  - remark-anchor-link@0.1.8

## 0.0.13

### Patch Changes

- Updated dependencies [[`36690ba`](https://github.com/mogeko/mogeko/commit/36690bae69cb9f2054dac6a7217a18dd303f7cc2)]:
  - astro-reading-time@0.1.9
  - remark-anchor-link@0.1.7
  - astro-mermaid@0.1.3
  - @mogeko/utils@0.4.1

## 0.0.12

### Patch Changes

- Updated dependencies [[`3506015`](https://github.com/mogeko/mogeko/commit/350601576ed2f96a67df259303996b0ae92ac424)]:
  - astro-mermaid@0.1.2

## 0.0.11

### Patch Changes

- Updated dependencies [[`b421401`](https://github.com/mogeko/mogeko/commit/b421401d5035e32fb249cf279e79d9ffee54e3d7), [`6803313`](https://github.com/mogeko/mogeko/commit/68033137f3947c1b4c73733abf5868e47df98211), [`496cf16`](https://github.com/mogeko/mogeko/commit/496cf166ed6dab049311b9f325e82ab2509725c0), [`6b4dc35`](https://github.com/mogeko/mogeko/commit/6b4dc351b029cfc340d4c70682cbd09178ded7b1)]:
  - @mogeko/utils@0.4.0
  - astro-reading-time@0.1.8
  - remark-anchor-link@0.1.6

## 0.0.10

### Patch Changes

- Updated dependencies [[`37af8b4`](https://github.com/mogeko/mogeko/commit/37af8b4eec9ea28e5624ca241424263c6a4f4e6a)]:
  - @mogeko/utils@0.3.1
  - astro-reading-time@0.1.7
  - remark-anchor-link@0.1.5

## 0.0.9

### Patch Changes

- Updated dependencies [[`de51fac`](https://github.com/mogeko/mogeko/commit/de51fac1fe35581b235f2ccf077ee59ec34fcf24), [`b91c79f`](https://github.com/mogeko/mogeko/commit/b91c79f375abe0e5c1dcd71bd2be7a2c6585918c), [`e4b8ef8`](https://github.com/mogeko/mogeko/commit/e4b8ef8ec1861f68ca766c6343796005f111ebc6), [`68facae`](https://github.com/mogeko/mogeko/commit/68facae494239a29a1410236a764c6e8fddccb16), [`1b6dcea`](https://github.com/mogeko/mogeko/commit/1b6dceaeda531ae92c3c5200cdbb60044ba8dbda)]:
  - @mogeko/utils@0.3.0
  - astro-reading-time@0.1.6
  - remark-anchor-link@0.1.4

## 0.0.8

### Patch Changes

- Updated dependencies [[`3ff29a3`](https://github.com/mogeko/mogeko/commit/3ff29a381b5c2c4050ba5b8cacdbef7a41ec02a2), [`4e2b8f0`](https://github.com/mogeko/mogeko/commit/4e2b8f038ffe32e0858750ec2459756690f7e13e), [`2a96d55`](https://github.com/mogeko/mogeko/commit/2a96d55e010c5bd9239af369a8e1b31179476104)]:
  - @mogeko/utils@0.2.1
  - astro-reading-time@0.1.5
  - remark-anchor-link@0.1.3

## 0.0.7

### Patch Changes

- Updated dependencies [[`5615f71`](https://github.com/mogeko/mogeko/commit/5615f71f4886068b5720c5d2ed4ddc7b9add7f9d), [`4c1ba9f`](https://github.com/mogeko/mogeko/commit/4c1ba9f5b0325f9071ad5d978be65c5399632eae), [`088ae19`](https://github.com/mogeko/mogeko/commit/088ae19dbc91d0f90ef4e16f423cf34c40011b2c), [`41f08cb`](https://github.com/mogeko/mogeko/commit/41f08cb392a0014023df5911bfabe843a9604f78)]:
  - @mogeko/utils@0.2.0
  - astro-reading-time@0.1.4
  - remark-anchor-link@0.1.2

## 0.0.6

### Patch Changes

- Updated dependencies [[`da91203`](https://github.com/mogeko/mogeko/commit/da912038857daffebce42611b74783623a9013ba), [`a0587fb`](https://github.com/mogeko/mogeko/commit/a0587fb8552cf21426ce1d7588dca332e85e8165), [`b2f2c23`](https://github.com/mogeko/mogeko/commit/b2f2c2302d4dffc0aa7d2558282015d8f56f4373)]:
  - @mogeko/utils@0.1.0
  - astro-reading-time@0.1.3
  - remark-anchor-link@0.1.1

## 0.0.5

### Patch Changes

- Updated dependencies [[`5f61053`](https://github.com/mogeko/mogeko/commit/5f610536e25386f4ec8257f94186032f6cebf08f), [`1b45226`](https://github.com/mogeko/mogeko/commit/1b45226dcce64ddb91c64d8ef8d36205f06e1bf7), [`f89da59`](https://github.com/mogeko/mogeko/commit/f89da591e3c1d7a1daef11b50e4411c06064f20c), [`eff1b3a`](https://github.com/mogeko/mogeko/commit/eff1b3a0a097ce424cf37f10f0c773a453fadbf0), [`1ca244b`](https://github.com/mogeko/mogeko/commit/1ca244bcdf096a927c71ef6f844bc9f42ef1fe5b), [`7900f2a`](https://github.com/mogeko/mogeko/commit/7900f2aceec7ef509d8fa773402c39f0a604ae28), [`c29ee51`](https://github.com/mogeko/mogeko/commit/c29ee51411a192f4cbda4507988078f2cefee958), [`fc07bfa`](https://github.com/mogeko/mogeko/commit/fc07bfa059ecf59f9c0b232ab5c504ed52258502), [`87edd5f`](https://github.com/mogeko/mogeko/commit/87edd5ff52440b6ff7d456a4055fe5af23d6f683)]:
  - astro-reading-time@0.1.2
  - remark-anchor-link@0.1.0

## 0.0.4

### Patch Changes

- Updated dependencies [[`2bc7cf0`](https://github.com/mogeko/mogeko/commit/2bc7cf0a568a769ca4774c4f9a141a26f3c38c3d), [`de42d1b`](https://github.com/mogeko/mogeko/commit/de42d1b44b9226d649f38bf5425336eb4690b4a4), [`8a1abb1`](https://github.com/mogeko/mogeko/commit/8a1abb1d2389919479ef5821fda5cfe0b883ade0), [`f677a4b`](https://github.com/mogeko/mogeko/commit/f677a4bdc4b0a8c4d5fc46a41af9bb922da8c1e2)]:
  - astro-mermaid@0.1.0

## 0.0.3

### Patch Changes

- Updated dependencies [[`4092d98`](https://github.com/mogeko/mogeko/commit/4092d9836b24c4a77b4e4b23eafd0a7a86a1eebd)]:
  - astro-reading-time@0.1.1

## 0.0.2

### Patch Changes

- Updated dependencies [[`e513646`](https://github.com/mogeko/mogeko/commit/e513646771ce007a2f3e2e9620e8e6abe4b761e5), [`e513646`](https://github.com/mogeko/mogeko/commit/e513646771ce007a2f3e2e9620e8e6abe4b761e5), [`e513646`](https://github.com/mogeko/mogeko/commit/e513646771ce007a2f3e2e9620e8e6abe4b761e5), [`b048d7a`](https://github.com/mogeko/mogeko/commit/b048d7a8e3bfd678ffca48abf21582652aae6726), [`932ad57`](https://github.com/mogeko/mogeko/commit/932ad5761fb499d8488853f71b14d8f32a9316b7)]:
  - astro-reading-time@0.1.0
