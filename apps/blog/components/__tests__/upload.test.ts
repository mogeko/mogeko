import { beforeEach, describe, expect, it, mock, spyOn } from "bun:test";

const s3Write = spyOn(Bun.s3, "write");
const setImage = mock();

mock.module("server-only", () => ({}));
mock.module("@/lib/image-helper", () => ({ getImage: mock(), setImage }));

const { upload } = await import("@/components/image");

const mockOptions = {
  key: "test-key",
  fileName: "test-image.png",
  url: "https://example.com/test.png",
};

const mockImageData = {
  name: "test-image.png",
  height: 100,
  width: 200,
  blurDataURL: "data:image/png;base64,test",
  mimeType: "image/png",
  filePath: "test-key/test-image.png",
};

beforeEach(() => {
  mock.clearAllMocks();
});

describe("upload", () => {
  it("should upload image to S3 and return image data", async () => {
    const buffer = new ArrayBuffer(0);

    setImage.mockImplementation(async (uploader, _) => {
      return {
        ...(await uploader(buffer, mockImageData)),
        filePath: mockImageData.filePath,
      };
    });
    s3Write.mockResolvedValue(0);

    const result = await upload(mockOptions);

    expect(setImage).toHaveBeenCalledTimes(1);

    expect(s3Write).toHaveBeenCalledTimes(1);
    expect(s3Write).toBeCalledWith("test-key/test-image.png", buffer, {
      type: "image/png",
    });

    expect(result).toEqual(mockImageData);
  });

  it("should handle errors from setImage", async () => {
    const error = new Error("Failed to upload");

    setImage.mockRejectedValue(error);

    expect(upload(mockOptions)).rejects.toThrow("Failed to upload");

    expect(s3Write).not.toHaveBeenCalled();
  });
});
