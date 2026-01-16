import { describe, expect, it, mock } from "bun:test";
import readingTime from "@/index";

const updateConfig = mock(<T>(config: T): T => config);

describe("readingTime", () => {
  it("update the config", () => {
    const config = readingTime();

    config.hooks["astro:config:setup"]?.({ updateConfig } as any);

    expect(updateConfig).toHaveBeenCalled();
    expect(config.name).toBe("astro-reading-time");
    expect(config).toMatchSnapshot();
  });
});
