import Link from "next/link";
import { Container, SectionHeader } from "@/components/primitives";
import { TextLink } from "@/components/cta";
import { Reveal } from "@/components/reveal";
import type { CaseLabels, CaseStudy, SectionIntro } from "@/content/types";

const resultsHref = "/results";

/**
 * Three-up case study cards in problem, build, result format. The optional
 * metric renders top right only when present, so quantified results can drop
 * in without a layout change.
 */
export function CaseCards({
  id,
  intro,
  labels,
  items,
}: {
  id: string;
  intro: SectionIntro;
  labels: CaseLabels;
  items: CaseStudy[];
}) {
  return (
    <section aria-labelledby={id} className="border-t border-ink/15">
      <Container className="py-24 lg:py-32">
        <Reveal>
          <SectionHeader
            eyebrow={intro.eyebrow}
            title={<span id={id}>{intro.title}</span>}
            right={
              intro.link && (
                <TextLink href={intro.link.href}>{intro.link.label}</TextLink>
              )
            }
          />
        </Reveal>
        <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {items.map((v, i) => (
            <Reveal key={v.client} delay={i * 80} className="flex">
              <article className="flex w-full flex-col rounded-[5px] border border-ink/15 bg-paper-2 p-8 lg:p-10">
                <div className="flex items-start justify-between gap-4">
                  <span className="font-mono text-sm text-blue">
                    [{String(i + 1).padStart(2, "0")}]
                  </span>
                  {v.metric && (
                    <span className="text-right font-display text-2xl font-medium leading-none tracking-tight text-blue">
                      {v.metric}
                    </span>
                  )}
                </div>
                <p className="label-mono-sm mt-10 text-ink/70">{v.client}</p>
                <p className="body-md mt-5 text-ink/75">
                  <span className="text-ink">{labels.problem} </span>
                  {v.problem}
                </p>
                <p className="body-md mt-3 text-ink/75">
                  <span className="text-ink">{labels.system} </span>
                  {v.system}
                </p>
                <p className="body-md mt-3 text-ink/75">
                  <span className="text-ink">{labels.outcome} </span>
                  {v.outcome}
                </p>
                {labels.more && (
                  <Link
                    href={`${resultsHref}#${v.slug}`}
                    className="label-mono-sm mt-auto inline-flex items-center gap-2 pt-8 text-ink transition-colors hover:text-blue"
                  >
                    {labels.more}
                    <span aria-hidden="true" className="font-sans">
                      &#8599;
                    </span>
                    <span className="sr-only">, {v.client}</span>
                  </Link>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
