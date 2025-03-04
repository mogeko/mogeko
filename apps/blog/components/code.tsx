import { plainText } from "@/components/text";
import type { CodeBlockObjectResponse } from "@/lib/api-endpoints";
import { codeToHast, langAlias } from "@/lib/highlighter";
import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { Fragment } from "react";
import { jsx, jsxs } from "react/jsx-runtime";

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
  const { language, rich_text, caption: _ } = codeBlock.code;

  return toJsxRuntime(
    await codeToHast(plainText(rich_text), {
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
    }),
    { Fragment, jsx, jsxs },
  );
};
