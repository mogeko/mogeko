import { GlobalHotkey } from "@/components/global-hotkey";
import { plainText } from "@/components/text";
import { notion } from "@/lib/notion";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inconsolata, Noto_Sans_SC } from "next/font/google";

import "@/app/globals.css";

const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  variable: "--font-noto-sans-sc",
  adjustFontFallback: false,
});

const inconsolata = Inconsolata({
  subsets: ["latin"],
  variable: "--font-inconsolata",
  adjustFontFallback: false,
});

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
      <body
        className={cn(notoSansSC.variable, inconsolata.variable, "absolute")}
      >
        <GlobalHotkey>{children}</GlobalHotkey>
      </body>
    </html>
  );
}
