export const Spoiler: React.FC<
  {} & {} & React.HTMLAttributes<HTMLSpanElement>
> = ({ children }) => {
  return <span className="spoiler">{children}</span>;
};
