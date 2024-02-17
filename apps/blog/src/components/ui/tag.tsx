import React from "react";
import GithubSlugger from "github-slugger";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils";
import { LuHash } from "react-icons/lu";
import {
  SiAstro,
  SiLinux,
  SiArchlinux,
  SiWindows,
  SiHugo,
  SiUbuntu,
  SiJavascript,
  SiHexo,
  SiAndroid,
  SiApple,
  SiAdobeillustrator,
  SiGnuprivacyguard,
  SiSteam,
  SiHomebrew,
  SiPython,
  SiRust,
  SiManjaro,
  SiReact,
  SiOpenstack,
  SiGo,
  SiRuby,
  SiWebassembly,
  SiElixir,
  SiGit,
  SiJest,
  SiNextdotjs,
  SiTypescript,
  SiMarkdown,
  SiFedora,
  SiCockpit,
  SiNodedotjs,
  SiPnpm,
  SiTestinglibrary,
  SiCss3,
  SiHtml5,
  SiTampermonkey,
} from "react-icons/si";
import { FaJava, FaTools, FaCode } from "react-icons/fa";
import { PiSigmaBold } from "react-icons/pi";
import { MdLocalMovies } from "react-icons/md";
import type { IconType } from "react-icons";
import { IoGameController } from "react-icons/io5";

export const tagVariants = cva(
  "inline-flex select-none flex-row items-center font-semibold hover:cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 rounded",
        outline: "border-primary text-primary hover:bg-primary/10 border-2",
      },
      size: {
        default: "h-9 px-4 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const icons = {
  default: LuHash,
  astro: SiAstro,
  archlinux: SiArchlinux,
  gnulinux: SiLinux,
  windows: SiWindows,
  kms: SiWindows,
  hugo: SiHugo,
  ubuntu: SiUbuntu,
  javascript: SiJavascript,
  hexo: SiHexo,
  android: SiAndroid,
  macos: SiApple,
  "adobe-illustrator": SiAdobeillustrator,
  gnupg: SiGnuprivacyguard,
  steam: SiSteam,
  homebrew: SiHomebrew,
  python: SiPython,
  rust: SiRust,
  manjaro: SiManjaro,
  react: SiReact,
  java: FaJava,
  openstack: SiOpenstack,
  golang: SiGo,
  ruby: SiRuby,
  webassembly: SiWebassembly,
  uwp: SiWindows,
  elixir: SiElixir,
  git: SiGit,
  jest: SiJest,
  nextjs: SiNextdotjs,
  typescript: SiTypescript,
  markdown: SiMarkdown,
  "fedora-coreos": SiFedora,
  cockpit: SiCockpit,
  nodejs: SiNodedotjs,
  pnpm: SiPnpm,
  "testing-library": SiTestinglibrary,
  css: SiCss3,
  html: SiHtml5,
  jsx: SiReact,
  userscript: SiTampermonkey,
  rsa: PiSigmaBold,
  算法: PiSigmaBold,
  密码学: PiSigmaBold,
  影评: MdLocalMovies,
  tools: FaTools,
  第九艺术: IoGameController,
  编程之髓: FaCode,
} as Record<string, IconType>;

const slugger = new GithubSlugger();

export const Tag = React.forwardRef<
  HTMLAnchorElement,
  {
    tag?: string;
    className?: string;
  } & VariantProps<typeof tagVariants>
>(({ className, tag, variant, size, ...props }, ref) => {
  if (!tag) return null;

  const Icon = icons[slugger.slug(tag)] ?? icons.default;

  return (
    <a
      ref={ref}
      className={cn(tagVariants({ variant, size }), className)}
      {...props}
    >
      <Icon className="mr-1 h-4 w-4" />
      {tag}
    </a>
  );
});
