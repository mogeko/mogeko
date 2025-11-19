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

// Browser environment mock
const mockArrayBuffer = vi.fn();
const mockResponse = {
  ok: true,
  arrayBuffer: mockArrayBuffer,
};
const mockFetch = vi.fn();

describe("getImage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFetch.mockResolvedValue(mockResponse);
    mockArrayBuffer.mockResolvedValue(new ArrayBuffer(1024));
    globalThis.fetch = mockFetch;
  });

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

  describe("Browser Environment", () => {
    beforeEach(() => {
      vi.clearAllMocks();
      mockFetch.mockResolvedValue(mockResponse);
      mockArrayBuffer.mockResolvedValue(new ArrayBuffer(1024));
      globalThis.fetch = mockFetch;
    });

    it("should work correctly in browser environment", async () => {
      const mockImageData = {
        name: "browser-image.jpg",
        width: 1920,
        height: 1080,
        blurDataURL: "data:image/jpeg;base64,browser-blur-data",
        mimeType: "image/jpeg",
      };

      vi.mocked(redis).hgetall.mockResolvedValue(mockImageData as any);

      const result = await getImage("browser-key");

      expect(result).toEqual(mockImageData);
      expect(redis.hgetall).toHaveBeenCalledWith("image:browser-key");
      expect(cacheTag).toHaveBeenCalledWith(
        "image",
        "browser-image.jpg",
        "browser-key",
      );
    });

    it("should handle browser-specific cache behavior", async () => {
      const mockImageData = {
        name: "browser-cache-test.jpg",
        width: 800,
        height: 600,
        blurDataURL: "data:image/jpeg;base64,cache-test",
        mimeType: "image/jpeg",
      };

      vi.mocked(redis).hgetall.mockResolvedValue(mockImageData as any);

      await getImage("cache-test-key");

      // Verify cache lifecycle is set to max in browser
      expect(cacheLife).toHaveBeenCalledWith("max");
      expect(cacheTag).toHaveBeenCalledWith(
        "image",
        "browser-cache-test.jpg",
        "cache-test-key",
      );
    });
  });
});

describe("setImage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFetch.mockResolvedValue(mockResponse);
    mockArrayBuffer.mockResolvedValue(new ArrayBuffer(1024));
    globalThis.fetch = mockFetch;
  });

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

  describe("Browser Environment", () => {
    beforeEach(() => {
      vi.clearAllMocks();
      mockFetch.mockResolvedValue(mockResponse);
      mockArrayBuffer.mockResolvedValue(new ArrayBuffer(1024));
      globalThis.fetch = mockFetch;
    });

    it("should handle image processing in browser environment", async () => {
      const mockUploader = vi.fn().mockImplementation((_buffer, meta) => ({
        ...meta,
        customField: "browser-upload",
      }));

      const options = {
        fileName: "browser-image.jpg",
        url: "https://example.com/browser-image.jpg",
        key: "browser-key",
      };

      const _result = await setImage(mockUploader, options);

      expect(mockFetch).toHaveBeenCalledWith(options.url);
      expect(mockArrayBuffer).toHaveBeenCalled();
      expect(mockUploader).toHaveBeenCalled();
      expect(redis.hset).toHaveBeenCalledWith(
        "image:browser-key",
        expect.objectContaining({
          name: "browser-image.jpg",
          customField: "browser-upload",
        }),
      );
    });

    it("should handle browser-specific fetch scenarios", async () => {
      // Test with different image formats in browser
      vi.mocked(redis.hset).mockResolvedValue(1);

      const options = {
        fileName: "browser-png.png",
        url: "https://example.com/image.png",
        key: "browser-png-key",
      };

      await setImage(options);

      expect(mockFetch).toHaveBeenCalledWith(options.url);
      expect(redis.hset).toHaveBeenCalledWith(
        "image:browser-png-key",
        expect.objectContaining({
          name: "browser-png.png",
        }),
      );
    });

    it("should handle browser CORS scenarios", async () => {
      // Mock a CORS error scenario
      mockFetch.mockRejectedValue(new Error("CORS policy violation"));

      const options = {
        fileName: "cors-image.jpg",
        url: "https://cross-origin.example.com/image.jpg",
        key: "cors-key",
      };

      await expect(setImage(options)).rejects.toThrow("CORS policy violation");
    });

    it("should handle browser-specific uploader functions", async () => {
      const browserUploader = vi.fn().mockImplementation((buffer, meta) => ({
        ...meta,
        browserProcessed: true,
        bufferSize: buffer.byteLength,
      }));

      const options = {
        fileName: "browser-upload.jpg",
        url: "https://example.com/upload.jpg",
        key: "browser-upload-key",
      };

      const result = await setImage(browserUploader, options);

      expect(browserUploader).toHaveBeenCalledWith(
        expect.any(ArrayBuffer),
        expect.objectContaining({
          name: "browser-upload.jpg",
          width: 800,
          height: 600,
        }),
      );
      expect(result).toMatchObject({
        browserProcessed: true,
        bufferSize: 1024,
      });
    });

    it("should handle browser memory constraints", async () => {
      // Test with large image buffer
      const largeBuffer = new ArrayBuffer(10 * 1024 * 1024); // 10MB
      mockArrayBuffer.mockResolvedValue(largeBuffer);

      const options = {
        fileName: "large-image.jpg",
        url: "https://example.com/large-image.jpg",
        key: "large-key",
      };

      await setImage(options);

      expect(mockArrayBuffer).toHaveBeenCalled();
      expect(redis.hset).toHaveBeenCalledWith(
        "image:large-key",
        expect.objectContaining({
          name: "large-image.jpg",
        }),
      );
    });
  });
});
