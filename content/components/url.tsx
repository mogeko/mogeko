export const URL: React.FC<
  ({ href: string; children?: never } | { children: string; href?: never }) &
    Omit<React.HTMLAttributes<HTMLAnchorElement>, "children">
> = ({ children, href }) => {
  return <a href={href ?? children}>{children ?? href}</a>;
};
