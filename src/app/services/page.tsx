import { services } from "@/content/services";
import { ClosingCTA, ProcessStrip, StatementBand } from "@/components/bands";
import { PageHeader } from "@/components/sections/page-header";
import { Deliverables } from "@/components/sections/deliverables";
import { Section } from "@/components/sections/section";
import { LinkRows } from "@/components/sections/link-rows";
import { pageMetadata } from "@/lib/meta";
import { ownershipBand } from "@/content/site";
import {
  groups,
  header,
  meta,
  engagementSteps,
  systemBuildPrefix,
  systems,
} from "@/content/services-hub";

export const metadata = pageMetadata(meta);

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        id="services-title"
        eyebrow={header.eyebrow}
        title={header.title}
        subhead={header.intro}
      />

      {/* What the role delivers, in three parts */}
      <Deliverables groups={groups} />

      {/* How an engagement runs, with what you keep at each step */}
      <div className="pt-10">
        <Section id="process-title" anchor="process" intro={engagementSteps.intro}>
          <ProcessStrip steps={engagementSteps.steps} />
        </Section>
      </div>

      {/* The systems, each with its own page */}
      <LinkRows
        id="systems-title"
        intro={systems}
        items={services.map((s) => ({
          href: `/services/${s.slug}`,
          title: s.title,
          desc: s.card,
          meta: `${systemBuildPrefix} ${s.engagement.duration.toLowerCase()}`,
        }))}
      />

      <StatementBand id="ownership" copy={ownershipBand} />

      <ClosingCTA />
    </>
  );
}
