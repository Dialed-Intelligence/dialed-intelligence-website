import { Container, Eyebrow } from "@/components/primitives";
import { TextLink } from "@/components/cta";
import { Reveal } from "@/components/reveal";
import type { LinkCopy } from "@/content/types";

/**
 * Split section with text on one side and a document exhibit on the other.
 * The text column sticks while the exhibit scrolls on wide screens.
 * `reverse` puts the exhibit on the left, so two in a row alternate.
 */
export function ExhibitSection({
  id,
  anchor,
  eyebrow,
  title,
  body,
  link,
  reverse = false,
  tone = "paper",
  children,
}: {
  /** Heading id, used for aria-labelledby. */
  id: string;
  anchor?: string;
  eyebrow: string;
  title: string;
  body: string[];
  link?: LinkCopy;
  reverse?: boolean;
  tone?: "paper" | "paper-2";
  /** The exhibit. */
  children: React.ReactNode;
}) {
  return (
    <section
      id={anchor}
      aria-labelledby={id}
      className={`scroll-mt-20 ${tone === "paper-2" ? "bg-paper-2" : "border-t border-ink/15"}`}
    >
      <Container className="py-24 lg:py-32">
        <div
          className={`grid grid-cols-1 items-start gap-16 lg:gap-20 ${
            reverse
              ? "lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]"
              : "lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]"
          }`}
        >
          <Reveal className={`lg:sticky lg:top-28 ${reverse ? "lg:order-2" : ""}`}>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 id={id} className="display-1 mt-6">
              {title}
            </h2>
            <div className="mt-8 max-w-[40rem] space-y-6">
              {body.map((p) => (
                <p key={p.slice(0, 40)} className="body-lg text-ink/75">
                  {p}
                </p>
              ))}
            </div>
            {link && (
              <div className="mt-8">
                <TextLink href={link.href}>{link.label}</TextLink>
              </div>
            )}
          </Reveal>
          <Reveal delay={100} className={reverse ? "lg:order-1" : ""}>
            {children}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
