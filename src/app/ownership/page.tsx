import { LogoMark } from "@/components/logo";
import { Container, Eyebrow, Index } from "@/components/primitives";
import { ClosingCTA } from "@/components/bands";
import { Reveal } from "@/components/reveal";
import { FaqSection } from "@/components/sections/faq";
import { pageMetadata } from "@/lib/meta";
import {
  argumentLabel,
  faqIntro,
  faqs,
  hero,
  meta,
  passages,
} from "@/content/ownership";

export const metadata = pageMetadata(meta);

// Local mirror of the editorial row, widened for display-2 headings.
function Passage({
  index,
  heading,
  body,
}: {
  index: number;
  heading: string;
  body: string;
}) {
  return (
    <div className="grid grid-cols-1 gap-x-16 gap-y-7 border-t border-ink/20 py-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:py-20">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <Index n={index} />
        <h3 className="display-2 mt-4 max-w-md">{heading}</h3>
      </div>
      <p className="body-lg max-w-2xl text-ink/75 lg:pt-1">{body}</p>
    </div>
  );
}

export default function OwnershipPage() {
  return (
    <>
      {/* Hero. The only page that opens dark. */}
      <section
        aria-labelledby="ownership-title"
        className="relative overflow-hidden bg-ink text-paper"
      >
        <LogoMark
          width={560}
          className="pointer-events-none absolute -bottom-24 -right-16 text-paper/5"
        />
        <Container className="relative pb-24 pt-20 lg:pb-36 lg:pt-28">
          <Eyebrow dark lime>
            {hero.eyebrow}
          </Eyebrow>
          <h1 id="ownership-title" className="display-hero mt-8">
            {hero.titleLines[0]}
            <br />
            <span className="text-lime">{hero.titleLines[1]}</span>
          </h1>
          <p className="body-lg mt-9 max-w-xl text-paper/65">{hero.subhead}</p>
        </Container>
      </section>

      {/* The argument */}
      <section aria-labelledby="argument-title">
        <h2 id="argument-title" className="sr-only">
          {argumentLabel}
        </h2>
        <Container className="pt-10 lg:pt-14">
          {passages.map((passage, i) => (
            <Reveal key={passage.title}>
              <Passage
                index={i + 1}
                heading={passage.title}
                body={passage.body}
              />
            </Reveal>
          ))}
        </Container>
      </section>

      <FaqSection
        id="faq-title"
        intro={faqIntro}
        items={faqs}
        className="mt-20 border-t border-ink/15 lg:mt-28"
      />

      <ClosingCTA />
    </>
  );
}
