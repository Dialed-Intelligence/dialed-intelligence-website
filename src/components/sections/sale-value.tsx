import { Container, Eyebrow } from "@/components/primitives";
import { TextLink } from "@/components/cta";
import { Reveal } from "@/components/reveal";
import type { LinkCopy } from "@/content/types";

export interface SaleValueCopy {
  eyebrow: string;
  title: string;
  body: string[];
  finePrint: string;
  link: LinkCopy;
  figure: {
    label: string;
    lines: { label: string; value: string }[];
    totalLabel: string;
    total: string;
  };
}

/**
 * For owners planning a sale. Text on the left, a worked illustration of
 * savings times an earnings multiple on the right.
 */
export function SaleValue({ id, copy }: { id: string; copy: SaleValueCopy }) {
  return (
    <section aria-labelledby={id} className="bg-paper-2">
      <Container className="py-24 lg:py-32">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <Eyebrow>{copy.eyebrow}</Eyebrow>
            <h2 id={id} className="display-1 mt-6">
              {copy.title}
            </h2>
            <div className="mt-8 max-w-[40rem] space-y-6">
              {copy.body.map((p) => (
                <p key={p.slice(0, 40)} className="body-lg text-ink/75">
                  {p}
                </p>
              ))}
            </div>
            <p className="mt-8 max-w-[40rem] border-l-2 border-blue pl-4 text-[0.9375rem] leading-relaxed text-ink/70">
              {copy.finePrint}
            </p>
            <div className="mt-8">
              <TextLink href={copy.link.href}>{copy.link.label}</TextLink>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <figure className="rounded-md bg-ink p-8 text-paper sm:p-12">
              <figcaption className="label-mono-sm text-lime">[ {copy.figure.label} ]</figcaption>
              <dl className="mt-8">
                {copy.figure.lines.map((line, i) => (
                  <div
                    key={line.label}
                    className="flex items-baseline justify-between gap-6 border-t border-paper/15 py-6"
                  >
                    <dt className="label-mono-sm text-paper/60">{line.label}</dt>
                    <dd className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-medium tracking-tight">
                      {i > 0 && (
                        <span aria-hidden="true" className="mr-3 text-lime">
                          &times;
                        </span>
                      )}
                      {line.value}
                    </dd>
                  </div>
                ))}
                <div className="border-t-2 border-paper/60 pt-6">
                  <dt className="label-mono-sm text-paper/60">{copy.figure.totalLabel}</dt>
                  <dd className="mt-4 font-display text-[clamp(2.5rem,5vw,4.25rem)] font-medium leading-none tracking-[-0.03em] text-lime">
                    {copy.figure.total}
                  </dd>
                </div>
              </dl>
            </figure>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
