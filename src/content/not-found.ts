import type { LinkCopy, PageMeta } from "./types";

export const meta: PageMeta = {
  title: "Page not found",
  description:
    "This page does not exist. The address may have changed, or it never shipped.",
};

export const notFound: {
  title: string;
  body: string;
  primary: LinkCopy;
  secondary: LinkCopy;
} = {
  title: "This page does not exist.",
  body: "The address may have changed, or it never shipped.",
  primary: { label: "Back to the home page", href: "/" },
  secondary: { label: "Start a conversation", href: "/contact" },
};
