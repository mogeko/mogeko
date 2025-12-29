# @mogeko/utils

## 0.7.4

### Patch Changes

- [#465](https://github.com/mogeko/mogeko/pull/465) [`6670bcc`](https://github.com/mogeko/mogeko/commit/6670bcc51728b9f237e28f57ffa754faadae5096) Thanks [@mogeko](https://github.com/mogeko)! - Prevent prototype pollution in `assocPath` function

  Potential fix for https://github.com/mogeko/mogeko/security/code-scanning/3

  To fix the issue, we need to prevent the use of dangerous property names such as **proto**, constructor, and prototype as keys in the assocPath function. This can be achieved by adding a validation step to check if idx (the computed property name) matches any of these reserved names. If it does, we can throw an error or handle it appropriately to prevent prototype pollution.

  The fix involves:

  1. Adding a validation step for idx to ensure it does not match dangerous property names.
  2. Updating the assocPath function to include this validation before proceeding with the assignment.

## 0.7.3

### Patch Changes

- [#463](https://github.com/mogeko/mogeko/pull/463) [`72d5ad7`](https://github.com/mogeko/mogeko/commit/72d5ad73ece365d50f6e64dc519f44e63b912a94) Thanks [@mogeko](https://github.com/mogeko)! - Update TypeScript configurations and enhance type declarations

## 0.7.2

### Patch Changes

- [#460](https://github.com/mogeko/mogeko/pull/460) [`ee1f63f`](https://github.com/mogeko/mogeko/commit/ee1f63f997d1c1a114bdb24b5c77b06e4279454c) Thanks [@mogeko](https://github.com/mogeko)! - Use tsupdown instead of tsup as the bundling tool.

## 0.7.1

### Patch Changes

- [#456](https://github.com/mogeko/mogeko/pull/456) [`d39c837`](https://github.com/mogeko/mogeko/commit/d39c837b500a712bd2a5251f592cd722408f494d) Thanks [@mogeko](https://github.com/mogeko)! - Update AES-GCM implementation to use crypto module directly

## 0.7.0

### Minor Changes

- [#387](https://github.com/mogeko/mogeko/pull/387) [`072cdb9`](https://github.com/mogeko/mogeko/commit/072cdb9d60a27dca57ae563824f7aed8d93aed9e) Thanks [@mogeko](https://github.com/mogeko)! - Add omit and pick utility functions.

## 0.6.3

### Patch Changes

- [#294](https://github.com/mogeko/mogeko/pull/294) [`c009220`](https://github.com/mogeko/mogeko/commit/c009220bdf165ae14c8e4026c7800b053b3cced5) Thanks [@mogeko](https://github.com/mogeko)! - Optimizing AES-GCM encryption and decryption by reducing unnecessary type conversions.

## 0.6.2

### Patch Changes

- [#175](https://github.com/mogeko/mogeko/pull/175) [`c1ded6a`](https://github.com/mogeko/mogeko/commit/c1ded6a0a032b308c651699e7f9167a13eb8e90e) Thanks [@mogeko](https://github.com/mogeko)! - Completely move out of the [`prettier`](https://prettier.io).

## 0.6.1

### Patch Changes

- [#173](https://github.com/mogeko/mogeko/pull/173) [`6dd0ef9`](https://github.com/mogeko/mogeko/commit/6dd0ef90c26e9e7584f9d13d0752e4665d5eeda7) Thanks [@mogeko](https://github.com/mogeko)! - Use [`biome`](https://biomejs.dev) instead of [`prettier`](https://prettier.io) to format the code.

## 0.6.0

### Minor Changes

- [#152](https://github.com/mogeko/mogeko/pull/152) [`d337619`](https://github.com/mogeko/mogeko/commit/d337619b163fd68a1e14a378319d02f823507867) Thanks [@mogeko](https://github.com/mogeko)! - Remove `cn` utility function and its tests.

## 0.5.0

### Minor Changes

- [#147](https://github.com/mogeko/mogeko/pull/147) [`85efca9`](https://github.com/mogeko/mogeko/commit/85efca9e27957cdfd1b002097b0d628f7363de99) Thanks [@mogeko](https://github.com/mogeko)! - Add AES-GCM encryption and decryption functions.

  The `encrypt` and `decrypt` functions will not export in `index.js`. They are only available in the `aes-gcm` module.

  ```typescript
  import { encrypt, decrypt } from "@mogeko/utils/aes-gcm";
  ```

## 0.4.1

### Patch Changes

- [#132](https://github.com/mogeko/mogeko/pull/132) [`36690ba`](https://github.com/mogeko/mogeko/commit/36690bae69cb9f2054dac6a7217a18dd303f7cc2) Thanks [@mogeko](https://github.com/mogeko)! - update package `README.md` files with badges and links.

## 0.4.0

### Minor Changes

- [#123](https://github.com/mogeko/mogeko/pull/123) [`496cf16`](https://github.com/mogeko/mogeko/commit/496cf166ed6dab049311b9f325e82ab2509725c0) Thanks [@mogeko](https://github.com/mogeko)! - Add `has` utility function for checking object properties.

### Patch Changes

- [#123](https://github.com/mogeko/mogeko/pull/123) [`b421401`](https://github.com/mogeko/mogeko/commit/b421401d5035e32fb249cf279e79d9ffee54e3d7) Thanks [@mogeko](https://github.com/mogeko)! - Add documents and use cases to functions.

- [#123](https://github.com/mogeko/mogeko/pull/123) [`6803313`](https://github.com/mogeko/mogeko/commit/68033137f3947c1b4c73733abf5868e47df98211) Thanks [@mogeko](https://github.com/mogeko)! - Optimize `deepMergeWith` utility function.

- [#123](https://github.com/mogeko/mogeko/pull/123) [`6b4dc35`](https://github.com/mogeko/mogeko/commit/6b4dc351b029cfc340d4c70682cbd09178ded7b1) Thanks [@mogeko](https://github.com/mogeko)! - Optimize `deepMergeWith` utility function and remove unused import.

## 0.3.1

### Patch Changes

- [#121](https://github.com/mogeko/mogeko/pull/121) [`37af8b4`](https://github.com/mogeko/mogeko/commit/37af8b4eec9ea28e5624ca241424263c6a4f4e6a) Thanks [@mogeko](https://github.com/mogeko)! - Improve the performance of the `ascocPath` function for Array.

## 0.3.0

### Minor Changes

- [#119](https://github.com/mogeko/mogeko/pull/119) [`68facae`](https://github.com/mogeko/mogeko/commit/68facae494239a29a1410236a764c6e8fddccb16) Thanks [@mogeko](https://github.com/mogeko)! - Add `deepMerge` and `deepMergeWith` utility functions.

- [#119](https://github.com/mogeko/mogeko/pull/119) [`1b6dcea`](https://github.com/mogeko/mogeko/commit/1b6dceaeda531ae92c3c5200cdbb60044ba8dbda) Thanks [@mogeko](https://github.com/mogeko)! - Add `tryCatch` utility function for error handling.

### Patch Changes

- [#119](https://github.com/mogeko/mogeko/pull/119) [`de51fac`](https://github.com/mogeko/mogeko/commit/de51fac1fe35581b235f2ccf077ee59ec34fcf24) Thanks [@mogeko](https://github.com/mogeko)! - Write documents and examples for the `isEmpty` function.

- [#119](https://github.com/mogeko/mogeko/pull/119) [`b91c79f`](https://github.com/mogeko/mogeko/commit/b91c79f375abe0e5c1dcd71bd2be7a2c6585918c) Thanks [@mogeko](https://github.com/mogeko)! - Redesign the function signature of `range` to make its meaning more accurate.

- [#119](https://github.com/mogeko/mogeko/pull/119) [`e4b8ef8`](https://github.com/mogeko/mogeko/commit/e4b8ef8ec1861f68ca766c6343796005f111ebc6) Thanks [@mogeko](https://github.com/mogeko)! - Write documents and examples for the `range` function.

## 0.2.1

### Patch Changes

- [#117](https://github.com/mogeko/mogeko/pull/117) [`3ff29a3`](https://github.com/mogeko/mogeko/commit/3ff29a381b5c2c4050ba5b8cacdbef7a41ec02a2) Thanks [@mogeko](https://github.com/mogeko)! - Improve the type signature of the function `isNil`.

- [#117](https://github.com/mogeko/mogeko/pull/117) [`4e2b8f0`](https://github.com/mogeko/mogeko/commit/4e2b8f038ffe32e0858750ec2459756690f7e13e) Thanks [@mogeko](https://github.com/mogeko)! - Move `is.test.ts` to the correct folder.

- [#117](https://github.com/mogeko/mogeko/pull/117) [`2a96d55`](https://github.com/mogeko/mogeko/commit/2a96d55e010c5bd9239af369a8e1b31179476104) Thanks [@mogeko](https://github.com/mogeko)! - Optimize `isEmpty` function for improved performance.

## 0.2.0

### Minor Changes

- [#115](https://github.com/mogeko/mogeko/pull/115) [`5615f71`](https://github.com/mogeko/mogeko/commit/5615f71f4886068b5720c5d2ed4ddc7b9add7f9d) Thanks [@mogeko](https://github.com/mogeko)! - Update `isObject` to `is` for improved type checking.

- [#115](https://github.com/mogeko/mogeko/pull/115) [`4c1ba9f`](https://github.com/mogeko/mogeko/commit/4c1ba9f5b0325f9071ad5d978be65c5399632eae) Thanks [@mogeko](https://github.com/mogeko)! - Add a new function `tap`.

- [#115](https://github.com/mogeko/mogeko/pull/115) [`088ae19`](https://github.com/mogeko/mogeko/commit/088ae19dbc91d0f90ef4e16f423cf34c40011b2c) Thanks [@mogeko](https://github.com/mogeko)! - Add a new function `range`.

- [#115](https://github.com/mogeko/mogeko/pull/115) [`41f08cb`](https://github.com/mogeko/mogeko/commit/41f08cb392a0014023df5911bfabe843a9604f78) Thanks [@mogeko](https://github.com/mogeko)! - Add a new function `isEmpty` and `isNil`.

## 0.1.0

### Minor Changes

- [#113](https://github.com/mogeko/mogeko/pull/113) [`da91203`](https://github.com/mogeko/mogeko/commit/da912038857daffebce42611b74783623a9013ba) Thanks [@mogeko](https://github.com/mogeko)! - Add a new function `memoize`.

- [#113](https://github.com/mogeko/mogeko/pull/113) [`a0587fb`](https://github.com/mogeko/mogeko/commit/a0587fb8552cf21426ce1d7588dca332e85e8165) Thanks [@mogeko](https://github.com/mogeko)! - Add a new function `cn`.

### Patch Changes

- [#113](https://github.com/mogeko/mogeko/pull/113) [`b2f2c23`](https://github.com/mogeko/mogeko/commit/b2f2c2302d4dffc0aa7d2558282015d8f56f4373) Thanks [@mogeko](https://github.com/mogeko)! - Re-export the function `slug` from `github-slugger`.

## 0.0.2

### Patch Changes

- [#111](https://github.com/mogeko/mogeko/pull/111) [`5f61053`](https://github.com/mogeko/mogeko/commit/5f610536e25386f4ec8257f94186032f6cebf08f) Thanks [@mogeko](https://github.com/mogeko)! - Migrate `assocPath` to a separate module.
