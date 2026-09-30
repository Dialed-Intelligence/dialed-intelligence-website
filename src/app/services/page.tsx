import { services } from "@/content/services";
import { ClosingCTA } from "@/components/bands";
import { PageHeader } from "@/components/sections/page-header";
import { Deliverables } from "@/components/sections/deliverables";
import { LinkRows } from "@/components/sections/link-rows";
import { pageMetadata } from "@/lib/meta";
import { groups, header, meta, systems } from "@/content/services-hub";

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

      <Deliverables groups={groups} />

      <div className="pt-10">
        <LinkRows
          id="systems-title"
          intro={systems}
          items={services.map((s) => ({
            href: `/services/${s.slug}`,
            title: s.title,
            desc: s.card,
          }))}
        />
      </div>

      <ClosingCTA />
    </>
  );
}
