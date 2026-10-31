import { LogoMark } from "@/components/logo";
import { Container, Eyebrow } from "@/components/primitives";
import { CTA, TextLink } from "@/components/cta";
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
  /** Short proof points in the side panel, two to four. */
  proofPoints: string[];
}

/** Home hero. Headline, subhead, and two actions, with the proof points in an ink panel. */
export function Hero({ copy }: { copy: HeroCopy }) {
  return (
    <section aria-labelledby="hero-title">
      <Container className="pb-16 pt-16 lg:pb-24 lg:pt-24">
        <Eyebrow>{copy.eyebrow}</Eyebrow>
        <div className="mt-8 grid grid-cols-1 items-end gap-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-16">
          <div>
            <h1
              id="hero-title"
              className="font-display text-[clamp(2.6rem,6.4vw,5.5rem)] font-medium leading-[0.97] tracking-[-0.035em] text-balance"
            >
              {copy.title}
              {copy.titleEmphasis && (
                <>
                  {" "}
                  <em className="text-blue">{copy.titleEmphasis}</em>
                </>
              )}
            </h1>
            <p className="body-lg mt-8 max-w-[40rem] text-ink/75">{copy.subhead}</p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-6">
              <CTA href={copy.primaryCta.href} event={copy.primaryCta.event}>
                {copy.primaryCta.label}
              </CTA>
              <TextLink href={copy.secondaryLink.href}>
                {copy.secondaryLink.label}
              </TextLink>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-md bg-ink p-8 text-paper">
            <LogoMark
              width={300}
              className="pointer-events-none absolute -right-16 -top-16 text-paper/6"
            />
            <LogoMark width={40} className="relative text-lime" />
            <ul className="relative mt-24 border-t border-paper/15 lg:mt-32">
              {copy.proofPoints.map((point, i) => (
                <li
                  key={point}
                  className="flex items-baseline gap-4 border-b border-paper/15 py-4"
                >
                  <span className="font-mono text-sm text-lime">
                    [{String(i + 1).padStart(2, "0")}]
                  </span>
                  <span className="font-display text-lg font-medium leading-snug tracking-tight">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
