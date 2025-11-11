import type { MentionRichTextItemResponse } from "@notionhq/client";
import { Link } from "@/components/ui/link";
import { shortenUUID } from "@/lib/utils";

export const Mention: React.FC<
  React.PropsWithChildren<{
    mention: MentionRichTextItemResponse["mention"];
    className?: string;
  }>
> = ({ className, mention, children }) => {
  if (mention.type === "page") {
    return (
      <Link
        className={className}
        href={`/posts/${shortenUUID(mention.page.id)}`}
      >
        {children}
      </Link>
    );
  }

  if (mention.type === "database") {
    return (
      <Link
        className={className}
        href={`/posts/${shortenUUID(mention.database.id)}`}
      >
        {children}
      </Link>
    );
  }
};
