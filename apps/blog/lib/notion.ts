import { Client } from "@notionhq/client";

import "server-only";

export const notion = new Client({
  auth: process.env.NOTION_AUTH_TOKEN,
  fetch: (input, init) => {
    return fetch(input, {
      next: {
        revalidate: 10 * 60, // 10 minute
      },
      ...init,
    });
  },
});

export * from "@notionhq/client";
