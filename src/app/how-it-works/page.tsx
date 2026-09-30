import { Container } from "@/components/primitives";
import { ClosingCTA, StatementBand } from "@/components/bands";
import { Reveal } from "@/components/reveal";
import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/sections/page-header";
import { StageBlock } from "@/components/sections/stage-block";
import { Section } from "@/components/sections/section";
import { IndexedRows } from "@/components/sections/indexed-rows";
import { NumberedGrid } from "@/components/sections/numbered-grid";
import { TextSection } from "@/components/sections/text-section";
import { EditorialRow } from "@/components/sections/editorial-row";
import { FaqSection } from "@/components/sections/faq";
import { pageMetadata } from "@/lib/meta";
import { ownershipBand } from "@/content/site";
import { faqs } from "@/content/faq";
import {
  anatomy,
  exit,
  faqIntro,
  header,
  meta,
  needs,
  stageLabels,
  stages,
  standards,
} from "@/content/how-it-works";

export const metadata = pageMetadata(meta);

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export default function HowItWorksPage() {
  return (
    <>
      <JsonLd data={faqJsonLd} />

      <PageHeader
        id="how-it-works-title"
        eyebrow={header.eyebrow}
        aside={header.aside}
        title={header.title}
        subhead={header.subhead}
      />

      {/* The path. Steps alternate sides, handover closes on ink. */}
      {stages.map((stage, i) => (
        <StageBlock
          key={stage.n}
          stage={stage}
          total={stages.length}
          labels={stageLabels}
          flip={i % 2 === 1}
          dark={i === stages.length - 1}
        />
      ))}

      {/* Anatomy of a Quarter Plan */}
      <Section
        id="anatomy-title"
        anchor="quarter-plan"
        intro={anatomy.intro}
        lead={anatomy.body}
        border={false}
      >
        <IndexedRows items={anatomy.items} />
      </Section>

      {/* Service standards */}
      <Section id="standards-title" anchor="standards" intro={standards.intro}>
        <NumberedGrid items={standards.items} cols={2} />
      </Section>

      <TextSection id="needs-title" {...needs} />

      <StatementBand id="ownership" copy={ownershipBand} showLink={false} />

      {/* Renewal and exit */}
      <section aria-labelledby="exit-title">
        <Container>
          <Reveal>
            <EditorialRow label={exit.label} index="01" headingId="exit-title">
              <div className="max-w-2xl space-y-6">
                {exit.paragraphs.map((p) => (
                  <p key={p.slice(0, 40)} className="body-lg text-ink/75">
                    {p}
                  </p>
                ))}
              </div>
            </EditorialRow>
          </Reveal>
        </Container>
      </section>

      <FaqSection
        id="faq-title"
        anchor="faq"
        intro={faqIntro}
        items={faqs}
        className="border-t border-ink/15"
      />

      <ClosingCTA />
    </>
  );
}
