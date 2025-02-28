import { renderToString } from "katex";
import { type Ref, forwardRef } from "react";

import "katex/dist/katex.min.css";

export const Equation = forwardRef<
  HTMLParagraphElement | HTMLSpanElement,
  Omit<
    React.HTMLAttributes<HTMLParagraphElement | HTMLSpanElement>,
    "children"
  > & { children: string; inline?: boolean }
>(({ children, inline, ...props }, ref) => {
  const Comp = inline ? "span" : "p";

  return (
    <Comp
      // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
      dangerouslySetInnerHTML={{
        __html: renderToString(children, { throwOnError: false }),
      }}
      ref={ref as Ref<HTMLParagraphElement>}
      {...props}
    />
  );
});
Equation.displayName = "Equation";
