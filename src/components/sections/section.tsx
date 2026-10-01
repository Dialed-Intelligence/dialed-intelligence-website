import { Container, SectionHeader } from "@/components/primitives";
import { TextLink } from "@/components/cta";
import { Reveal } from "@/components/reveal";
import type { SectionIntro } from "@/content/types";

/**
 * Standard section shell. Hairline on top, section header with an optional
 * right-side link, then the content.
 */
export function Section({
  id,
  intro,
  anchor,
  border = true,
  lead,
  children,
}: {
  /** Optional paragraph under the header. */
  lead?: string;
  /** Heading id, used for aria-labelledby. */
  id: string;
  intro: SectionIntro;
  /** Section id for in-page links, e.g. "faq". */
  anchor?: string;
  border?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={anchor}
      aria-labelledby={id}
      className={`scroll-mt-20 ${border ? "border-t border-ink/15" : ""}`}
    >
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
          {lead && <p className="body-lg mt-6 max-w-2xl text-ink/75">{lead}</p>}
        </Reveal>
        <div className="mt-14">{children}</div>
      </Container>
    </section>
  );
}
