import getIcon from "@/app/icon";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function AppleIcon() {
  return getIcon({ id: Promise.resolve("512") });
}
