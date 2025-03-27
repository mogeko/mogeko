import { GlobalHotkey } from "@/components/global-hotkey";
import { plainText } from "@/components/text";
import { isFullDatabase, notion } from "@/lib/notion";
import pkg from "@/package.json";
import { getYear } from "date-fns";
import type { Metadata } from "next";

import "@/styles/globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const database_id = process.env.NOTION_DATABASE_ID;

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
    <html lang="en">
      <head>
        {/* biome-ignore format: <explanation> */}
        <link rel="preconnect" href="https://static.zeoseven.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://static.zeoseven.com/zsft/442/main/result.css"
        />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/icon/svg" type="image/svg+xml" sizes="any" />
        <link rel="icon" href="/icon/192" type="image/png" sizes="192x192" />
        <link rel="icon" href="/icon/512" type="image/png" sizes="512x512" />
        <link rel="apple-touch-icon" href="/apple-icon?<generated>" />
        <link rel="manifest" href="/manifest.webmanifest" />
      </head>
      <body className="min-h-svh flex flex-col text-foreground bg-background antialiased font-mono text-base/1">
        <main className="relative flex-1 flex flex-col">{children}</main>
        <footer className="mb-3">
          <p className="px-[2ch]">
            Copyright © 2017 - {getYear(new Date())}. All rights reserved.
          </p>
        </footer>
        <GlobalHotkey />
      </body>
    </html>
  );
};

export default RootLayout;
