import { plainText } from "@/components/text";
import type { CodeBlockObjectResponse } from "@/lib/api-endpoints";
import { codeToHtml, langAlias } from "@/lib/highlighter";
import { cn } from "@/lib/utils";

import { transformerColorizedBrackets } from "@shikijs/colorized-brackets";
import {
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationFocus,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers";

export const Code: React.FC<{
  code: CodeBlockObjectResponse;
  className?: string;
}> = async ({ code: codeBlock, className }) => {
  const { language, rich_text } = codeBlock.code;
  const html = await codeToHtml(plainText(rich_text), {
    lang: langAlias(language),
    theme: "andromeeda",
    transformers: [
      transformerColorizedBrackets(),
      transformerNotationDiff(),
      transformerNotationErrorLevel(),
      transformerNotationWordHighlight(),
      transformerNotationFocus(),
      transformerNotationHighlight(),
    ],
    tabindex: -1,
  });

  return (
    <div
      className={cn("font-mono", className)}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
  );
};
