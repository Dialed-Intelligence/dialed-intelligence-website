import { LogoMark } from "./logo";
import { Container, Eyebrow } from "./primitives";
import { CTA, TextLink } from "./cta";
import { closingCta, ctaHref, ctaLabel } from "@/content/site";
import type { StatementBandCopy, Step } from "@/content/types";

/**
 * Closing CTA band. Lime, high contrast, used at the bottom of every page.
 */
export function ClosingCTA({
  eyebrow = closingCta.eyebrow,
  title = closingCta.title,
  body = closingCta.body,
  event = "cta_book_session",
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
  event?: string;
}) {
  return (
    <section aria-labelledby="closing-cta-title">
      <Container className="pb-20 pt-4 lg:pb-28">
        <div className="relative overflow-hidden rounded-md bg-lime px-7 py-14 text-ink sm:px-12 sm:py-16 lg:px-20 lg:py-24">
          <LogoMark
            width={460}
            className="pointer-events-none absolute -bottom-24 -right-16 text-ink/8"
          />
          <div className="relative max-w-2xl">
            <span className="label-mono text-ink/70">[ {eyebrow} ]</span>
            <h2
              id="closing-cta-title"
              className="mt-5 font-display text-[clamp(2.2rem,5vw,4.25rem)] font-medium leading-[0.98] tracking-[-0.03em] text-balance"
            >
              {title}
            </h2>
            <p className="body-lg mt-6 max-w-xl text-ink/75">{body}</p>
            <div className="mt-9">
              <CTA href={ctaHref} variant="ink" event={event}>
                {ctaLabel}
              </CTA>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/**
 * Statement band. Full-width ink, a two-line display headline with the second
 * line in lime, supporting copy and points on the right.
 */
export function StatementBand({
  copy,
  showLink = true,
}: {
  copy: StatementBandCopy;
  showLink?: boolean;
}) {
  return (
    <section aria-labelledby="ownership-band-title" className="bg-ink text-paper">
      <Container className="py-24 lg:py-36">
        <div className="grid grid-cols-1 items-end gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <Eyebrow dark lime>
              {copy.eyebrow}
            </Eyebrow>
            <h2
              id="ownership-band-title"
              className="mt-7 font-display text-[clamp(3rem,8vw,7rem)] font-medium leading-[0.95] tracking-[-0.035em]"
            >
              {copy.titleLines[0]}
              <br />
              <span className="text-lime">{copy.titleLines[1]}</span>
            </h2>
          </div>
          <div className="max-w-md lg:justify-self-end">
            <p className="body-lg text-paper/65">{copy.body}</p>
            <ul className="mt-7 flex flex-col gap-3 border-t border-paper/20 pt-6">
              {copy.points.map((point) => (
                <li key={point} className="flex items-baseline gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-[7px] size-[6px] shrink-0 bg-lime"
                  />
                  <span className="body-md text-paper/70">{point}</span>
                </li>
              ))}
            </ul>
            {showLink && copy.link && (
              <div className="mt-8">
                <TextLink href={copy.link.href} dark>
                  {copy.link.label}
                </TextLink>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

// Full literal class names so Tailwind generates them.
const processCols: Record<number, string> = {
  3: "xl:grid-cols-3",
  4: "xl:grid-cols-4",
  5: "xl:grid-cols-5",
};

/**
 * Numbered engagement strip. Three to five steps, one row on wide screens.
 */
export function ProcessStrip({
  steps,
  dark = false,
}: {
  steps: Step[];
  dark?: boolean;
}) {
  return (
    <ol
      className={`grid grid-cols-1 sm:grid-cols-2 ${processCols[steps.length] ?? "xl:grid-cols-4"}`}
    >
      {steps.map((step, i) => (
        <li
          key={step.title}
          className={`flex flex-col border-t px-0 py-8 sm:pr-8 xl:min-h-[300px] ${
            dark ? "border-paper/20" : "border-ink/20"
          }`}
        >
          <span className="font-mono text-sm text-blue">
            [{String(i + 1).padStart(2, "0")}]
          </span>
          <h3 className="display-3 mt-5">{step.title}</h3>
          <p
            className={`label-mono-sm mt-2 ${dark ? "text-paper/60" : "text-ink/70"}`}
          >
            {step.duration}
          </p>
          <p
            className={`body-md mt-4 max-w-sm ${dark ? "text-paper/60" : "text-ink/75"}`}
          >
            {step.body}
          </p>
        </li>
      ))}
    </ol>
  );
}

/**
 * Capabilities marquee strip. Decorative, duplicated content is aria-hidden,
 * animation disabled under prefers-reduced-motion.
 */
export function Marquee({ items }: { items: string[] }) {
  const row = (hidden: boolean) => (
    <div
      className="flex items-center"
      aria-hidden={hidden || undefined}
    >
      {items.map((item, i) => (
        <span
          key={`${item}-${i}`}
          className="flex items-center whitespace-nowrap pr-9 font-display text-[1.4rem] font-medium tracking-tight text-ink"
        >
          {item}
          <span aria-hidden="true" className="ml-9 text-[0.9rem] text-blue">
            &#9670;
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="overflow-hidden border-y border-ink/15 py-4">
      <div className="di-marquee-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
