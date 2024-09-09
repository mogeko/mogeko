import { styles } from "@/style";
import { describe, expect, it } from "vitest";

describe("typography styles", () => {
  it("default styles", () => {
    expect(styles.DEFAULT).toMatchSnapshot();
    expect(styles.lg).toMatchSnapshot();
  });
});
