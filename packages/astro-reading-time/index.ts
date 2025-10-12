import type { AstroIntegration } from "astro";
import { remarkReadingTime } from "@/lib/remark-reading-time";

export default function astroReadingTime(): AstroIntegration {
  return {
    name: "astro-reading-time",
    hooks: {
      "astro:config:setup": ({ updateConfig }) => {
        updateConfig({
          markdown: {
            remarkPlugins: [remarkReadingTime],
          },
        });
      },
    },
  };
}
