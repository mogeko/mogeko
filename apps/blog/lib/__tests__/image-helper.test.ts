import { cacheLife, cacheTag } from "next/cache";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { NotFoundError } from "@/lib/errors";
import { getImage, setImage } from "@/lib/image-helper";
import { redis } from "@/lib/redis";

// Mock dependencies
vi.mock("@/lib/redis", () => ({
  redis: { hset: vi.fn(), hgetall: vi.fn() },
}));

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

vi.mock("@/lib/mime", () => ({
  lookup: vi.fn().mockReturnValue("image/jpeg"),
}));

vi.mock("server-only", () => ({}));

describe("getImage", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should return image data when key exists", async () => {
    const redisMock = vi.mocked(redis);

    const mockImageData = {
      name: "test-image.jpg",
      width: 800,
      height: 600,
      blurDataURL: "data:image/jpeg;base64,test-blur-data",
      mimeType: "image/jpeg",
    };

    redisMock.hgetall.mockResolvedValue(mockImageData as any);

    const result = await getImage("test-key");

    expect(redisMock.hgetall).toHaveBeenCalledWith("image:test-key");
    expect(result).toEqual(mockImageData);
  });

  it("should throw NotFoundError when key does not exist", async () => {
    vi.mocked(redis).hgetall.mockResolvedValue(null as any);

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

    vi.mocked(redis).hgetall.mockResolvedValue(mockImageData as any);

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
  beforeEach(() => vi.clearAllMocks());

  it("should handle fetch errors", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({ ok: false, status: 404 });

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
    globalThis.fetch = vi.fn().mockRejectedValue(new Error("Network error"));

    const options = {
      fileName: "test-image.jpg",
      url: "https://example.com/image.jpg",
      key: "test-key",
    };

    await expect(setImage(options)).rejects.toThrow("Network error");
  });
});
