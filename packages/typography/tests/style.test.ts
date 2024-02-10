import { styles } from "@/style";
import { expect, it, describe } from "vitest";

describe("typography styles", () => {
  it("default styles", () => {
    expect(styles.DEFAULT).toMatchSnapshot();
    expect(styles.lg).toMatchSnapshot();
  });
});
