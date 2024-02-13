/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly SITE_BASE_TITLE?: string;
  readonly SITE_DESCRIPTION?: string;
  readonly SITE_AUTHOR?: string;
  readonly SITE_KEYWORDS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
