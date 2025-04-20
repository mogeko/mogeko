import { GlobalHotkey } from "@/components/global-hotkey";
import { plainText } from "@/components/text";
import { isFullDatabase, notion } from "@/lib/notion";
import { formatShortId } from "@/lib/utils";
import pkg from "@/package.json";
import { getYear } from "date-fns";
import type { Metadata } from "next";

import "@/styles/globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const database_id = formatShortId(process.env.NOTION_DATABASE_ID);

  if (database_id) {
    const database = await notion.databases.retrieve({ database_id });

    if (isFullDatabase(database)) {
      const title = plainText(database.title);

      return {
        title: { default: title, template: `%s | ${title}` },
        description: pkg.description,
      };
    }
  }

  return {
    title: pkg.name,
    description: pkg.description,
  };
}

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <html lang="zh-CN">
      <head>
        {/* biome-ignore format: false */}
        <link rel="preconnect" href="https://static.zeoseven.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://static.zeoseven.com/zsft/442/main/result.css"
        />
        <style>{`:root { --font-mono: "Maple Mono NF CN", ui-monospace, monospace; }`}</style>
      </head>
      <body className="min-h-svh text-foreground bg-background antialiased font-mono text-base/1">
        <div className="relative min-h-svh flex flex-col">
          <main className="flex flex-1 flex-col">{children}</main>
          <footer className="mb-3">
            <p className="px-[2ch]">
              Copyright © 2017 - {getYear(new Date())}. All rights reserved.
            </p>
          </footer>
        </div>
        <GlobalHotkey />
      </body>
    </html>
  );
};

export default RootLayout;
