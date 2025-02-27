import type { GetBlockResponse } from "@/lib/api-endpoints";
import { notion } from "@/lib/notion";

export const NotionRender: React.FC<{
  block: GetBlockResponse;
}> = async ({ block }) => {
  const Children: React.FC = async () => {
    if ("has_children" in block && block.has_children) {
      const { results } = await notion.blocks.children.list({
        block_id: block.id,
      });

      return results.map((block) => (
        <NotionRender key={block.id} block={block} />
      ));
    }
  };

  if ("type" in block) {
    switch (block.type) {
      case "child_page":
        return <Children />;
    }
  }
};
