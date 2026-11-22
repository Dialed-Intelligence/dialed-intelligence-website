import { ClosingCTA } from "@/components/bands";
import { Hero } from "@/components/sections/hero";
import { Section } from "@/components/sections/section";
import { NumberedGrid } from "@/components/sections/numbered-grid";
import { TwoJobs } from "@/components/sections/two-jobs";
import { CaseCards } from "@/components/sections/case-cards";
import { SaleValue } from "@/components/sections/sale-value";
import { FaqSection } from "@/components/sections/faq";
import { ExhibitSection } from "@/components/sections/exhibit-section";
import { OpportunityModelExhibit } from "@/components/sections/opportunity-model";
import { PinnedSteps } from "@/components/sections/pinned-steps";
import { opportunity } from "@/content/how-it-works";
import { pickFaqs } from "@/content/faq";
import { cases, homeIntro, labels } from "@/content/results";
import {
  faqIntro,
  faqQuestions,
  hero,
  howItStarts,
  problem,
  sale,
  twoJobs,
} from "@/content/home";

/**
 * The home page earns the call. Each section answers one question an owner
 * asks while skimming. Detail lives on How it works and What we deliver.
 */
export default function Home() {
  return (
    <>
      {/* 1. Is this for a business like mine? */}
      <Hero copy={hero} />

      {/* 2. Why can't I do this on my own? */}
      <Section id="problem-title" intro={problem.intro}>
        <NumberedGrid items={problem.items} cols={3} />
      </Section>

      {/* 3. What do I get? */}
      <TwoJobs id="two-jobs-title" copy={twoJobs} />

      {/* 3b. How do you decide what to build? A live Opportunity Model. */}
      <ExhibitSection
        id="opportunity-title"
        eyebrow={opportunity.eyebrow}
        title={opportunity.title}
        body={[opportunity.body[0]]}
        link={{ label: "How it works", href: "/how-it-works#opportunity-model" }}
        tone="paper-2"
      >
        <OpportunityModelExhibit copy={opportunity.exhibit} />
      </ExhibitSection>

      {/* 4. Why should I believe you? */}
      <CaseCards id="results-title" intro={homeIntro} labels={labels} items={cases} />

      {/* 5. What happens next? */}
      <PinnedSteps id="how-it-starts-title" intro={howItStarts.intro} steps={howItStarts.steps} />

      {/* 6. For owners planning a sale */}
      <SaleValue id="sale-title" copy={sale} />

      {/* 7. Questions, then the call */}
      <FaqSection id="faq-title" intro={faqIntro} items={pickFaqs(faqQuestions)} />
      <ClosingCTA />
    </>
  );
}
