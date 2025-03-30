import { Link } from "@/components/ui/link";
import type { MentionRichTextItemResponse } from "@/lib/api-endpoints";
import { shortId } from "@/lib/utils";

export const Mention: React.FC<
  React.PropsWithChildren<{
    mention: MentionRichTextItemResponse["mention"];
    className?: string;
  }>
> = ({ className, mention, children }) => {
  if (mention.type === "page") {
    return (
      <Link className={className} href={`/posts/${shortId(mention.page.id)}`}>
        {children}
      </Link>
    );
  }

  if (mention.type === "database") {
    return (
      <Link
        className={className}
        href={`/posts/${shortId(mention.database.id)}`}
      >
        {children}
      </Link>
    );
  }
};
