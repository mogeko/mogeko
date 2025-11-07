import { extname } from "node:path";
import { cache } from "react";

export const db = [
  ["image/avif", ["avif"]],
  ["image/bmp", ["bmp", "dib"]],
  ["image/gif", ["gif"]],
  ["image/jpeg", ["jpg", "jpeg", "jpe"]],
  ["image/png", ["png"]],
  ["image/sgi", ["sgi"]],
  ["image/svg+xml", ["svg", "svgz"]],
  ["image/tiff", ["tif", "tiff"]],
  ["image/tiff-fx", ["tfx"]],
  ["image/webp", ["webp"]],
  ["image/x-icon", ["ico"]],
  ["video/3gpp", ["3gp", "3gpp"]],
  ["video/mp2t", ["ts", "m2t", "m2ts", "mts"]],
  ["video/mp4", ["mp4", "mp4v", "mpg4"]],
  ["video/mpeg", ["mpeg", "mpg", "mpe", "m1v", "m2v"]],
  ["video/quicktime", ["qt", "mov"]],
  ["video/webm", ["webm"]],
  ["video/x-matroska", ["mkv", "mk3d", "mks"]],
  ["video/x-msvideo", ["avi"]],
] as const;

export type Mime = (typeof db)[number][0];

export const lookup = cache((path: string): Mime | undefined => {
  const extension = extname(`x.${path}`).toLowerCase().slice(1);

  for (const [mime, exts] of db) {
    for (const ext of exts) {
      if (extension === ext) {
        return mime;
      }
    }
  }
});

export type Ext = (typeof db)[number][1][0];

export const extension = cache((mime: string): Ext | undefined => {
  for (const [_mime, exts] of db) {
    if (mime === _mime) {
      return exts[0];
    }
  }
});
