import { plainText } from "@/components/text";
import { notionDatabasesRetrieve } from "@/lib/notion";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inconsolata, Noto_Sans_SC } from "next/font/google";

import "@/styles/globals.css";

const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  variable: "--font-noto-sans-sc",
});

const inconsolata = Inconsolata({
  subsets: ["latin"],
  fallback: ["ui-monospace", "monospace"],
  variable: "--font-inconsolata",
});

export async function generateMetadata(): Promise<Metadata> {
  const database_id = process.env.NOTION_DATABASE_ID;

  if (database_id) {
    const database = await notionDatabasesRetrieve({ database_id });

    if ("title" in database) {
      const title = plainText(database.title);

      return {
        title: { default: title, template: `%s | ${title}` },
      };
    }
  }

  return {
    title: "My Blog",
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={cn(notoSansSC.variable, inconsolata.variable)}>
        {children}
      </body>
    </html>
  );
}
