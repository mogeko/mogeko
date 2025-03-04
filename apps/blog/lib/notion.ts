import { Client } from "@notionhq/client";

export const notion = new Client({
  auth: process.env.NOTION_AUTH_TOKEN,
  fetch: (input, options) => {
    return fetch(input, {
      ...options,
      next: {
        revalidate: 60, // 1 minute
      },
    });
  },
});

export * from "@notionhq/client";
