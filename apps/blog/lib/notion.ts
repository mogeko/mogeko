import { env } from "node:process";
import { Client } from "@notionhq/client";

import "server-only";

export const notion = new Client({ auth: env.NOTION_AUTH_TOKEN, fetch });
