import { brandOgImage, ogSize } from "@/lib/og";
import { og } from "@/content/how-it-works";

export const size = ogSize;
export const contentType = "image/png";
export const alt = og.alt;

export default async function Image() {
  return brandOgImage({ eyebrow: og.eyebrow, title: og.title });
}
