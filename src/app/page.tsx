import { ClosingCTA, ProcessStrip } from "@/components/bands";
import { Hero } from "@/components/sections/hero";
import { Section } from "@/components/sections/section";
import { NumberedGrid } from "@/components/sections/numbered-grid";
import { TwoJobs } from "@/components/sections/two-jobs";
import { CaseCards } from "@/components/sections/case-cards";
import { SaleValue } from "@/components/sections/sale-value";
import { FaqSection } from "@/components/sections/faq";
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

      {/* 4. Why should I believe you? */}
      <CaseCards id="results-title" intro={homeIntro} labels={labels} items={cases} />

      {/* 5. What happens next? */}
      <Section id="how-it-starts-title" intro={howItStarts.intro}>
        <ProcessStrip steps={howItStarts.steps} />
      </Section>

      {/* 6. For owners planning a sale */}
      <SaleValue id="sale-title" copy={sale} />

      {/* 7. Questions, then the call */}
      <FaqSection id="faq-title" intro={faqIntro} items={pickFaqs(faqQuestions)} />
      <ClosingCTA />
    </>
  );
}
