import { LogoMark } from "@/components/logo";
import { Container, Eyebrow } from "@/components/primitives";
import { TextLink } from "@/components/cta";
import { Reveal } from "@/components/reveal";
import type { LinkCopy } from "@/content/types";

export interface TwoJobsCopy {
  eyebrow: string;
  title: string;
  /** Exactly two. The first renders light, the second dark. */
  jobs: { label: string; title: string; items: string[] }[];
  footnote: string;
  link: LinkCopy;
}

/**
 * Strategy and engineering as two halves of one engagement. A large ink
 * panel holding two cards, with a line under them on why one firm does both.
 */
export function TwoJobs({ id, copy }: { id: string; copy: TwoJobsCopy }) {
  return (
    <section aria-labelledby={id}>
      <Container className="pb-24 lg:pb-32">
        <div className="relative overflow-hidden rounded-md bg-ink px-6 py-16 text-paper sm:px-10 lg:px-16 lg:py-24">
          <LogoMark
            width={520}
            className="pointer-events-none absolute -right-24 -top-24 text-paper/4"
          />
          <Reveal className="relative max-w-3xl">
            <Eyebrow dark lime>
              {copy.eyebrow}
            </Eyebrow>
            <h2 id={id} className="display-1 mt-6 text-paper">
              {copy.title}
            </h2>
          </Reveal>

          <div className="relative mt-16 grid grid-cols-1 gap-4 lg:grid-cols-2">
            {copy.jobs.map((job, i) => {
              const light = i === 0;
              return (
                <Reveal key={job.label} delay={i * 80} className="flex">
                  <article
                    className={`flex w-full flex-col rounded-[5px] p-8 lg:p-12 ${
                      light ? "bg-paper text-ink" : "border border-paper/15 bg-ink-2 text-paper"
                    }`}
                  >
                    <span className={`font-mono text-sm ${light ? "text-blue-2" : "text-lime"}`}>
                      [{String(i + 1).padStart(2, "0")}] {job.label}
                    </span>
                    <h3 className="display-2 mt-8">{job.title}</h3>
                    <ul className={`mt-8 border-t ${light ? "border-ink/15" : "border-paper/15"}`}>
                      {job.items.map((item) => (
                        <li
                          key={item}
                          className={`flex items-baseline gap-4 border-b py-4 ${
                            light ? "border-ink/15" : "border-paper/15"
                          }`}
                        >
                          <span
                            aria-hidden="true"
                            className={`mt-[7px] size-[6px] shrink-0 ${light ? "bg-blue" : "bg-lime"}`}
                          />
                          <span className={`body-md ${light ? "text-ink/80" : "text-paper/80"}`}>
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="relative mt-16 flex flex-col gap-6 border-t border-paper/15 pt-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
            <p className="body-lg max-w-2xl text-paper/75">{copy.footnote}</p>
            <TextLink href={copy.link.href} dark className="shrink-0">
              {copy.link.label}
            </TextLink>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
