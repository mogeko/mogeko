import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export const Table = forwardRef<
  HTMLTableElement,
  React.TableHTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => {
  return (
    <table
      ref={ref}
      className={cn("relative w-full border-spacing-0", className)}
      {...props}
    />
  );
});
Table.displayName = "Table";

export const TableHeader = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => {
  return <thead ref={ref} className={className} {...props} />;
});
TableHeader.displayName = "TableHeader";

export const TableBody = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => {
  return <tbody ref={ref} className={className} {...props} />;
});
TableBody.displayName = "TableBody";

export const TableFooter = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => {
  return <tfoot ref={ref} className={className} {...props} />;
});
TableFooter.displayName = "TableFooter";

export const TableRow = forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => {
  return (
    <tr
      ref={ref}
      className={cn(
        "outline-none focus:bg-accent focus:text-accent-foreground",
        className,
      )}
      {...props}
    />
  );
});
TableRow.displayName = "TableRow";

export const TableHead = forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => {
  return (
    <th
      ref={ref}
      className={cn(
        "[&:not(:first-child)]:pl-[1ch] shrink-0 font-normal text-left",
        className,
      )}
      {...props}
    />
  );
});
TableHead.displayName = "TableHead";

export const TableCell = forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => {
  return (
    <td
      ref={ref}
      className={cn("[&:not(:first-child)]:pl-[1ch] shrink-0", className)}
      {...props}
    />
  );
});
TableCell.displayName = "TableCell";

export const TableCaption = forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => {
  return <caption ref={ref} className={className} {...props} />;
});
TableCaption.displayName = "TableCaption";
