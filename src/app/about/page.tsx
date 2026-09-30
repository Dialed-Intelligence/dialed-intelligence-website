import { Container, Eyebrow, Index, SectionHeader } from "@/components/primitives";
import { ClosingCTA } from "@/components/bands";
import { Reveal } from "@/components/reveal";
import { EditorialRow } from "@/components/sections/editorial-row";
import { TextSection } from "@/components/sections/text-section";
import { pageMetadata } from "@/lib/meta";
import {
  firm,
  header,
  meta,
  principles,
  principlesIntro,
  story,
} from "@/content/about";

export const metadata = pageMetadata(meta);

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <section aria-labelledby="about-title">
        <Container className="pb-16 pt-16 lg:pb-20 lg:pt-24">
          <Eyebrow>{header.eyebrow}</Eyebrow>
          <h1
            id="about-title"
            className="mt-8 max-w-5xl font-display text-[clamp(2.2rem,4.8vw,4.25rem)] font-medium leading-[1.02] tracking-[-0.03em] text-balance"
          >
            {header.title}
          </h1>
        </Container>
      </section>

      {/* The firm's story */}
      <section aria-labelledby="story-title">
        <Container>
          <Reveal>
            <EditorialRow label={story.label} index="01" headingId="story-title">
              <div className="max-w-2xl space-y-6">
                {story.paragraphs.map((p) => (
                  <p key={p.slice(0, 40)} className="body-lg text-ink/75">
                    {p}
                  </p>
                ))}
              </div>
            </EditorialRow>
          </Reveal>
        </Container>
      </section>

      {/* Principles */}
      <section aria-labelledby="principles-title" className="border-t border-ink/15">
        <Container className="py-24 lg:py-32">
          <Reveal>
            <SectionHeader
              eyebrow={principlesIntro.eyebrow}
              title={<span id="principles-title">{principlesIntro.title}</span>}
            />
          </Reveal>
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={(i % 2) * 80} className="flex">
                <div
                  className={`flex w-full flex-col border-t border-ink/20 py-10 lg:py-12 ${
                    i % 2 === 1 ? "sm:border-l sm:border-ink/20 sm:pl-10" : "sm:pr-10"
                  }`}
                >
                  <Index n={i + 1} />
                  <h3 className="display-3 mt-12 lg:mt-16">{p.title}</h3>
                  <p className="body-md mt-4 max-w-md text-ink/75">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <TextSection id="firm-title" {...firm} />

      <ClosingCTA />
    </>
  );
}
