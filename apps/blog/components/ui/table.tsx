import { cn } from "@/lib/utils";

export const Table: React.FC<
  {} & React.TableHTMLAttributes<HTMLTableElement>
> = ({ className, ...props }) => {
  return (
    <div className="relative w-full overflow-x-auto">
      <table
        data-slot="table-container"
        className={cn("w-full caption-bottom border-spacing-0", className)}
        {...props}
      />
    </div>
  );
};

export const TableHeader: React.FC<
  React.HTMLAttributes<HTMLTableSectionElement>
> = ({ className, ...props }) => {
  return <thead data-slot="table-header" className={className} {...props} />;
};

export const TableBody: React.FC<
  React.HTMLAttributes<HTMLTableSectionElement>
> = ({ className, ...props }) => {
  return <tbody data-slot="table-body" className={className} {...props} />;
};

export const TableFooter: React.FC<
  React.HTMLAttributes<HTMLTableSectionElement>
> = ({ className, ...props }) => {
  return <tfoot data-slot="table-footer" className={className} {...props} />;
};

export const TableRow: React.FC<
  {} & React.HTMLAttributes<HTMLTableRowElement>
> = ({ className, ...props }) => {
  return (
    <tr
      data-slot="table-row"
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
      data-slot="table-head"
      scope="col"
      className={cn(
        "not-first:pl-[1ch] shrink-0 font-normal text-left",
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
      data-slot="table-cell"
      className={cn("not-first:pl-[1ch] shrink-0", className)}
      {...props}
    />
  );
};

export const TableCaption: React.FC<
  {} & {} & React.HTMLAttributes<HTMLElement>
> = ({ className, ...props }) => {
  return <caption data-slot="table-caption" className={className} {...props} />;
};
