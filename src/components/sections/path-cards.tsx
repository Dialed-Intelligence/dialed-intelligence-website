import { LogoMark } from "@/components/logo";
import { Container, SectionHeader } from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import type { SectionIntro, TitledText } from "@/content/types";

/**
 * Two-column grid of numbered option cards. The last card renders on ink as
 * the answer to the options before it.
 */
export function PathCards({
  id,
  intro,
  items,
}: {
  /** Heading id, used for aria-labelledby. */
  id: string;
  intro: SectionIntro;
  items: TitledText[];
}) {
  const last = items.length - 1;
  return (
    <section aria-labelledby={id}>
      <Container className="py-24 lg:py-32">
        <Reveal>
          <SectionHeader
            eyebrow={intro.eyebrow}
            title={<span id={id}>{intro.title}</span>}
          />
        </Reveal>
        <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 80} className="flex">
              {i === last ? (
                <article className="relative flex flex-col overflow-hidden rounded-[5px] bg-ink p-8 text-paper lg:p-10">
                  <LogoMark
                    width={220}
                    className="pointer-events-none absolute -bottom-12 -right-10 text-paper/6"
                  />
                  <span className="font-mono text-sm text-lime">
                    [{String(i + 1).padStart(2, "0")}]
                  </span>
                  <h3 className="display-3 relative mt-14 lg:mt-20">
                    {item.title}
                  </h3>
                  <p className="body-md relative mt-4 text-paper/70">
                    {item.body}
                  </p>
                </article>
              ) : (
                <article className="flex flex-col rounded-[5px] border border-ink/15 bg-paper-2 p-8 lg:p-10">
                  <span className="font-mono text-sm text-blue-2">
                    [{String(i + 1).padStart(2, "0")}]
                  </span>
                  <h3 className="display-3 mt-14 lg:mt-20">{item.title}</h3>
                  <p className="body-md mt-4 text-ink/75">{item.body}</p>
                </article>
              )}
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
