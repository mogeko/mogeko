import { remarkReadingTime } from "@/lib/remark-reading-time";
import type { AstroIntegration } from "astro";

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
