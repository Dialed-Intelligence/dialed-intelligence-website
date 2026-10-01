import Link from "next/link";
import type { Service } from "@/content/services";
import { serviceLabels as L, serviceNav } from "@/content/services";
import { ctaHref, ctaLabel } from "@/content/site";
import { LogoMark } from "./logo";
import { Container, Eyebrow } from "./primitives";
import { CTA } from "./cta";
import { ClosingCTA } from "./bands";
import { Reveal } from "./reveal";
import { EditorialRow } from "./sections/editorial-row";

export function ServicePage({ service }: { service: Service }) {
  const order = serviceNav.findIndex((s) => s.slug === service.slug);
  const prev = serviceNav[(order + serviceNav.length - 1) % serviceNav.length];
  const next = serviceNav[(order + 1) % serviceNav.length];

  return (
    <>
      {/* Hero */}
      <section aria-labelledby="service-title" className="border-b border-ink/15">
        <Container className="pb-16 pt-16 lg:pb-20 lg:pt-24">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Eyebrow>{service.eyebrow}</Eyebrow>
            <span className="label-mono-sm text-ink/70">
              {L.aside}
            </span>
          </div>
          <h1
            id="service-title"
            className="mt-8 max-w-5xl font-display text-[clamp(2.2rem,4.8vw,4.25rem)] font-medium leading-[1.02] tracking-[-0.03em] text-balance"
          >
            {service.headline}
          </h1>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <CTA href={ctaHref} event="cta_book_call">
              {ctaLabel}
            </CTA>
            <span className="label-mono-sm text-ink/70">
              {L.buildPrefix} {service.engagement.duration.toLowerCase()}
            </span>
          </div>
        </Container>
      </section>

      {/* The problem */}
      <Container>
        <Reveal>
          <EditorialRow label={L.problem} index="01">
            <div className="max-w-2xl space-y-6">
              {service.problem.map((p) => (
                <p key={p.slice(0, 40)} className="body-lg text-ink/75">
                  {p}
                </p>
              ))}
            </div>
          </EditorialRow>
        </Reveal>
      </Container>

      {/* What we build */}
      <section className="bg-ink text-paper">
        <Container>
          <div className="relative">
            <LogoMark
              width={420}
              className="pointer-events-none absolute -right-20 bottom-0 hidden text-paper/4 lg:block"
            />
            <EditorialRow label={L.build} index="02" dark>
              <div className="relative max-w-2xl space-y-6">
                {service.build.map((p) => (
                  <p key={p.slice(0, 40)} className="body-lg text-paper/75">
                    {p}
                  </p>
                ))}
              </div>
            </EditorialRow>
          </div>
        </Container>
      </section>

      {/* What you get */}
      <Container>
        <Reveal>
          <EditorialRow label={L.get} index="03">
            <div className="max-w-2xl">
              <div className="space-y-6">
                {service.get.slice(0, -1).map((p) => (
                  <p key={p.slice(0, 40)} className="body-lg text-ink/75">
                    {p}
                  </p>
                ))}
              </div>
              <p className="mt-8 border-l-2 border-blue pl-6 font-display text-xl font-medium leading-snug tracking-tight text-ink lg:text-2xl">
                {service.get[service.get.length - 1]}
              </p>
            </div>
          </EditorialRow>
        </Reveal>
      </Container>

      {/* In practice */}
      <Container>
        <Reveal>
          <EditorialRow label={L.practice} index="04">
            <div>
              <p className="body-lg max-w-2xl text-ink/75">
                {service.practice.intro}
              </p>
              <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-[5px] border border-ink/15 bg-ink/15 md:grid-cols-3">
                {service.practice.beats.map((beat) => (
                  <div key={beat.label} className="bg-paper-2 p-7">
                    <span className="label-mono-sm text-blue-2">{beat.label}</span>
                    <p className="body-md mt-4 text-ink/70">{beat.text}</p>
                  </div>
                ))}
              </div>
              <p className="label-mono-sm mt-5 text-ink/65">
                {L.practiceNote}
              </p>
            </div>
          </EditorialRow>
        </Reveal>
      </Container>

      {/* Typical engagement */}
      <Container>
        <Reveal>
          <EditorialRow label={L.engagement} index="05">
            <div className="grid max-w-3xl grid-cols-1 gap-10 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-14">
              <div>
                <p className="display-1 text-blue">
                  {service.engagement.duration}
                </p>
                <p className="label-mono-sm mt-3 text-ink/70">
                  {L.engagementTerms}
                </p>
              </div>
              <p className="body-lg text-ink/75">{service.engagement.body}</p>
            </div>
          </EditorialRow>
        </Reveal>
      </Container>

      {/* Prev / next */}
      <nav aria-label={L.moreServices} className="border-t border-ink/20">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2">
            <Link
              href={prev.href}
              className="group flex flex-col gap-2 border-b border-ink/20 py-10 pr-8 transition-colors hover:bg-ink hover:px-6 hover:text-paper sm:border-b-0 sm:border-r"
            >
              <span className="label-mono-sm text-ink/70 group-hover:text-paper/65">
                {L.previous}
              </span>
              <span className="display-3">
                <span aria-hidden="true">&#8598; </span>
                {prev.title}
              </span>
            </Link>
            <Link
              href={next.href}
              className="group flex flex-col gap-2 py-10 text-right transition-colors hover:bg-ink hover:px-6 hover:text-paper sm:pl-8"
            >
              <span className="label-mono-sm text-ink/70 group-hover:text-paper/65">
                {L.next}
              </span>
              <span className="display-3">
                {next.title}
                <span aria-hidden="true"> &#8599;</span>
              </span>
            </Link>
          </div>
        </Container>
      </nav>

      <div className="pt-20 lg:pt-28">
        <ClosingCTA />
      </div>
    </>
  );
}
