import plugin from "tailwindcss/plugin";
import { styles } from "@/style";

export default plugin.withOptions<{
  className?: string;
}>(
  ({ className = "prose" } = {}) => {
    return ({ addComponents, theme }) => {
      const modifiers = theme("typography", {});

      addComponents(
        Object.entries(modifiers).map(([key, value]) => {
          if (key === "DEFAULT") {
            return { [`.${className}`]: value as any };
          } else {
            return { [`.${className}-${key}`]: value as any };
          }
        }),
      );
    };
  },
  () => ({
    theme: { typography: styles },
  }),
);
