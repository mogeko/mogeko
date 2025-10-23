import type React from "react";
import { cn } from "@/lib/utils";

type NavProps = React.HTMLAttributes<HTMLElement>;

export const Breadcrumb: React.FC<NavProps> = ({ children, ...props }) => {
  return (
    <nav aria-label="breadcrumb" {...props}>
      <ol className="flex flex-wrap items-centerflex wrap-break-word gap-[1ch]">
        {children}
      </ol>
    </nav>
  );
};

type LiProps = React.LiHTMLAttributes<HTMLLIElement>;

export const BreadcrumbItem: React.FC<LiProps> & {
  Separator: React.FC<LiProps>;
} = ({ className, ...props }) => {
  return (
    <li
      className={cn("inline-flex items-center gap-[1ch]", className)}
      {...props}
    />
  );
};

BreadcrumbItem.Separator = ({ children, ...props }) => {
  return <li {...props}>{children ?? <span>&#x276F;</span>}</li>;
};
