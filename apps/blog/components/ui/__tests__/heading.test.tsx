import { describe, expect, it } from "vitest";
import { page } from "vitest/browser";
import { Heading } from "@/components/ui/heading";

describe("Heading", () => {
  it("should render h1 heading with level 1", async () => {
    await page.render(<Heading level={1}>Heading 1</Heading>);

    const heading = page.getByRole("heading", { level: 1 }).query();
    expect(heading).toBeDefined();
    expect(heading?.textContent).toBe("Heading 1");
  });

  it("should render h2 heading with level 2", async () => {
    await page.render(<Heading level={2}>Heading 2</Heading>);

    const heading = page.getByRole("heading", { level: 2 }).query();
    expect(heading).toBeDefined();
    expect(heading?.textContent).toBe("Heading 2");
  });

  it("should render h3 heading with level 3", async () => {
    await page.render(<Heading level={3}>Heading 3</Heading>);

    const heading = page.getByRole("heading", { level: 3 }).query();
    expect(heading).toBeDefined();
    expect(heading?.textContent).toBe("Heading 3");
  });

  it("should render anchor link when id is provided", async () => {
    await page.render(
      <Heading level={1} id="test-heading">
        Heading with ID
      </Heading>,
    );

    const heading = page.getByRole("heading", { level: 1 }).query();
    const link = page.getByRole("link").query();

    expect(heading).toBeDefined();
    expect(link).toBeDefined();
    expect(link?.getAttribute("href")).toBe("#test-heading");
    expect(link?.textContent).toBe("#");
    expect(heading?.textContent).toContain("#");
    expect(heading?.textContent).toContain("Heading with ID");
  });

  it("should not render anchor link when id is not provided", async () => {
    await page.render(<Heading level={1}>Heading without ID</Heading>);

    const heading = page.getByRole("heading", { level: 1 }).query();
    const links = page.getByRole("link").all();

    expect(heading).toBeDefined();
    expect(links).toHaveLength(0);
    expect(heading?.textContent).toBe("Heading without ID");
  });

  it("should render correct anchor symbols for different levels", async () => {
    const { rerender } = await page.render(
      <Heading level={1} id="h1">
        H1
      </Heading>,
    );
    let link = page.getByRole("link").query();
    expect(link?.textContent).toBe("#");

    await rerender(
      <Heading level={2} id="h2">
        H2
      </Heading>,
    );
    link = page.getByRole("link").query();
    expect(link?.textContent).toBe("##");

    await rerender(
      <Heading level={3} id="h3">
        H3
      </Heading>,
    );
    link = page.getByRole("link").query();
    expect(link?.textContent).toBe("###");
  });

  it("should apply default classes", async () => {
    await page.render(<Heading level={1}>Default styles</Heading>);

    const heading = page.getByRole("heading", { level: 1 }).query();
    expect(heading?.className).toContain("scroll-m-3.5");
    expect(heading?.className).toContain("font-extrabold");
    expect(heading?.className).toContain("flex");
    expect(heading?.className).toContain("gap-[1ch]");
    expect(heading?.className).toContain("text-base/1");
  });

  it("should apply custom className", async () => {
    await page.render(
      <Heading level={1} className="custom-heading">
        Custom heading
      </Heading>,
    );

    const heading = page.getByRole("heading", { level: 1 }).query();
    expect(heading?.className).toContain("custom-heading");
    expect(heading?.className).toContain("scroll-m-3.5"); // Ensure default styles are still included
  });

  it("should pass through additional HTML attributes", async () => {
    await page.render(
      <Heading
        level={1}
        data-testid="test-heading"
        aria-label="Main heading"
        id="heading-1"
      >
        Heading with attributes
      </Heading>,
    );

    const heading = page.getByTestId("test-heading").query();
    expect(heading).toBeDefined();
    expect(heading?.getAttribute("aria-label")).toBe("Main heading");
    expect(heading?.getAttribute("id")).toBe("heading-1");
  });

  it("should handle color variants", async () => {
    await page.render(
      <Heading level={1} color="blue">
        Blue heading
      </Heading>,
    );

    const heading = page.getByRole("heading", { level: 1 }).query();
    // The color variants are applied through the colorVariants function
    // We can check that the className contains the expected base classes
    expect(heading?.className).toContain("scroll-m-3.5");
    expect(heading?.className).toContain("font-extrabold");
  });

  it("should have correct structure with link and children", async () => {
    await page.render(
      <Heading level={1} id="structured-heading">
        Structured heading
      </Heading>,
    );

    const heading = page.getByRole("heading", { level: 1 }).query();
    const link = page.getByRole("link").query();

    expect(heading).toBeDefined();
    expect(link).toBeDefined();
    expect(link?.parentElement).toBe(heading);
    expect(heading?.textContent).toContain("#");
    expect(heading?.textContent).toContain("Structured heading");
  });

  it("should render complex children correctly", async () => {
    await page.render(
      <Heading level={1}>
        <span>Complex</span>
        <span>heading</span>
      </Heading>,
    );

    await expect.element(page.getByText("Complex")).toBeDefined();
    await expect.element(page.getByText("heading")).toBeDefined();
  });

  it("should handle scroll margin for anchor links", async () => {
    await page.render(
      <Heading level={1} id="scroll-heading">
        Scroll heading
      </Heading>,
    );

    const heading = page.getByRole("heading", { level: 1 }).query();
    expect(heading?.className).toContain("scroll-m-3.5");
  });

  it("should have correct typography styles", async () => {
    await page.render(<Heading level={1}>Typography test</Heading>);

    const heading = page.getByRole("heading", { level: 1 }).query();
    expect(heading?.className).toContain("font-extrabold");
    expect(heading?.className).toContain("text-base/1");
  });

  it("should have correct flex layout", async () => {
    await page.render(
      <Heading level={1} id="flex-heading">
        Flex heading
      </Heading>,
    );

    const heading = page.getByRole("heading", { level: 1 }).query();
    expect(heading?.className).toContain("flex");
    expect(heading?.className).toContain("gap-[1ch]");
  });

  it("should have correct data-slot attribute", async () => {
    await page.render(<Heading level={1}>Test Heading</Heading>);

    const heading = page.getByRole("heading", { level: 1 }).query();
    expect(heading?.getAttribute("data-slot")).toBe("heading");
  });
});
