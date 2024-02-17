import * as React from "react";
import { slug } from "github-slugger";

import { LuHash } from "react-icons/lu";
import * as si from "react-icons/si";
import { FaJava, FaTools, FaCode } from "react-icons/fa";
import { PiSigmaBold } from "react-icons/pi";
import { MdLocalMovies } from "react-icons/md";
import { IoGameController } from "react-icons/io5";

import type { IconType } from "react-icons";

const iconMap: Record<string, IconType> = {
  default: LuHash,
  "adobe-illustrator": si.SiAdobeillustrator,
  android: si.SiAndroid,
  archlinux: si.SiArchlinux,
  astro: si.SiAstro,
  cockpit: si.SiCockpit,
  css: si.SiCss3,
  elixir: si.SiElixir,
  "fedora-coreos": si.SiFedora,
  git: si.SiGit,
  gnupg: si.SiGnuprivacyguard,
  gnulinux: si.SiLinux,
  golang: si.SiGo,
  hexo: si.SiHexo,
  homebrew: si.SiHomebrew,
  html: si.SiHtml5,
  hugo: si.SiHugo,
  java: FaJava,
  javascript: si.SiJavascript,
  jest: si.SiJest,
  jsx: si.SiReact,
  kms: si.SiWindows,
  macos: si.SiApple,
  manjaro: si.SiManjaro,
  markdown: si.SiMarkdown,
  nextjs: si.SiNextdotjs,
  nodejs: si.SiNodedotjs,
  openstack: si.SiOpenstack,
  pnpm: si.SiPnpm,
  python: si.SiPython,
  react: si.SiReact,
  rsa: PiSigmaBold,
  ruby: si.SiRuby,
  rust: si.SiRust,
  sphinx: si.SiSphinx,
  steam: si.SiSteam,
  "testing-library": si.SiTestinglibrary,
  tools: FaTools,
  typescript: si.SiTypescript,
  ubuntu: si.SiUbuntu,
  userscript: si.SiTampermonkey,
  uwp: si.SiWindows,
  webassembly: si.SiWebassembly,
  windows: si.SiWindows,
  密码学: PiSigmaBold,
  影评: MdLocalMovies,
  第九艺术: IoGameController,
  算法: PiSigmaBold,
  编程之髓: FaCode,
};

export const TagsIcon: React.FC<
  { tag: string } & React.ComponentPropsWithoutRef<IconType>
> = ({ tag, className, ...props }) => {
  const Icon = iconMap[slug(tag)] || iconMap.default;

  return <Icon className={className} {...props} />;
};
