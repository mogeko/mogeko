import type { CodeBlockObjectResponse } from "@notionhq/client";
import { transformerColorizedBrackets } from "@shikijs/colorized-brackets";
import {
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationFocus,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers";
import { type BundledLanguage, codeToHtml, type SpecialLanguage } from "shiki";
import { plainText } from "@/components/text";
import { cn } from "@/lib/utils";

export const Code: React.FC<
  { code: CodeBlockObjectResponse } & React.HTMLAttributes<HTMLDivElement>
> = async ({ code: codeBlock, className }) => {
  const { language, rich_text, caption } = codeBlock.code;

  return (
    <div
      className={cn("font-mono", className)}
      dangerouslySetInnerHTML={{
        __html: await codeToHtml(plainText(rich_text), {
          lang: langAlias(language, plainText(caption)),
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
        }),
      }}
    />
  );
};

type NotionLang = CodeBlockObjectResponse["code"]["language"];
type ShikiLang = BundledLanguage | SpecialLanguage;

function langAlias(lang: NotionLang, polyfill?: string): ShikiLang {
  if (polyfill?.startsWith("lang:")) {
    return polyfill.substring(5).trim() as BundledLanguage;
  }

  if (lang === "plain text") return "plaintext";
  if (lang === "abc") return "plaintext";
  if (lang === "agda") return "plaintext";
  if (lang === "java/c/c++/c#") return "java";
  if (lang === "arduino") return "c++";
  if (lang === "ascii art") return "plaintext";
  if (lang === "assembly") return "asm";
  if (lang === "basic") return "vb";
  if (lang === "bnf") return "plaintext";
  if (lang === "dhall") return "plaintext";
  if (lang === "ebnf") return "plaintext";
  if (lang === "flow") return "javascript";
  if (lang === "fortran") return "fortran-fixed-form";
  if (lang === "idris") return "plaintext";
  if (lang === "livescript") return "javascript";
  if (lang === "llvm ir") return "plaintext";
  if (lang === "markup") return "html";
  if (lang === "mathematica") return "wolfram";
  if (lang === "notion formula") return "plaintext";
  if (lang === "reason") return "ocaml";
  if (lang === "vb.net") return "vb";
  if (lang === "visual basic") return "vb";
  if (lang === "webassembly") return "wasm";

  return lang;
}
