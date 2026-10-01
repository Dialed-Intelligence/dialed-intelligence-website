import { Container, Eyebrow } from "@/components/primitives";
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
import { Section } from "@/components/sections/section";
import { NumberedGrid } from "@/components/sections/numbered-grid";
import { QuarterPlanExhibit } from "@/components/sections/quarter-plan";
import { CaseCards } from "@/components/sections/case-cards";
import { LeadProfile } from "@/components/sections/lead-profile";
import { FaqSection } from "@/components/sections/faq";
import { ownershipBand, processSteps } from "@/content/site";
import { pickFaqs } from "@/content/faq";
import { cases, homeIntro, labels } from "@/content/results";
import {
  faqIntro,
  faqQuestions,
  hero,
  lead,
  marquee,
  path,
  problem,
  quarterPlan,
  role,
} from "@/content/home";

export default function Home() {
  return (
    <>
      {/* 1. Hero */}
      <Hero copy={hero} />

      {/* 2. Capability ticker */}
      <Marquee items={marquee} />

      {/* 3. The problem */}
      <PathCards id="problem-title" intro={problem.intro} items={problem.items} />

      {/* 4. What the role covers */}
      <Section id="role-title" intro={role.intro}>
        <NumberedGrid items={role.items} cols={3} />
      </Section>

      {/* 5. The Quarter Plan, the site's signature exhibit */}
      <section aria-labelledby="quarter-plan-title" className="border-t border-ink/15 bg-paper-2/60">
        <Container className="py-24 lg:py-32">
          <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
            <Reveal className="lg:sticky lg:top-28">
              <Eyebrow>{quarterPlan.eyebrow}</Eyebrow>
              <h2 id="quarter-plan-title" className="display-1 mt-5">
                {quarterPlan.title}
              </h2>
              <p className="body-lg mt-6 max-w-xl text-ink/75">{quarterPlan.body}</p>
              <div className="mt-8">
                <TextLink href={quarterPlan.link.href}>{quarterPlan.link.label}</TextLink>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <QuarterPlanExhibit copy={quarterPlan.exhibit} />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 6. From first call to handover */}
      <Section id="path-title" intro={path}>
        <ProcessStrip steps={processSteps} />
      </Section>

      {/* 7. Results */}
      <CaseCards id="results-title" intro={homeIntro} labels={labels} items={cases} />

      {/* 8. Ownership */}
      <StatementBand copy={ownershipBand} />

      {/* 9. Who you get */}
      <LeadProfile id="lead-title" copy={lead} />

      {/* 10. Closing */}
      <FaqSection
        id="faq-title"
        intro={faqIntro}
        items={pickFaqs(faqQuestions)}
        className="border-t border-ink/15"
      />
      <ClosingCTA />
    </>
  );
}
