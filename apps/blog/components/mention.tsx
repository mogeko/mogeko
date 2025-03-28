import { Link } from "@/components/ui/link";
import type { MentionRichTextItemResponse } from "@/lib/api-endpoints";

export const Mention: React.FC<
  React.PropsWithChildren<{
    mention: MentionRichTextItemResponse["mention"];
    className?: string;
  }>
> = ({ className, mention, children }) => {
  if (mention.type === "page") {
    return (
      <Link className={className} href={`/posts/${mention.page.id}`}>
        {children}
      </Link>
    );
  }

  if (mention.type === "database") {
    return (
      <Link className={className} href={`/posts/${mention.database.id}`}>
        {children}
      </Link>
    );
  }
};
