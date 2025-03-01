import { plainText } from "@/components/text";
import type { CodeBlockObjectResponse } from "@/lib/api-endpoints";
import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { Fragment, cache } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { type BundledLanguage, codeToHast } from "shiki";

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
      lang: languageTranslator(language),
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

type LanguageRequest = CodeBlockObjectResponse["code"]["language"];

const languageTranslator = cache(
  (lang: LanguageRequest): BundledLanguage | "plain" | "ansi" => {
    if (lang === "plain text") return "plain";
    if (lang === "agda") return "plain";
    if (lang === "java/c/c++/c#") return "java";
    if (lang === "arduino") return "c++";
    if (lang === "ascii art") return "plain";
    if (lang === "assembly") return "asm";
    if (lang === "basic") return "vb";
    if (lang === "bnf") return "plain";
    if (lang === "dhall") return "plain";
    if (lang === "ebnf") return "plain";
    if (lang === "flow") return "javascript";
    if (lang === "fortran") return "fortran-fixed-form";
    if (lang === "idris") return "plain";
    if (lang === "livescript") return "javascript";
    if (lang === "llvm ir") return "plain";
    if (lang === "markup") return "html";
    if (lang === "mathematica") return "wolfram";
    if (lang === "notion formula") return "plain";
    if (lang === "reason") return "ocaml";
    if (lang === "vb.net") return "vb";
    if (lang === "visual basic") return "vb";
    if (lang === "webassembly") return "wasm";

    return lang;
  },
);
