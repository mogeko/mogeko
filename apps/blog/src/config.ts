export const siteConfig = {
  title: import.meta.env.SITE_BASE_TITLE || "Mogeko's Blog",
  description:
    import.meta.env.SITE_DESCRIPTION ||
    "A place to share what I've learned, what I'm working on, and what I'm thinking about.",
  author: import.meta.env.SITE_AUTHOR || "Mogeko",
  keywords:
    import.meta.env.SITE_KEYWORDS || "blog, programming, open source, software",
} as const;

export type SiteConfig = typeof siteConfig;
