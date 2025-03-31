import { Link } from "@/components/ui/link";
import type { Metadata, NextPage } from "next";

export const metadata: Metadata = {
  title: "404 Not Found",
};

const Prompt: React.FC<
  React.HTMLAttributes<HTMLDivElement> & { cursor?: boolean }
> = ({ children, cursor, ...props }) => {
  const region = process.env.VERCEL_REGION;

  return (
    <div className="flex items-center gap-[1ch]" {...props}>
      <span>{`[user@vercel${region ? `-${region}` : ""} ~]$`}</span>
      {children}
      {cursor && (
        <span className="inline-block bg-accent w-[1ch] h-1 animate-blink" />
      )}
    </div>
  );
};

const NotFound: NextPage = () => {
  return (
    <div className="flex flex-1 flex-col max-w-[80ch] px-[2ch] py-2">
      <Prompt>
        <span>cat error.log</span>
      </Prompt>
      <div className="flex flex-col mb-1">
        <pre className="whitespace-pre-wrap">
          {[
            String.raw`  ____                          __`,
            String.raw` / __ \___  ___  ___  ___  ___ / /`,
            String.raw`/ /_/ / _ \/ _ \/ _ \/ _ \(_-</_/ `,
            String.raw`\____/\___/\___/\___/ .__/___(_)  `,
            String.raw`                   /_/            `,
          ].join("\n")}
        </pre>
        <p className="text-destructive my-1">404 Not Found</p>
        <p>错误：未找到该页面</p>
        <p>可能原因：输入的 URL 不存在或已被删除。</p>
        <p>
          请检查地址或返回 <Link href="/">首页</Link>。
        </p>
      </div>
      <Prompt cursor />
    </div>
  );
};

export default NotFound;
