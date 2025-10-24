import { Link } from "@/components/ui/link";
import type { MentionRichTextItemResponse } from "@/lib/notion";
import { formatUUID } from "@/lib/utils";

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
        href={`/posts/${formatUUID(mention.page.id)}`}
      >
        {children}
      </Link>
    );
  }

  if (mention.type === "database") {
    return (
      <Link
        className={className}
        href={`/posts/${formatUUID(mention.database.id)}`}
      >
        {children}
      </Link>
    );
  }
};
