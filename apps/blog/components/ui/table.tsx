import { cn } from "@/lib/utils";

export const Table: React.FC<
  {} & React.TableHTMLAttributes<HTMLTableElement>
> = ({ className, ...props }) => {
  return (
    <table
      className={cn("relative w-full border-spacing-0", className)}
      {...props}
    />
  );
};

export const TableHeader: React.FC<
  React.HTMLAttributes<HTMLTableSectionElement>
> = ({ className, ...props }) => {
  return <thead className={className} {...props} />;
};

export const TableBody: React.FC<
  React.HTMLAttributes<HTMLTableSectionElement>
> = ({ className, ...props }) => {
  return <tbody className={className} {...props} />;
};

export const TableFooter: React.FC<
  React.HTMLAttributes<HTMLTableSectionElement>
> = ({ className, ...props }) => {
  return <tfoot className={className} {...props} />;
};

export const TableRow: React.FC<
  {} & React.HTMLAttributes<HTMLTableRowElement>
> = ({ className, ...props }) => {
  return (
    <tr
      className={cn(
        "outline-none focus:bg-accent focus:text-accent-foreground",
        className,
      )}
      {...props}
    />
  );
};

export const TableHead: React.FC<
  React.TdHTMLAttributes<HTMLTableCellElement>
> = ({ className, ...props }) => {
  return (
    <th
      className={cn(
        "[&:not(:first-child)]:pl-[1ch] shrink-0 font-normal text-left",
        className,
      )}
      {...props}
    />
  );
};

export const TableCell: React.FC<
  React.TdHTMLAttributes<HTMLTableCellElement>
> = ({ className, ...props }) => {
  return (
    <td
      className={cn("[&:not(:first-child)]:pl-[1ch] shrink-0", className)}
      {...props}
    />
  );
};

export const TableCaption: React.FC<
  {} & {} & React.HTMLAttributes<HTMLElement>
> = ({ className, ...props }) => {
  return <caption className={className} {...props} />;
};
