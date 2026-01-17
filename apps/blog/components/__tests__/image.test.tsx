import { afterEach, beforeEach, describe, expect, it, mock } from "bun:test";
import { cleanup, render, screen } from "@testing-library/react";
import { NotFoundError } from "@/lib/errors";

const ORIGINAL_ENV_VARIABLE = process.env.APP_IMAGE_DOMAIN;

const getImage = mock();
const setImage = mock();

mock.module("server-only", () => ({}));
mock.module("@/lib/image-helper", () => ({ getImage, setImage }));
mock.module("next/image", () => ({
  __esModule: true,
  default: mock(({ src, alt, height }: React.ComponentProps<"img">) => {
    // biome-ignore lint: Only for test
    return <img src={src} alt={alt} height={height} />;
  }),
}));

const { Image } = await import("@/components/image");

beforeEach(() => {
  process.env.APP_IMAGE_DOMAIN = ORIGINAL_ENV_VARIABLE;
  mock.clearAllMocks();
});

afterEach(() => {
  cleanup();
  document.body.innerHTML = "";
});

describe("Image", () => {
  it("renders NextImage with filePath when image domain exists", async () => {
    process.env.APP_IMAGE_DOMAIN = "example.com";
    getImage.mockResolvedValue({
      name: "test",
      height: 100,
      width: 200,
      blurDataURL: "data:...",
      mimeType: "image/png",
      filePath: "key/file.png",
    });

    render(await Image({ alt: "", src: "https://image.example.com/test.png" }));

    const img = screen.getByRole("img");

    expect(img.getAttribute("src")).toBe("https://example.com/key/file.png");
    expect(img.getAttribute("alt")).toBe("test");
    expect(img.getAttribute("height")).toBe("100");

    process.env.APP_IMAGE_DOMAIN = ORIGINAL_ENV_VARIABLE;
  });

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
