import { renderToString } from "katex";

import "katex/dist/katex.min.css";

type Props = { expression: string; inline?: boolean; className?: string };

export const Equation: React.FC<Props> = ({ expression, inline, ...props }) => {
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
