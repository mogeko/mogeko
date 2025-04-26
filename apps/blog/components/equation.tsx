import { renderToString } from "katex";

import "katex/dist/katex.min.css";

export const Equation: React.FC<
  { expression: string; inline?: boolean } & React.HTMLAttributes<HTMLElement>
> = ({ expression, inline, ...props }) => {
  const Comp = inline ? "span" : "p";

  return (
    <Comp
      // biome-ignore lint/security/noDangerouslySetInnerHtml: HTML is sanitized
      dangerouslySetInnerHTML={{
        __html: renderToString(expression, {
          throwOnError: false,
        }),
      }}
      {...props}
    />
  );
};
