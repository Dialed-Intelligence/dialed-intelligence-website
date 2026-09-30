import { Container, Eyebrow, SectionHeader } from "@/components/primitives";
import { TextLink } from "@/components/cta";
import {
  ClosingCTA,
  Marquee,
  ProcessStrip,
  StatementBand,
} from "@/components/bands";
import { Reveal } from "@/components/reveal";
import { Hero } from "@/components/sections/hero";
import { PathCards } from "@/components/sections/path-cards";
import { LinkRows } from "@/components/sections/link-rows";
import { CaseCards } from "@/components/sections/case-cards";
import { TextSection } from "@/components/sections/text-section";
import { ownershipBand, processSteps } from "@/content/site";
import {
  credibility,
  engagement,
  hero,
  marquee,
  onRamp,
  paths,
  proof,
  whatWeBuild,
} from "@/content/home";

export default function Home() {
  return (
    <>
      <Hero copy={hero} />

      <Marquee items={marquee} />

      <PathCards id="third-option-title" intro={paths.intro} items={paths.items} />

      <LinkRows
        id="what-we-build-title"
        intro={whatWeBuild.intro}
        items={whatWeBuild.items}
      />

      <CaseCards
        id="proof-title"
        intro={proof.intro}
        labels={proof.labels}
        items={proof.items}
      />

      <StatementBand copy={ownershipBand} />

      <TextSection id="consulting-onramp-title" {...onRamp} />

      {/* How an engagement works */}
      <section aria-labelledby="engagement-title">
        <Container className="py-24 lg:py-32">
          <Reveal>
            <SectionHeader
              eyebrow={engagement.eyebrow}
              title={<span id="engagement-title">{engagement.title}</span>}
              right={
                engagement.link && (
                  <TextLink href={engagement.link.href}>
                    {engagement.link.label}
                  </TextLink>
                )
              }
            />
          </Reveal>
          <div className="mt-14">
            <ProcessStrip steps={processSteps} />
          </div>
        </Container>
      </section>

      {/* Credibility strip. Becomes result cards with hard numbers as case
          studies land. Keep the section shell when swapping content. */}
      <section aria-labelledby="credibility-title" className="border-t border-ink/15">
        <Container className="py-24 lg:py-32">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
            <Reveal>
              <Eyebrow>{credibility.eyebrow}</Eyebrow>
              <h2 id="credibility-title" className="display-2 mt-6 max-w-2xl text-balance">
                {credibility.title}
              </h2>
              <p className="body-lg mt-6 max-w-xl text-ink/75">
                {credibility.body}
              </p>
              <div className="mt-8">
                <TextLink href={credibility.link.href}>
                  {credibility.link.label}
                </TextLink>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <ul className="border-t border-ink/20">
                {credibility.disciplines.map((d, i) => (
                  <li
                    key={d}
                    className="flex items-baseline gap-5 border-b border-ink/20 py-5"
                  >
                    <span className="font-mono text-sm text-blue">
                      [{String(i + 1).padStart(2, "0")}]
                    </span>
                    <span className="font-display text-xl font-medium tracking-tight">
                      {d}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      <ClosingCTA />
    </>
  );
}
