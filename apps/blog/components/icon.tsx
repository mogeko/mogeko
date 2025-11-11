import type { CalloutBlockObjectResponse } from "@notionhq/client";

type IconBlock = CalloutBlockObjectResponse["callout"]["icon"];

export const Icon: React.FC<
  React.HTMLAttributes<HTMLSpanElement> & { icon: IconBlock }
> = ({ icon, ...props }) => {
  if (icon?.type === "emoji") {
    return <span {...props}>{icon.emoji}</span>;
  }
};
