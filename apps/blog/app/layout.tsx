import type { Metadata } from "next";
import { GlobalHotkey } from "@/components/global-hotkey";
import { plainText } from "@/components/text";
import { retrieveDatabase } from "@/lib/notion-staffs";
import { shortenUUID } from "@/lib/utils";
import pkg from "@/package.json";

import "@chinese-fonts/maple-mono-cn/dist/MapleMono-CN-Regular/result.css";
import "@/styles/globals.css";

export async function year(): Promise<number> {
  "use cache";
  return new Date().getFullYear();
}

export async function generateMetadata(): Promise<Metadata> {
  const metadata: Metadata = {
    title: pkg.name,
    robots: { index: true, follow: true },
    description: pkg.description,
  };

  const database_id = shortenUUID(process.env.NOTION_DATABASE_ID);
  const database = await retrieveDatabase(database_id);

  if (database) {
    const title = plainText(database.title);

    Object.assign(metadata, {
      title: { default: title, template: `%s | ${title}` },
    });
  }

  return metadata;
}

const RootLayout: React.FC<LayoutProps<"/">> = async ({ children }) => {
  return (
    <html lang="zh-CN">
      <head>
        <style>{`:root { --font-mono: "Maple Mono CN", ui-monospace, monospace; }`}</style>
      </head>
      <body className="min-h-svh text-foreground bg-background antialiased font-mono text-base/1">
        <div className="relative min-h-svh flex flex-col">
          <main className="flex flex-1 flex-col">{children}</main>
          <footer className="mb-3">
            <p className="px-[2ch]">
              Copyright © 2017 - {await year()}. All rights reserved.
            </p>
          </footer>
        </div>
        <GlobalHotkey />
      </body>
    </html>
  );
};

export default RootLayout;
