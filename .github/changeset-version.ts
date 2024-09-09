// ORIGINALLY FROM CLOUDFLARE WRANGLER:
// https://github.com/cloudflare/wrangler2/blob/main/.github/changeset-version.js

import { exec } from "node:child_process";
import util from "node:util";

const execPromise = util.promisify(exec);

try {
  const results = [
    // This script is used by the `release.yml` workflow to update the version of the packages being released.
    // The standard step is only to run `changeset version` but this does not update the pnpm-lock.yaml file.
    // So we also run `pnpm install`, which does this update.
    // This is a workaround until this is handled automatically by `changeset version`.
    // See https://github.com/changesets/changesets/issues/421.
    await execPromise("pnpm changeset version"),
    // Run `pnpm install` to update the pnpm-lock.yaml file.
    await execPromise("pnpm install --lockfile-only"),
    // Run `pnpm run fmt` to format the code.
    await execPromise("pnpm run fmt"),
  ];

  console.log(results.map(({ stdout, stderr }) => stdout || stderr).join("\n"));
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
