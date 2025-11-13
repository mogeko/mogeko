import { Client } from "@notionhq/client";

import "server-only";

const auth = process.env.NOTION_AUTH_TOKEN;

export const notion = new Client({ auth, fetch });
