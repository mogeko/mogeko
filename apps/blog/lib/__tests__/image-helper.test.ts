import { cacheLife, cacheTag } from "next/cache";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { NotFoundError } from "@/lib/errors";

const redis = { hset: vi.fn(), hgetall: vi.fn() };
const fetch = vi.spyOn(global, "fetch");

vi.mock("@/lib/redis", () => ({ redis }));
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

const { getImage, setImage } = await import("@/lib/image-helper");

beforeEach(() => {
  vi.resetAllMocks();
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

    redis.hgetall.mockResolvedValue(mockImageData);

    const result = await getImage("test-key");

    expect(redis.hgetall).toHaveBeenCalledWith("image:test-key");
    expect(result).toEqual(mockImageData);
  });

  it("should throw NotFoundError when key does not exist", async () => {
    redis.hgetall.mockResolvedValue(null);

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

    redis.hgetall.mockResolvedValue(mockImageData);

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
    fetch.mockResolvedValue(new Response(null, { status: 404 }));

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
    fetch.mockRejectedValue(new Error("Network error"));

    const options = {
      fileName: "test-image.jpg",
      url: "https://example.com/image.jpg",
      key: "test-key",
    };

    await expect(setImage(options)).rejects.toThrow("Network error");
  });
});
