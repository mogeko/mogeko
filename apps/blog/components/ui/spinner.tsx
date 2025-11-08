import styles from "@/components/ui/spinner.module.css";
import { cn } from "@/lib/utils";

export const Spinner: React.FC<
  Omit<React.HTMLAttributes<HTMLSpanElement>, "children">
> = ({ className, ...props }) => {
  return (
    <output
      aria-label="Loading"
      className={cn(styles.spinner, className)}
      {...props}
    />
  );
};
