import Link from "next/link";
import { Container, SectionHeader } from "@/components/primitives";
import { TextLink } from "@/components/cta";
import { Reveal } from "@/components/reveal";
import type { LinkCard, SectionIntro } from "@/content/types";

/** Numbered full-width link rows that invert to ink on hover. */
export function LinkRows({
  id,
  intro,
  items,
}: {
  id: string;
  intro: SectionIntro;
  items: LinkCard[];
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
        <div className="mt-14 border-t border-ink/20">
          {items.map((card, i) => (
            <Reveal key={card.href} delay={i * 60}>
              <Link
                href={card.href}
                className="group grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-2 border-b border-ink/20 py-7 transition-all duration-300 hover:bg-ink hover:px-6 hover:text-paper sm:grid-cols-[64px_minmax(0,1.1fr)_minmax(0,1fr)_40px] sm:gap-8"
              >
                <span className="font-mono text-sm text-blue sm:col-start-1">
                  [{String(i + 1).padStart(2, "0")}]
                </span>
                <h3 className="display-2 col-span-2 sm:col-span-1">
                  {card.title}
                </h3>
                <p className="body-md col-span-2 text-ink/70 group-hover:text-paper/65 sm:col-span-1">
                  {card.desc}
                </p>
                <span
                  aria-hidden="true"
                  className="hidden text-right font-display text-2xl sm:block"
                >
                  &#8599;
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
