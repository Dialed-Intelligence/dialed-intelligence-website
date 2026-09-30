import { LogoMark } from "@/components/logo";
import { Container, Index } from "@/components/primitives";
import { CTA, TextLink } from "@/components/cta";
import { pageMetadata } from "@/lib/meta";
import { meta, notFound } from "@/content/not-found";

export const metadata = pageMetadata(meta);

export default function NotFound() {
  return (
    <section aria-labelledby="not-found-title" className="relative overflow-hidden">
      <LogoMark
        width={480}
        className="pointer-events-none absolute -right-12 top-24 hidden text-ink/5 lg:block"
      />
      <Container className="relative py-32">
        <Index n="404" />
        <h1 id="not-found-title" className="display-hero mt-6 max-w-3xl">
          {notFound.title}
        </h1>
        <p className="body-lg mt-8 max-w-xl text-ink/75">
          {notFound.body}
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
          <CTA href={notFound.primary.href}>{notFound.primary.label}</CTA>
          <TextLink href={notFound.secondary.href}>
            {notFound.secondary.label}
          </TextLink>
        </div>
      </Container>
    </section>
  );
}
