import { cacheLife, cacheTag } from "next/cache";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { NotFoundError } from "@/lib/errors";

vi.mock("@/lib/redis", () => ({
  redis: { hset: vi.fn(), hgetall: vi.fn() },
}));

const { redis } = await import("@/lib/redis");

vi.mock("server-only", () => ({}));
vi.mock("next/cache", () => ({ cacheLife: vi.fn(), cacheTag: vi.fn() }));
vi.mock("sharp", () => ({
  __esModule: true,
  default: vi.fn().mockImplementation(() => ({
    metadata: vi.fn().mockResolvedValue({
      width: 800,
      height: 600,
      format: "jpeg",
    }),
    resize: vi.fn().mockReturnThis(),
    blur: vi.fn().mockReturnValue({
      toBuffer: vi.fn().mockResolvedValue(new Uint8Array([1, 2, 3])),
    }),
  })),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("getImage", () => {
  it("should return image data when key exists", async () => {
    const mockImageData = {
      name: "test-image.jpg",
      width: 800,
      height: 600,
      blurDataURL: "data:image/jpeg;base64,test-blur-data",
      mimeType: "image/jpeg",
    };

    vi.mocked(redis).hgetall.mockResolvedValue(mockImageData);

    const { getImage } = await import("@/lib/image-helper");

    const result = await getImage("test-key");

    expect(redis.hgetall).toHaveBeenCalledWith("image:test-key");
    expect(result).toEqual(mockImageData);
  });

  it("should throw NotFoundError when key does not exist", async () => {
    vi.mocked(redis).hgetall.mockResolvedValue(null);

    const { getImage } = await import("@/lib/image-helper");

    await expect(getImage("non-existent-key")).rejects.toThrow(NotFoundError);
    await expect(getImage("non-existent-key")).rejects.toThrow(
      "No record found with key: non-existent-key",
    );
  });

  it("should handle cache tags and lifecycle", async () => {
    const mockImageData = {
      name: "test-image.jpg",
      width: 800,
      height: 600,
      blurDataURL: "data:image/jpeg;base64,test-blur-data",
      mimeType: "image/jpeg",
    };

    vi.mocked(redis).hgetall.mockResolvedValue(mockImageData);

    const { getImage } = await import("@/lib/image-helper");

    await getImage("test-key");

    expect(cacheTag).toHaveBeenCalledWith(
      "image",
      "test-image.jpg",
      "test-key",
    );
    expect(cacheLife).toHaveBeenCalledWith("max");
  });
});

describe("setImage", () => {
  it("should handle fetch errors", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue(
      new Response(null, { status: 404 }),
    );

    const { setImage } = await import("@/lib/image-helper");

    const options = {
      fileName: "test-image.jpg",
      url: "https://example.com/image.jpg",
      key: "test-key",
    };

    await expect(setImage(options)).rejects.toThrow(
      "Failed to fetch image: 404",
    );
  });

  it("should handle network errors during fetch", async () => {
    vi.spyOn(global, "fetch").mockRejectedValue(new Error("Network error"));

    const { setImage } = await import("@/lib/image-helper");

    const options = {
      fileName: "test-image.jpg",
      url: "https://example.com/image.jpg",
      key: "test-key",
    };

    await expect(setImage(options)).rejects.toThrow("Network error");
  });
});
