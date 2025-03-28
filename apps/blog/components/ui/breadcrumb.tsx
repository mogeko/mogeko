import { cn } from "@/lib/utils";

type NavProps = React.ComponentProps<"nav">;

export const Breadcrumb: React.FC<NavProps> = ({ className, ...props }) => {
  return (
    <nav
      aria-label="breadcrumb"
      className={cn(
        "flex flex-wrap items-center break-words gap-[1ch]",
        className,
      )}
      {...props}
    />
  );
};

export const BreadcrumbSeparator: React.FC = () => {
  return <span>{"\u276F"}</span>;
};
