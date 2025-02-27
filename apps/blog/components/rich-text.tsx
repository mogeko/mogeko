import { components } from "@/components/context";
import type { RichTextItemResponse } from "@/lib/api-endpoints";

export const RichText: React.FC<{
  richtext: RichTextItemResponse;
  className?: string;
}> = ({ richtext, className }) => {
  if (richtext.type === "text") {
    const { link, content } = richtext.text;

    return link ? (
      <components.Link className={className} href={link.url}>
        {content}
      </components.Link>
    ) : (
      <span className={className}>{content}</span>
    );
  }
};
