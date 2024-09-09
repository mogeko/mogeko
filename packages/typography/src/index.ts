import { styles } from "@/style";
import { mergeDeepRight } from "ramda";
import plugin from "tailwindcss/plugin";

export default plugin.withOptions<{
  className?: string;
}>(
  ({ className = "prose" } = {}) => {
    return ({ addComponents, theme }) => {
      const modifiers = theme("typography", {});

      addComponents(
        Object.entries(mergeDeepRight(styles, modifiers)).map(
          ([key, value]) => {
            return {
              [`.${className}${key === "DEFAULT" ? "" : `-${key}`}`]: value,
            } as { [key: string]: any };
          },
        ),
      );
    };
  },
  () => ({
    theme: { typography: styles },
  }),
);
