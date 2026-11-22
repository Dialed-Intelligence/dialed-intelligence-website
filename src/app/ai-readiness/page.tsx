import { Container, Eyebrow } from "@/components/primitives";
import { ReadinessCheck } from "@/components/readiness-check";
import { header, meta } from "@/content/ai-readiness";
import { pageMetadata } from "@/lib/meta";
import { noBreakHyphens } from "@/lib/typography";

export const metadata = pageMetadata(meta);

export default function AiReadinessPage() {
  return (
    <section aria-labelledby="readiness-title">
      <Container className="pb-24 pt-16 lg:pb-32 lg:pt-24">
        <div className="grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <div>
            <Eyebrow>{header.eyebrow}</Eyebrow>
            <h1
              id="readiness-title"
              className="mt-8 font-display text-[clamp(2.4rem,5.5vw,4.25rem)] font-medium leading-[0.98] tracking-[-0.035em] text-balance"
            >
              {noBreakHyphens(header.title)}
            </h1>
            <p className="body-lg mt-8 max-w-xl text-ink/75">{header.subhead}</p>
            <p className="label-mono-sm mt-8 max-w-md text-ink/60">{header.promise}</p>
          </div>
          <ReadinessCheck />
        </div>
      </Container>
    </section>
  );
}
