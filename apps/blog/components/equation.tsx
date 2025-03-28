import { renderToString } from "katex";

import "katex/dist/katex.min.css";

export const Equation: React.FC<
  {} & { expression: string; inline?: boolean; className?: string }
> = ({ expression, inline, ...props }) => {
  const Comp = inline ? "span" : "p";

  return (
    <Comp
      // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
      dangerouslySetInnerHTML={{
        __html: renderToString(expression, {
          throwOnError: false,
        }),
      }}
      {...props}
    />
  );
};
