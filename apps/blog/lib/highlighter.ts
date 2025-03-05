import type { CodeBlockObjectResponse } from "@/lib/api-endpoints";
import { cache } from "react";
import {
  createSingletonShorthands,
  createdBundledHighlighter,
} from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";

const highlighter = createSingletonShorthands(
  createdBundledHighlighter({
    themes: {
      andromeeda: import("shiki/themes/andromeeda.mjs"),
    },
    langs: {
      abap: () => import("shiki/langs/abap.mjs"),
      arduino: () => import("shiki/langs/cpp.mjs"),
      bash: () => import("shiki/langs/bash.mjs"),
      basic: () => import("shiki/langs/vb.mjs"),
      c: () => import("shiki/langs/c.mjs"),
      clojure: () => import("shiki/langs/clojure.mjs"),
      coffeescript: () => import("shiki/langs/coffeescript.mjs"),
      "c++": () => import("shiki/langs/cpp.mjs"),
      "c#": () => import("shiki/langs/csharp.mjs"),
      css: () => import("shiki/langs/css.mjs"),
      dart: () => import("shiki/langs/dart.mjs"),
      diff: () => import("shiki/langs/diff.mjs"),
      docker: () => import("shiki/langs/docker.mjs"),
      elixir: () => import("shiki/langs/docker.mjs"),
      elm: () => import("shiki/langs/elm.mjs"),
      erlang: () => import("shiki/langs/erlang.mjs"),
      flow: () => import("shiki/langs/javascript.mjs"),
      fortran: () => import("shiki/langs/fortran-fixed-form.mjs"),
      "f#": () => import("shiki/langs/fsharp.mjs"),
      gherkin: () => import("shiki/langs/gherkin.mjs"),
      glsl: () => import("shiki/langs/glsl.mjs"),
      go: () => import("shiki/langs/go.mjs"),
      graphql: () => import("shiki/langs/graphql.mjs"),
      groovy: () => import("shiki/langs/groovy.mjs"),
      haskell: () => import("shiki/langs/haskell.mjs"),
      html: () => import("shiki/langs/html.mjs"),
      java: () => import("shiki/langs/java.mjs"),
      javascript: () => import("shiki/langs/javascript.mjs"),
      json: () => import("shiki/langs/json.mjs"),
      julia: () => import("shiki/langs/julia.mjs"),
      makefile: () => import("shiki/langs/makefile.mjs"),
      markdown: () => import("shiki/langs/markdown.mjs"),
      markup: () => import("shiki/langs/html.mjs"),
      matlab: () => import("shiki/langs/matlab.mjs"),
      mermaid: () => import("shiki/langs/mermaid.mjs"),
      nix: () => import("shiki/langs/nix.mjs"),
      "objective-c": () => import("shiki/langs/objective-c.mjs"),
      ocaml: () => import("shiki/langs/ocaml.mjs"),
      pascal: () => import("shiki/langs/pascal.mjs"),
      perl: () => import("shiki/langs/perl.mjs"),
      php: () => import("shiki/langs/php.mjs"),
      shellsession: () => import("shiki/langs/shellsession.mjs"),
      powershell: () => import("shiki/langs/powershell.mjs"),
      prolog: () => import("shiki/langs/prolog.mjs"),
      protobuf: () => import("shiki/langs/protobuf.mjs"),
      python: () => import("shiki/langs/python.mjs"),
      r: () => import("shiki/langs/r.mjs"),
      reason: () => import("shiki/langs/ocaml.mjs"),
      ruby: () => import("shiki/langs/ruby.mjs"),
      rust: () => import("shiki/langs/rust.mjs"),
      sass: () => import("shiki/langs/sass.mjs"),
      scala: () => import("shiki/langs/scala.mjs"),
      scheme: () => import("shiki/langs/scheme.mjs"),
      scss: () => import("shiki/langs/scss.mjs"),
      shell: () => import("shiki/langs/shell.mjs"),
      sql: () => import("shiki/langs/sql.mjs"),
      swift: () => import("shiki/langs/swift.mjs"),
      typescript: () => import("shiki/langs/typescript.mjs"),
      "vb.net": () => import("shiki/langs/vb.mjs"),
      verilog: () => import("shiki/langs/verilog.mjs"),
      vhdl: () => import("shiki/langs/vhdl.mjs"),
      "visual basic": () => import("shiki/langs/vb.mjs"),
      webassembly: () => import("shiki/langs/wasm.mjs"),
      xml: () => import("shiki/langs/xml.mjs"),
      yaml: () => import("shiki/langs/yaml.mjs"),
      // See: https://developers.notion.com/reference/block#code
    },
    engine: () => createJavaScriptRegexEngine(),
  }),
);

type LanguageRequest = CodeBlockObjectResponse["code"]["language"];

export function langAlias(lang: LanguageRequest) {
  // biome-ignore format: <explanation>
  const dict = ["plain text", "ascii art", "bnf", "dhall", "ebnf",
                "idris", "llvm ir", "notion formula", "java/c/c++/c#"];

  return dict.includes(lang) ? "plaintext" : lang;
}

export const codeToHast = cache(highlighter.codeToHast);
export const codeToHtml = cache(highlighter.codeToHtml);
