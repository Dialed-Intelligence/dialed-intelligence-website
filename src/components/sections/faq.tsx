import { Container, Index, SectionHeader } from "@/components/primitives";
import { TextLink } from "@/components/cta";
import { Reveal } from "@/components/reveal";
import type { Faq, SectionIntro } from "@/content/types";

/** Numbered FAQ on native details/summary, keyboard accessible without JS. */
export function FaqSection({
  id,
  intro,
  items,
  className = "",
  anchor,
}: {
  id: string;
  /** Section id for in-page links, e.g. "faq". */
  anchor?: string;
  intro: SectionIntro;
  items: Faq[];
  className?: string;
}) {
  return (
    <section id={anchor} aria-labelledby={id} className={`scroll-mt-20 ${className}`}>
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
        <div className="mt-14 border-b border-ink/20">
          {items.map((faq, i) => (
            <details key={faq.question} className="group border-t border-ink/20">
              <summary className="flex cursor-pointer list-none items-baseline gap-4 py-7 transition-all duration-300 hover:bg-ink hover:px-5 hover:text-paper lg:py-8 [&::-webkit-details-marker]:hidden">
                <span className="w-12 shrink-0 sm:w-16">
                  <Index n={i + 1} />
                </span>
                <h3 className="display-3 flex-1 pr-2">{faq.question}</h3>
                <span
                  aria-hidden="true"
                  className="inline-block select-none font-display text-2xl font-medium leading-none transition-transform duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <div className="pb-10 sm:pl-20 lg:pb-12">
                <p className="body-lg max-w-2xl text-ink/70">{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
