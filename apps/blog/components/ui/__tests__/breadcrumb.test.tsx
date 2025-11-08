import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Breadcrumb, BreadcrumbItem } from "@/components/ui/breadcrumb";

describe("Breadcrumb", () => {
  it("should render with correct aria-label", () => {
    render(<Breadcrumb>Test breadcrumb</Breadcrumb>);

    const nav = screen.getByRole("navigation", { name: "breadcrumb" });
    expect(nav).toBeDefined();
  });

  it("should render children inside ordered list", () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>Posts</BreadcrumbItem>
        <BreadcrumbItem>Current</BreadcrumbItem>
      </Breadcrumb>,
    );

    const list = screen.getByRole("list");
    expect(list).toBeDefined();
    expect(list.className).toContain("flex");
    expect(list.className).toContain("flex-wrap");
    expect(list.className).toContain("items-center");
    expect(list.className).toContain("gap-[1ch]");

    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(3);
    expect(screen.getByText("Home")).toBeDefined();
    expect(screen.getByText("Posts")).toBeDefined();
    expect(screen.getByText("Current")).toBeDefined();
  });

  it("should pass through additional HTML attributes", () => {
    render(
      <Breadcrumb className="custom-class" aria-label="Navigation breadcrumb">
        <BreadcrumbItem>Home</BreadcrumbItem>
      </Breadcrumb>,
    );

    const nav = screen.getByRole("navigation", {
      name: "Navigation breadcrumb",
    });
    expect(nav).toBeDefined();
    expect(nav.className).toContain("custom-class");
  });

  it("should have correct data-slot attribute", () => {
    render(<Breadcrumb>Test breadcrumb</Breadcrumb>);

    const nav = screen.getByRole("navigation", { name: "breadcrumb" });
    expect(nav.getAttribute("data-slot")).toBe("breadcrumb");
  });
});

describe("BreadcrumbItem", () => {
  it("should render with correct classes", () => {
    render(<BreadcrumbItem>Test item</BreadcrumbItem>);

    const item = screen.getByRole("listitem");
    expect(item).toBeDefined();
    expect(item.className).toContain("inline-flex");
    expect(item.className).toContain("items-center");
    expect(item.className).toContain("gap-[1ch]");
  });

  it("should merge custom className with default styles", () => {
    render(
      <BreadcrumbItem className="custom-item-class">Test item</BreadcrumbItem>,
    );

    const item = screen.getByRole("listitem");
    expect(item.className).toContain("inline-flex");
    expect(item.className).toContain("items-center");
    expect(item.className).toContain("gap-[1ch]");
    expect(item.className).toContain("custom-item-class");
  });

  it("should pass through additional HTML attributes", () => {
    render(<BreadcrumbItem aria-label="Home page">Home</BreadcrumbItem>);

    const item = screen.getByRole("listitem", { name: "Home page" });
    expect(item).toBeDefined();
    expect(item.getAttribute("aria-label")).toBe("Home page");
  });

  it("should render children correctly", () => {
    render(
      <BreadcrumbItem>
        <span>Complex</span>
        <span>children</span>
      </BreadcrumbItem>,
    );

    expect(screen.getByText("Complex")).toBeDefined();
    expect(screen.getByText("children")).toBeDefined();
  });
});

describe("BreadcrumbItem.Separator", () => {
  it("should render default separator when no children provided", () => {
    render(<BreadcrumbItem.Separator />);

    const separator = screen.getByText("❯");
    expect(separator).toBeDefined();
  });

  it("should render custom separator when children provided", () => {
    render(<BreadcrumbItem.Separator>/</BreadcrumbItem.Separator>);

    const separator = screen.getByText("/");
    expect(separator).toBeDefined();
  });

  it("should pass through additional HTML attributes", () => {
    render(<BreadcrumbItem.Separator aria-label="Breadcrumb separator" />);

    const separator = screen.getByLabelText("Breadcrumb separator");
    expect(separator).toBeDefined();
  });
});
