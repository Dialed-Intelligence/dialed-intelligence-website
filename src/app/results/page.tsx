import { Container } from "@/components/primitives";
import { ClosingCTA } from "@/components/bands";
import { Reveal } from "@/components/reveal";
import { PageHeader } from "@/components/sections/page-header";
import { pageMetadata } from "@/lib/meta";
import { cases, header, labels, meta } from "@/content/results";
import type { CaseStudyFull } from "@/content/types";

export const metadata = pageMetadata(meta);

function Block({ label, paragraphs }: { label: string; paragraphs: string[] }) {
  return (
    <div>
      <p className="label-mono-sm text-ink/70">{label}</p>
      <div className="mt-4 space-y-4">
        {paragraphs.map((p) => (
          <p key={p.slice(0, 40)} className="body-lg text-ink/80">
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}

function CaseStudy({ study, index }: { study: CaseStudyFull; index: number }) {
  const titleId = `${study.slug}-title`;
  return (
    <article
      id={study.slug}
      aria-labelledby={titleId}
      className="scroll-mt-20 border-t border-ink/20 py-16 lg:py-24"
    >
      <Reveal>
        <div className="grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-[320px_minmax(0,1fr)]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="flex items-start justify-between gap-4">
              <span className="font-mono text-sm text-blue-2">
                [{String(index + 1).padStart(2, "0")}]
              </span>
              {study.metric && (
                <span className="text-right font-display text-3xl font-medium leading-none tracking-tight text-blue">
                  {study.metric}
                </span>
              )}
            </div>
            <h2 id={titleId} className="display-2 mt-6">
              {study.client}
            </h2>
            <p className="label-mono-sm mt-6 text-ink/70">{labels.role}</p>
            <p className="mt-2 font-display text-lg font-medium tracking-tight">
              {study.role}
            </p>
          </div>
          <div className="max-w-2xl space-y-10">
            <Block label={labels.context} paragraphs={study.context} />
            <Block label={labels.build} paragraphs={study.build} />
            <Block label={labels.result} paragraphs={study.result} />
            <p className="border-l-2 border-blue pl-6 font-display text-xl font-medium leading-snug tracking-tight">
              <span className="label-mono-sm mb-3 block text-ink/70">
                {labels.owns}
              </span>
              {study.owns}
            </p>
          </div>
        </div>
      </Reveal>
    </article>
  );
}

export default function ResultsPage() {
  return (
    <>
      <PageHeader
        id="results-title"
        eyebrow={header.eyebrow}
        title={header.title}
        subhead={header.subhead}
      />
      <Container className="pb-20 lg:pb-28">
        {cases.map((study, i) => (
          <CaseStudy key={study.slug} study={study} index={i} />
        ))}
      </Container>
      <ClosingCTA />
    </>
  );
}
