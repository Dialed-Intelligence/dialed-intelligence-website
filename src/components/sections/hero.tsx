import { Container, Eyebrow } from "@/components/primitives";
import { CTA, TextLink } from "@/components/cta";
import { MARK_PIECES, MARK_VIEWBOX } from "@/lib/brand";
import type { LinkCopy } from "@/content/types";

export interface HeroCopy {
  eyebrow: string;
  /** Headline lead, rendered in ink. */
  title: string;
  /** Optional closing clause, rendered in blue italic after the lead. */
  titleEmphasis?: string;
  subhead: string;
  primaryCta: LinkCopy & { event: string };
  secondaryLink: LinkCopy;
  /** Short proof points in the strip under the hero, two to four. */
  proofPoints: string[];
}

/**
 * The iD mark, built from its four quarters. On load each quarter slides in,
 * draws its outline, then fills. The mark is always one color. Pure CSS, so it costs no JavaScript.
 */
function AssemblingMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox={MARK_VIEWBOX}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`overflow-visible ${className}`}
    >
      {MARK_PIECES.map((d) => (
        <g key={d} className="di-piece">
          <path
            d={d}
            className="fill-ink stroke-ink/40"
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          />
        </g>
      ))}
    </svg>
  );
}

/** Keeps hyphenated words such as "full-time" from breaking across lines. */
function KeepHyphenated({ text }: { text: string }) {
  return text.split(" ").map((word, i) => (
    <span key={`${word}-${i}`}>
      {i > 0 && " "}
      {word.includes("-") ? <span className="whitespace-nowrap">{word}</span> : word}
    </span>
  ));
}

/**
 * Home hero. An oversized headline that rises in line by line, the iD mark
 * assembling beside it, and the proof points drawn in as a strip below.
 * As the visitor scrolls, the copy recedes and the mark drifts, where the
 * browser supports scroll timelines.
 */
export function Hero({ copy }: { copy: HeroCopy }) {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <Container className="relative flex min-h-[calc(100svh-69px)] flex-col pb-10 pt-14 lg:pt-20">
        <div className="di-hero-mark pointer-events-none absolute -right-16 top-24 hidden w-[36vw] max-w-[520px] md:block lg:right-0 lg:top-20">
          <AssemblingMark className="w-full" />
        </div>

        <div className="di-hero-copy relative md:max-w-[60vw] xl:max-w-[58vw] 2xl:max-w-[60rem]">
          <div className="di-fade-up" style={{ animationDelay: "0.1s" }}>
            <Eyebrow>{copy.eyebrow}</Eyebrow>
          </div>
          <h1
            id="hero-title"
            className="mt-4 font-display text-[clamp(3rem,7.4vw,7.5rem)] font-medium leading-[0.92] tracking-[-0.045em]"
          >
            <span className="di-mask">
              <span style={{ animationDelay: "0.1s" }}>{copy.title}</span>
            </span>
            {copy.titleEmphasis && (
              <span className="di-mask">
                <em className="text-blue" style={{ animationDelay: "0.25s" }}>
                  <KeepHyphenated text={copy.titleEmphasis} />
                </em>
              </span>
            )}
          </h1>
          <div
            className="di-fade-up mt-10 flex flex-col gap-10"
            style={{ animationDelay: "0.7s" }}
          >
            <p className="body-lg max-w-[36rem] text-ink/75">{copy.subhead}</p>
            <div className="flex shrink-0 flex-wrap items-center gap-x-8 gap-y-6">
              <CTA href={copy.primaryCta.href} event={copy.primaryCta.event}>
                {copy.primaryCta.label}
              </CTA>
              <TextLink href={copy.secondaryLink.href}>
                {copy.secondaryLink.label}
              </TextLink>
            </div>
          </div>
        </div>

        <div className="relative mt-auto pt-16">
          <div
            aria-hidden="true"
            className="di-draw-x h-px bg-ink/25"
            style={{ animationDelay: "0.9s" }}
          />
          <ul className="grid grid-cols-1 gap-x-8 gap-y-4 pt-6 sm:grid-cols-3">
            {copy.proofPoints.map((point, i) => (
              <li
                key={point}
                className="di-wipe flex items-baseline gap-4"
                style={{ animationDelay: `${1.1 + i * 0.2}s` }}
              >
                <span className="font-mono text-sm text-blue-2">
                  [{String(i + 1).padStart(2, "0")}]
                </span>
                <span className="font-display text-lg font-medium leading-snug tracking-tight">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
