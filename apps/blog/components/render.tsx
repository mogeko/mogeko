import { Equation } from "@/components/equation";
import { RichText } from "@/components/text";
import type { GetBlockResponse } from "@/lib/api-endpoints";
import { colorVariants } from "@/lib/color-variants";
import { notion } from "@/lib/notion";
import { twMerge } from "tailwind-merge";

export const NotionRender: React.FC<GetBlockResponse> = async (block) => {
  if ("type" in block) {
    switch (block.type) {
      case "paragraph": {
        const { color, rich_text } = block.paragraph;
        const className = twMerge(colorVariants({ color }));
        return (
          <p className={className.length ? className : void 0}>
            {rich_text.map((richText, i) => {
              return <RichText key={`${block.id}-p-${i}`} {...richText} />;
            })}
          </p>
        );
      }

      case "equation": {
        const { expression } = block.equation;

        return (
          <Equation className="flex justify-center items-center">
            {expression}
          </Equation>
        );
      }

      case "child_page": {
        if (block.has_children) {
          const { results } = await notion.blocks.children.list({
            block_id: block.id,
          });

          return results.map((block) => {
            return <NotionRender key={block.id} {...block} />;
          });
        }
      }
    }
  }
};
