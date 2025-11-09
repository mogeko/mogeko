import { describe, expect, it } from "vitest";
import { page } from "vitest/browser";
import { render } from "vitest-browser-react";
import { Breadcrumb, BreadcrumbItem } from "@/components/ui/breadcrumb";

describe("Breadcrumb", () => {
  it("should render with correct aria-label", async () => {
    await render(<Breadcrumb>Test breadcrumb</Breadcrumb>);

    const nav = page.getByRole("navigation", { name: "breadcrumb" });
    await expect.element(nav).toBeDefined();
  });

  it("should render children inside ordered list", async () => {
    await render(
      <Breadcrumb>
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>Posts</BreadcrumbItem>
        <BreadcrumbItem>Current</BreadcrumbItem>
      </Breadcrumb>,
    );

    const list = page.getByRole("list").query();
    expect(list).toBeDefined();
    expect(list?.className).toContain("flex");
    expect(list?.className).toContain("flex-wrap");
    expect(list?.className).toContain("items-center");
    expect(list?.className).toContain("gap-[1ch]");

    const items = page.getByRole("listitem").all();
    expect(items).toHaveLength(3);
    await expect.element(page.getByText("Home")).toBeDefined();
    await expect.element(page.getByText("Posts")).toBeDefined();
    await expect.element(page.getByText("Current")).toBeDefined();
  });

  it("should pass through additional HTML attributes", () => {
    render(
      <Breadcrumb className="custom-class" aria-label="Navigation breadcrumb">
        <BreadcrumbItem>Home</BreadcrumbItem>
      </Breadcrumb>,
    );

    const nav = page
      .getByRole("navigation", { name: "Navigation breadcrumb" })
      .query();
    expect(nav).toBeDefined();
    expect(nav?.className).toContain("custom-class");
  });

  it("should have correct data-slot attribute", async () => {
    await render(<Breadcrumb>Test breadcrumb</Breadcrumb>);

    const nav = page.getByRole("navigation", { name: "breadcrumb" }).query();
    expect(nav?.getAttribute("data-slot")).toBe("breadcrumb");
  });
});

describe("BreadcrumbItem", () => {
  it("should render with correct classes", async () => {
    await render(<BreadcrumbItem>Test item</BreadcrumbItem>);

    const item = page.getByRole("listitem").query();
    expect(item).toBeDefined();
    expect(item?.className).toContain("inline-flex");
    expect(item?.className).toContain("items-center");
    expect(item?.className).toContain("gap-[1ch]");
  });

  it("should merge custom className with default styles", async () => {
    await render(
      <BreadcrumbItem className="custom-item-class">Test item</BreadcrumbItem>,
    );

    const item = page.getByRole("listitem").query();
    expect(item?.className).toContain("inline-flex");
    expect(item?.className).toContain("items-center");
    expect(item?.className).toContain("gap-[1ch]");
    expect(item?.className).toContain("custom-item-class");
  });

  it("should pass through additional HTML attributes", async () => {
    await render(<BreadcrumbItem aria-label="Home page">Home</BreadcrumbItem>);

    const item = page.getByRole("listitem", { name: "Home page" }).query();
    expect(item).toBeDefined();
    expect(item?.getAttribute("aria-label")).toBe("Home page");
  });

  it("should render children correctly", async () => {
    await render(
      <BreadcrumbItem>
        <span>Complex</span>
        <span>children</span>
      </BreadcrumbItem>,
    );

    await expect.element(page.getByText("Complex")).toBeDefined();
    await expect.element(page.getByText("children")).toBeDefined();
  });
});

describe("BreadcrumbItem.Separator", () => {
  it("should render default separator when no children provided", async () => {
    await render(<BreadcrumbItem.Separator />);

    const separator = page.getByText("\u276f").query();
    expect(separator).toBeDefined();
  });

  it("should render custom separator when children provided", async () => {
    await render(<BreadcrumbItem.Separator>/</BreadcrumbItem.Separator>);

    const separator = page.getByText("/").query();
    expect(separator).toBeDefined();
  });

  it("should pass through additional HTML attributes", async () => {
    await render(
      <BreadcrumbItem.Separator aria-label="Breadcrumb separator" />,
    );

    const separator = page.getByLabelText("Breadcrumb separator").query();
    expect(separator).toBeDefined();
  });
});
