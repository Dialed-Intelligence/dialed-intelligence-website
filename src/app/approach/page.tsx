import { Container, Eyebrow, Index, SectionHeader } from "@/components/primitives";
import { ClosingCTA } from "@/components/bands";
import { Reveal } from "@/components/reveal";
import { StageBlock } from "@/components/sections/stage-block";
import { pageMetadata } from "@/lib/meta";
import {
  header,
  meta,
  notIntro,
  notStatements,
  stageLabels,
  stages,
} from "@/content/approach";

export const metadata = pageMetadata(meta);

export default function ApproachPage() {
  return (
    <>
      {/* Header */}
      <section aria-labelledby="approach-title">
        <Container className="pb-16 pt-16 lg:pb-20 lg:pt-24">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Eyebrow>{header.eyebrow}</Eyebrow>
            <span className="label-mono-sm text-ink/70">{header.aside}</span>
          </div>
          <h1
            id="approach-title"
            className="mt-8 max-w-4xl font-display text-[clamp(2.3rem,4.6vw,4rem)] font-medium leading-[1.02] tracking-[-0.03em] text-balance"
          >
            {header.title}
          </h1>
          <p className="body-lg mt-8 max-w-2xl text-ink/75">{header.subhead}</p>
        </Container>
      </section>

      {/* The stages alternate sides. The last one closes the sequence on ink. */}
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

      {/* What we are not */}
      <section aria-labelledby="what-we-are-not-title">
        <Container className="py-24 lg:py-32">
          <Reveal>
            <SectionHeader
              eyebrow={notIntro.eyebrow}
              title={<span id="what-we-are-not-title">{notIntro.title}</span>}
            />
          </Reveal>
          <div className="mt-14 border-t border-ink/20">
            {notStatements.map((item, i) => (
              <Reveal key={item.opener} delay={i * 60}>
                <div className="grid grid-cols-1 items-baseline gap-x-8 gap-y-3 border-b border-ink/20 py-8 sm:grid-cols-[64px_minmax(0,1fr)_minmax(0,1.2fr)] lg:py-10">
                  <Index n={i + 1} />
                  <h3 className="display-3">{item.opener}</h3>
                  <p className="body-md max-w-xl text-ink/75">{item.rest}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <ClosingCTA />
    </>
  );
}
