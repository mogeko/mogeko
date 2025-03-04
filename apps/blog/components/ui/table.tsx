export const Table: React.FC<
  {} & React.TableHTMLAttributes<HTMLTableElement>
> = ({ className, ...props }) => {
  return (
    <div>
      <table className={className} {...props} />
    </div>
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
  return <tr className={className} {...props} />;
};

export const TableHead: React.FC<
  React.TdHTMLAttributes<HTMLTableCellElement>
> = ({ className, ...props }) => {
  return <th className={className} {...props} />;
};

export const TableCell: React.FC<
  React.TdHTMLAttributes<HTMLTableCellElement>
> = ({ className, ...props }) => {
  return <td className={className} {...props} />;
};

export const TableCaption: React.FC<
  {} & {} & React.HTMLAttributes<HTMLElement>
> = ({ className, ...props }) => {
  return <caption className={className} {...props} />;
};
