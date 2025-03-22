import { plainText } from "@/components/text";
import type { CodeBlockObjectResponse } from "@/lib/api-endpoints";
import { codeToHtml, langAlias } from "@/lib/highlighter";

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
}> = async ({ code: codeBlock }) => {
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
  });

  return (
    <div
      className="my-1 font-mono"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
  );
};
