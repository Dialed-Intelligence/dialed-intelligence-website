import { services, getService, serviceOg } from "@/content/services";
import { brandOgImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = serviceOg.alt;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  return brandOgImage({
    eyebrow: service?.title ?? serviceOg.fallbackEyebrow,
    title: service?.headline ?? serviceOg.fallbackTitle,
  });
}
