import {
  ClosingCTA,
  Marquee,
  ProcessStrip,
  StatementBand,
} from "@/components/bands";
import { Hero } from "@/components/sections/hero";
import { Comparison } from "@/components/sections/comparison";
import { TwoJobs } from "@/components/sections/two-jobs";
import { ExhibitSection } from "@/components/sections/exhibit-section";
import { OpportunityModelExhibit } from "@/components/sections/opportunity-model";
import { QuarterPlanExhibit } from "@/components/sections/quarter-plan";
import { Section } from "@/components/sections/section";
import { CaseCards } from "@/components/sections/case-cards";
import { SaleValue } from "@/components/sections/sale-value";
import { FaqSection } from "@/components/sections/faq";
import { ownershipBand, processSteps } from "@/content/site";
import { pickFaqs } from "@/content/faq";
import { cases, homeIntro, labels } from "@/content/results";
import {
  comparison,
  faqIntro,
  faqQuestions,
  hero,
  marquee,
  opportunity,
  path,
  quarterPlan,
  sale,
  twoJobs,
} from "@/content/home";

export default function Home() {
  return (
    <>
      {/* 1. Hero */}
      <Hero copy={hero} />

      {/* 2. Capability ticker */}
      <Marquee items={marquee} />

      {/* 3. The problem, as a comparison of the ways to get AI done */}
      <Comparison id="problem-title" copy={comparison} />

      {/* 4. Two jobs, strategy and engineering, in one ink panel */}
      <TwoJobs id="two-jobs-title" copy={twoJobs} />

      {/* 5. How we choose projects, with the Opportunity Model */}
      <ExhibitSection
        id="opportunity-title"
        eyebrow={opportunity.eyebrow}
        title={opportunity.title}
        body={opportunity.body}
        tone="paper-2"
      >
        <OpportunityModelExhibit copy={opportunity.exhibit} />
      </ExhibitSection>

      {/* 6. The Quarter Plan, the site's signature exhibit */}
      <ExhibitSection
        id="quarter-plan-title"
        eyebrow={quarterPlan.eyebrow}
        title={quarterPlan.title}
        body={[quarterPlan.body]}
        link={quarterPlan.link}
        reverse
      >
        <QuarterPlanExhibit copy={quarterPlan.exhibit} />
      </ExhibitSection>

      {/* 7. From first call to handover */}
      <Section id="path-title" intro={path}>
        <ProcessStrip steps={processSteps} />
      </Section>

      {/* 8. Results */}
      <CaseCards id="results-title" intro={homeIntro} labels={labels} items={cases} />

      {/* 9. Planning a sale */}
      <SaleValue id="sale-title" copy={sale} />

      {/* 10. Ownership */}
      <StatementBand copy={ownershipBand} />

      {/* 11. Closing */}
      <FaqSection id="faq-title" intro={faqIntro} items={pickFaqs(faqQuestions)} />
      <ClosingCTA />
    </>
  );
}
