import type { Metadata } from "next";
import type { PageMeta } from "@/content/types";

/** Page metadata from a content module's `meta` block. */
export function pageMetadata(meta: PageMeta): Metadata {
  return {
    title: meta.title,
    description: meta.description,
    ...(meta.canonical ? { alternates: { canonical: meta.canonical } } : {}),
  };
}
