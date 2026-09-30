import { services } from "@/content/services";
import { Container, Eyebrow, Index } from "@/components/primitives";
import { TextLink } from "@/components/cta";
import { ClosingCTA } from "@/components/bands";
import { Reveal } from "@/components/reveal";
import { pageMetadata } from "@/lib/meta";
import { architecture, header, list, meta } from "@/content/services-hub";

export const metadata = pageMetadata(meta);

const diagram = architecture.diagram;

/**
 * Architecture sketch built from bordered blocks and hairlines only.
 * The data system is the foundation, the three modules sit on top of it,
 * and the automation platform is the chassis the client's team drives.
 */
function ArchitectureDiagram() {
  return (
    <figure>
      <div className="rounded-[5px] border border-ink/20 bg-paper-2/40 p-5 sm:p-8">
        {/* Chassis */}
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 rounded-[2px] border border-ink/20 bg-paper-2 px-4 py-4 sm:px-5">
          <span className="flex items-center gap-3">
            <span aria-hidden="true" className="size-[7px] shrink-0 bg-blue" />
            <span className="label-mono-sm text-ink">
              {diagram.chassis}
            </span>
          </span>
          <span className="label-mono-sm text-ink/70">{diagram.chassisNote}</span>
        </div>

        {/* Connectors, chassis to modules */}
        <div aria-hidden="true" className="grid grid-cols-3">
          <span className="mx-auto h-6 w-px bg-ink/25" />
          <span className="mx-auto h-6 w-px bg-ink/25" />
          <span className="mx-auto h-6 w-px bg-ink/25" />
        </div>

        {/* Modules */}
        <ul className="grid grid-cols-3 gap-2 sm:gap-3">
          {diagram.modules.map((label) => (
            <li
              key={label}
              className="flex min-h-[104px] flex-col justify-between gap-4 rounded-[2px] border border-ink/20 bg-paper-2 p-3 sm:min-h-[120px] sm:p-4"
            >
              <span aria-hidden="true" className="size-[7px] bg-blue" />
              <span className="label-mono-sm text-ink">{label}</span>
            </li>
          ))}
        </ul>

        {/* Connectors, modules to foundation */}
        <div aria-hidden="true" className="grid grid-cols-3">
          <span className="mx-auto h-6 w-px bg-ink/25" />
          <span className="mx-auto h-6 w-px bg-ink/25" />
          <span className="mx-auto h-6 w-px bg-ink/25" />
        </div>

        {/* Foundation */}
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 rounded-[2px] bg-ink px-4 py-5 text-paper sm:px-5">
          <span className="flex items-center gap-3">
            <span aria-hidden="true" className="size-[7px] shrink-0 bg-lime" />
            <span className="label-mono-sm">{diagram.foundation}</span>
          </span>
          <span className="label-mono-sm text-paper/60">{diagram.foundationNote}</span>
        </div>
      </div>
      <figcaption className="label-mono-sm mt-4 text-ink/70">
        {diagram.caption}
      </figcaption>
    </figure>
  );
}

export default function ServicesPage() {
  return (
    <>
      {/* Header */}
      <section aria-labelledby="services-title">
        <Container className="pb-16 pt-16 lg:pb-20 lg:pt-24">
          <Eyebrow>{header.eyebrow}</Eyebrow>
          <h1
            id="services-title"
            className="mt-8 max-w-4xl font-display text-[clamp(2.4rem,5.4vw,4.75rem)] font-medium leading-[0.97] tracking-[-0.035em] text-balance"
          >
            {header.title}
          </h1>
          <p className="body-lg mt-8 max-w-2xl text-ink/75">{header.intro}</p>
        </Container>
      </section>

      {/* The architecture story */}
      <section aria-labelledby="architecture-title" className="border-t border-ink/15">
        <Container className="py-24 lg:py-32">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-20">
            <Reveal>
              <Eyebrow>{architecture.eyebrow}</Eyebrow>
              <h2 id="architecture-title" className="display-2 mt-6 max-w-xl">
                {architecture.title}
              </h2>
              <p className="body-lg mt-6 max-w-xl text-ink/70">
                {architecture.body}
              </p>
            </Reveal>
            <Reveal delay={100}>
              <ArchitectureDiagram />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Five service blocks */}
      <section aria-labelledby="service-list-title" className="border-t border-ink/15">
        <Container className="py-24 lg:py-32">
          <Reveal>
            <Eyebrow>{list.eyebrow}</Eyebrow>
            <h2 id="service-list-title" className="display-1 mt-5 max-w-3xl">
              {list.title}
            </h2>
          </Reveal>
          <div className="mt-14 border-t border-ink/20">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={i * 60}>
                <article
                  aria-labelledby={`service-row-${service.slug}`}
                  className="grid grid-cols-1 gap-x-10 gap-y-6 border-b border-ink/20 py-12 transition-colors duration-300 hover:bg-paper-2 lg:grid-cols-[64px_minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-x-14"
                >
                  <Index n={service.index} />
                  <div>
                    <h3 id={`service-row-${service.slug}`} className="display-2">
                      {service.title}
                    </h3>
                    <p className="label-mono-sm mt-4 text-ink/70">
                      {list.durationPrefix}{" "}
                      {service.engagement.duration.toLowerCase()}
                    </p>
                  </div>
                  <div>
                    <p className="body-lg max-w-2xl text-ink/80">
                      {service.problemStatement}
                    </p>
                    <p className="body-md mt-3 max-w-2xl text-ink/70">
                      {service.card}
                    </p>
                    <div className="mt-6">
                      <TextLink href={`/services/${service.slug}`}>
                        {list.linkLabel}
                      </TextLink>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <ClosingCTA />
    </>
  );
}
