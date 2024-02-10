import { describe, it, expect } from "vitest";
import plugin from "@/index";
import tailwindcss from "tailwindcss";
import postcss from "postcss";
import path from "path";

describe("typography plugin", () => {
  it("default styles", async () => {
    const { currentTestName } = expect.getState();
    const result = await postcss(
      tailwindcss({
        content: [{ raw: String.raw`<div class="prose lg:prose-lg"></div>` }],
        plugins: [plugin],
        corePlugins: { preflight: false },
      }),
    ).process(["@tailwind base;", "@tailwind components;"].join("\n"), {
      from: `${path.resolve(__filename)}?test=${currentTestName}`,
    });

    expect(result.css).toMatchSnapshot();
  });

  it("with custom className", async () => {
    const className = "custom";

    const { currentTestName } = expect.getState();
    const result = await postcss(
      tailwindcss({
        content: [{ raw: String.raw`<div class="${className}"></div>` }],
        plugins: [plugin({ className })],
        corePlugins: { preflight: false },
      }),
    ).process(["@tailwind base;", "@tailwind components;"].join("\n"), {
      from: `${path.resolve(__filename)}?test=${currentTestName}`,
    });

    expect(result.css).toMatch(`.${className} h1`);
    expect(result.css).not.toMatch(`.${className}-lg h1`);
  });

  it("with custom styles", async () => {
    const { currentTestName } = expect.getState();
    const result = await postcss(
      tailwindcss({
        content: [{ raw: String.raw`<div class="prose lg:prose-lg"></div>` }],
        plugins: [plugin],
        corePlugins: { preflight: false },
        theme: {
          typography: {
            DEFAULT: { h1: { fontSize: "1.5rem" } },
            lg: { h1: { fontSize: "2rem" } },
          },
        },
      }),
    ).process(["@tailwind base;", "@tailwind components;"].join("\n"), {
      from: `${path.resolve(__filename)}?test=${currentTestName}`,
    });

    expect(result.css).toMatch("font-size: 1.5rem");
    expect(result.css).toMatch("font-size: 2rem");
  });

  it("with custom colors", async () => {
    const { currentTestName } = expect.getState();
    const result = await postcss(
      tailwindcss({
        content: [{ raw: String.raw`<div class="prose lg:prose-lg"></div>` }],
        plugins: [plugin],
        corePlugins: { preflight: false },
        theme: {
          typography: {
            DEFAULT: {
              "--tw-prose-primary": "#111",
              "--tw-prose-muted": "#cbd5e1",
            },
          },
        },
      }),
    ).process(["@tailwind base;", "@tailwind components;"].join("\n"), {
      from: `${path.resolve(__filename)}?test=${currentTestName}`,
    });

    expect(result.css).toMatch("--tw-prose-primary: #111;");
    expect(result.css).toMatch("--tw-prose-muted: #cbd5e1;");
  });
});
