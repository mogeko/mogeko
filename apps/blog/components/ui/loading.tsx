import styles from "@/components/ui/loading.module.css";
import { cn } from "@/lib/utils";

export const Loading: React.FC<
  Omit<React.HTMLAttributes<HTMLSpanElement>, "children">
> = ({ className, ...props }) => {
  return <span className={cn(styles.loading, className)} {...props} />;
};
