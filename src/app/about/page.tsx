import { Container } from "@/components/primitives";
import { ClosingCTA } from "@/components/bands";
import { Reveal } from "@/components/reveal";
import { EditorialRow } from "@/components/sections/editorial-row";
import { PageHeader } from "@/components/sections/page-header";
import { TeamSection } from "@/components/sections/team";
import { Section } from "@/components/sections/section";
import { NumberedGrid } from "@/components/sections/numbered-grid";
import { pageMetadata } from "@/lib/meta";
import {
  clientCriteria,
  clientsIntro,
  firm,
  header,
  meta,
  principles,
  principlesIntro,
  team,
  teamIntro,
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

      <TeamSection id="team-title" intro={teamIntro} members={team} />

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
