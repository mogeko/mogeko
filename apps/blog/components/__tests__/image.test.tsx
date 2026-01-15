import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NotFoundError } from "@/lib/errors";

const getImage = vi.fn();
const setImage = vi.fn();

vi.mock("server-only", () => ({}));
vi.mock("@/lib/image-helper", () => ({ getImage, setImage }));

const { Image } = await import("@/components/image");

beforeEach(() => {
  vi.resetAllMocks();
});

afterEach(() => {
  cleanup();
  document.body.innerHTML = "";
});

describe("Image", () => {
  it("renders NextImage with original src when image exists", async () => {
    getImage.mockResolvedValue({
      name: "test",
      height: 100,
      width: 200,
      blurDataURL: "data:...",
      mimeType: "image/png",
    });

    render(
      await Image({
        alt: "Alt text",
        src: "https://example.com/test.png",
        width: 100,
        unoptimized: true,
      }),
    );

    const img = screen.getByRole("img");

    expect(img.getAttribute("src")).toBe("https://example.com/test.png");
    expect(img.getAttribute("height")).toBe("50");
    expect(img.getAttribute("alt")).toBe("Alt text");
  });

  it("uploads and uses filePath when NotFound and notionId provided", async () => {
    getImage.mockRejectedValue(new NotFoundError("not found"));
    setImage.mockResolvedValue({
      name: "uploaded",
      height: 50,
      width: 50,
      blurDataURL: "data:...",
      mimeType: "image/png",
      filePath: "key/file.png",
    });

    render(
      await Image({
        alt: "",
        src: "https://example.com/remote.png",
        notionId: "notion-1",
        width: 50,
        unoptimized: true,
      }),
    );

    const img = screen.getByRole("img");

    expect(img.getAttribute("src")).toBe("/image/key/file.png");
    expect(img.getAttribute("alt")).toBe("uploaded");
  });

  it("falls back to raw img when unexpected error", async () => {
    getImage.mockRejectedValue(new Error("boom"));

    render(
      await Image({
        alt: "Alt text",
        src: "https://example.com/fail.png",
        width: 100,
      }),
    );

    const img = screen.getByAltText("Alt text");

    expect(img.getAttribute("src")).toBe("https://example.com/fail.png");
  });
});
