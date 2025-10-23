import { cacheLife, cacheTag } from "next/cache";
import { isFullPage, notion } from "@/lib/notion";

export async function retrievePage(page_id?: string) {
  "use cache";

  if (page_id) {
    cacheTag("notion", "article", page_id);
    cacheLife("default");

    const page = await notion.pages.retrieve({ page_id });

    if (isFullPage(page)) {
      return page;
    }
  }
}
