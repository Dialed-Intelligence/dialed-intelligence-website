import { Container, Eyebrow } from "@/components/primitives";
import { noBreakHyphens } from "@/lib/typography";

/** Inner page header. Eyebrow with an optional aside, h1, optional subhead. */
export function PageHeader({
  id,
  eyebrow,
  aside,
  title,
  subhead,
  children,
}: {
  id: string;
  eyebrow: string;
  aside?: string;
  title: string;
  subhead?: string;
  /** Anything under the subhead, such as actions. */
  children?: React.ReactNode;
}) {
  return (
    <section aria-labelledby={id}>
      <Container className="pb-16 pt-16 lg:pb-20 lg:pt-24">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Eyebrow>{eyebrow}</Eyebrow>
          {aside && <span className="label-mono-sm text-ink/70">{aside}</span>}
        </div>
        <h1
          id={id}
          className="mt-8 max-w-5xl font-display text-[clamp(2.2rem,4.8vw,4.25rem)] font-medium leading-[1.02] tracking-[-0.03em] text-balance"
        >
          {noBreakHyphens(title)}
        </h1>
        {subhead && (
          <p className="body-lg mt-8 max-w-2xl text-ink/75">{subhead}</p>
        )}
        {children}
      </Container>
    </section>
  );
}
