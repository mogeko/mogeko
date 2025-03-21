import { GlobalHotkey } from "@/components/global-hotkey";
import { plainText } from "@/components/text";
import { notion } from "@/lib/notion";
import type { Metadata } from "next";

import "@/app/globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const database_id = process.env.NOTION_DATABASE_ID;

  if (database_id) {
    const database = await notion.databases.retrieve({ database_id });

    if ("title" in database) {
      const title = plainText(database.title);

      return {
        title: { default: title, template: `%s | ${title}` },
        description: plainText(database.description),
      };
    }
  }

  return {
    title: "My Blog",
  };
}

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        {/* biome-ignore format: <explanation> */}
        <link rel="preconnect" href="https://static.zeoseven.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://static.zeoseven.com/zsft/442/main/result.css"
        />
      </head>
      <body className="min-h-svh text-foreground bg-background antialiased font-mono text-base/1">
        <main className="min-h-svh relative flex flex-col">{children}</main>
        <GlobalHotkey />
      </body>
    </html>
  );
}
