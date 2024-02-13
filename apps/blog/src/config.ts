export const siteConfig = {
  title: import.meta.env.SITE_BASE_TITLE || "Mogeko's Blog",
  description: import.meta.env.SITE_DESCRIPTION || "A place to share my life.",
  author: import.meta.env.SITE_AUTHOR || "Mogeko",
  keywords: import.meta.env.SITE_EKYWORDS || ["blog", "programming"].join(", "),
} as const;

export type SiteConfig = typeof siteConfig;
