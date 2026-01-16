import { describe, expect, it } from "bun:test";
import { extension, lookup } from "@/lib/mime";

describe("lookup", () => {
  it("should return correct MIME type for image extensions", () => {
    expect(lookup("image.jpg")).toBe("image/jpeg");
    expect(lookup("photo.jpeg")).toBe("image/jpeg");
    expect(lookup("picture.png")).toBe("image/png");
    expect(lookup("animation.gif")).toBe("image/gif");
    expect(lookup("icon.ico")).toBe("image/x-icon");
    expect(lookup("vector.svg")).toBe("image/svg+xml");
    expect(lookup("photo.webp")).toBe("image/webp");
  });

  it("should return correct MIME type for video extensions", () => {
    expect(lookup("movie.mp4")).toBe("video/mp4");
    expect(lookup("video.mkv")).toBe("video/x-matroska");
    expect(lookup("clip.avi")).toBe("video/x-msvideo");
    expect(lookup("stream.webm")).toBe("video/webm");
    expect(lookup("movie.mov")).toBe("video/quicktime");
    expect(lookup("broadcast.ts")).toBe("video/mp2t");
  });

  it("should handle extensions without file paths", () => {
    expect(lookup("jpg")).toBe("image/jpeg");
    expect(lookup("png")).toBe("image/png");
    expect(lookup("gif")).toBe("image/gif");
    expect(lookup("mp4")).toBe("video/mp4");
  });

  it("should handle case-insensitive extensions", () => {
    expect(lookup("IMAGE.JPG")).toBe("image/jpeg");
    expect(lookup("Photo.JPEG")).toBe("image/jpeg");
    expect(lookup("PICTURE.PNG")).toBe("image/png");
  });

  it("should return undefined for unknown extensions", () => {
    expect(lookup("file.unknown")).toBeUndefined();
    expect(lookup("document.txt")).toBeUndefined();
    expect(lookup("archive.zip")).toBeUndefined();
    expect(lookup("unknown")).toBeUndefined();
  });

  it("should handle files with multiple dots in name", () => {
    expect(lookup("my.image.jpg")).toBe("image/jpeg");
    expect(lookup("archive.tar.gz")).toBeUndefined();
    expect(lookup("photo.with.metadata.png")).toBe("image/png");
  });

  it("should handle edge cases", () => {
    expect(lookup("")).toBeUndefined();
    expect(lookup(".")).toBeUndefined();
    expect(lookup("..")).toBeUndefined();
    expect(lookup("noextension")).toBeUndefined();
  });
});

describe("extension", () => {
  it("should return correct extension for image MIME types", () => {
    expect(extension("image/jpeg")).toBe("jpg");
    expect(extension("image/png")).toBe("png");
    expect(extension("image/gif")).toBe("gif");
    expect(extension("image/x-icon")).toBe("ico");
    expect(extension("image/svg+xml")).toBe("svg");
    expect(extension("image/webp")).toBe("webp");
  });

  it("should return correct extension for video MIME types", () => {
    expect(extension("video/mp4")).toBe("mp4");
    expect(extension("video/x-matroska")).toBe("mkv");
    expect(extension("video/x-msvideo")).toBe("avi");
    expect(extension("video/webm")).toBe("webm");
    expect(extension("video/quicktime")).toBe("qt");
    expect(extension("video/mp2t")).toBe("ts");
  });

  it("should return undefined for unknown MIME types", () => {
    expect(extension("application/json")).toBeUndefined();
    expect(extension("text/plain")).toBeUndefined();
    expect(extension("unknown/type")).toBeUndefined();
    expect(extension("")).toBeUndefined();
  });

  it("should handle case-sensitive MIME types", () => {
    expect(extension("IMAGE/JPEG")).toBeUndefined();
    expect(extension("Image/Jpeg")).toBeUndefined();
    expect(extension("image/JPEG")).toBeUndefined();
  });
});
