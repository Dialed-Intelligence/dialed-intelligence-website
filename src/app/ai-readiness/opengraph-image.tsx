import { brandOgImage, ogSize } from "@/lib/og";
import { og } from "@/content/ai-readiness";

export const size = ogSize;
export const contentType = "image/png";
export const alt = og.alt;

export default async function Image() {
  return brandOgImage({ eyebrow: og.eyebrow, title: og.title });
}
