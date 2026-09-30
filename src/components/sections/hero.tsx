import { LogoMark } from "@/components/logo";
import { Container, Eyebrow } from "@/components/primitives";
import { CTA, TextLink } from "@/components/cta";
import type { LinkCopy } from "@/content/types";

export interface HeroCopy {
  eyebrow: string;
  /** Headline lead, rendered in ink. */
  title: string;
  /** Closing clause, rendered in blue italic after the lead. */
  titleEmphasis: string;
  subhead: string;
  primaryCta: LinkCopy & { event: string };
  secondaryLink: LinkCopy;
  /** Short proof points under the fold line, two to four. */
  proofPoints: string[];
}

/** Home hero. Display headline, subhead, two actions, the mark, proof line. */
export function Hero({ copy }: { copy: HeroCopy }) {
  return (
    <section aria-labelledby="hero-title">
      <Container className="pb-14 pt-16 lg:pb-16 lg:pt-24">
        <Eyebrow>{copy.eyebrow}</Eyebrow>
        <div className="mt-9 grid grid-cols-1 items-end gap-12 lg:grid-cols-[minmax(0,1fr)_270px]">
          <div>
            <h1
              id="hero-title"
              className="font-display text-[clamp(2.6rem,6.4vw,5.5rem)] font-medium leading-[0.97] tracking-[-0.035em] text-balance"
            >
              {copy.title}{" "}
              <em className="text-blue">{copy.titleEmphasis}</em>
            </h1>
            <p className="body-lg mt-8 max-w-xl text-ink/75">{copy.subhead}</p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
              <CTA href={copy.primaryCta.href} event={copy.primaryCta.event}>
                {copy.primaryCta.label}
              </CTA>
              <TextLink href={copy.secondaryLink.href}>
                {copy.secondaryLink.label}
              </TextLink>
            </div>
          </div>
          <div className="hidden justify-end lg:flex">
            <LogoMark width={250} className="text-ink" />
          </div>
        </div>
        <ul className="mt-14 flex flex-wrap gap-x-10 gap-y-3 border-t border-ink/15 pt-6 lg:mt-16">
          {copy.proofPoints.map((point) => (
            <li key={point} className="flex items-center gap-3">
              <span aria-hidden="true" className="size-[6px] bg-blue" />
              <span className="label-mono-sm text-ink/70">{point}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
