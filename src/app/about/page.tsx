import { Container } from "@/components/primitives";
import { ClosingCTA } from "@/components/bands";
import { Reveal } from "@/components/reveal";
import { EditorialRow } from "@/components/sections/editorial-row";
import { PageHeader } from "@/components/sections/page-header";
import { LeadProfile } from "@/components/sections/lead-profile";
import { Section } from "@/components/sections/section";
import { NumberedGrid } from "@/components/sections/numbered-grid";
import { pageMetadata } from "@/lib/meta";
import {
  clientCriteria,
  clientsIntro,
  firm,
  header,
  lead,
  leadExtra,
  meta,
  principles,
  principlesIntro,
} from "@/content/about";

export const metadata = pageMetadata(meta);

export default function AboutPage() {
  return (
    <>
      <PageHeader id="about-title" eyebrow={header.eyebrow} title={header.title} />

      {/* The firm */}
      <section aria-labelledby="firm-title">
        <Container>
          <Reveal>
            <EditorialRow label={firm.label} index="01" headingId="firm-title">
              <div className="max-w-2xl space-y-6">
                {firm.paragraphs.map((p) => (
                  <p key={p.slice(0, 40)} className="body-lg text-ink/75">
                    {p}
                  </p>
                ))}
              </div>
            </EditorialRow>
          </Reveal>
        </Container>
      </section>

      <LeadProfile id="lead-title" copy={lead} extra={leadExtra} />

      <Section id="principles-title" intro={principlesIntro}>
        <NumberedGrid items={principles} cols={2} />
      </Section>

      <Section id="clients-title" intro={clientsIntro}>
        <NumberedGrid items={clientCriteria} cols={3} />
      </Section>

      <ClosingCTA />
    </>
  );
}
