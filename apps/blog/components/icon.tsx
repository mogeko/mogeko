import type { CalloutBlockObjectResponse } from "@/lib/api-endpoints";

type IconBlock = CalloutBlockObjectResponse["callout"]["icon"];

export const Icon: React.FC<
  React.HTMLAttributes<HTMLSpanElement> & { icon: IconBlock }
> = ({ icon, ...props }) => {
  if (icon?.type === "emoji") {
    return <span {...props}>{icon.emoji}</span>;
  }
};
