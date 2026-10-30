import Image from "next/image";
import { LogoMark } from "@/components/logo";
import { Container, SectionHeader } from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import type { SectionIntro } from "@/content/types";

export interface TeamMember {
  name: string;
  role: string;
  bio: string[];
  backgroundLabel?: string;
  /** Renders only when present. */
  background?: string[];
  photoAlt: string;
  /** Set when the real headshot lands in public/team/. */
  photo?: { src: string; width: number; height: number };
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("");
}

/**
 * The people on every engagement. One column per person with a headshot,
 * role, short bio, and background list. Until a headshot exists, an ink panel
 * with initials stands in at the same size.
 */
export function TeamSection({
  id,
  intro,
  members,
}: {
  /** Heading id, used for aria-labelledby. */
  id: string;
  intro: SectionIntro;
  members: TeamMember[];
}) {
  return (
    <section aria-labelledby={id} className="border-t border-ink/15">
      <Container className="py-24 lg:py-32">
        <Reveal>
          <SectionHeader
            eyebrow={intro.eyebrow}
            title={<span id={id}>{intro.title}</span>}
          />
        </Reveal>
        <ul className="mt-16 grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-10 lg:gap-16">
          {members.map((m, i) => (
            <li key={m.name}>
              <Reveal delay={i * 80}>
                <article aria-label={m.name}>
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[5px] bg-ink">
                    {m.photo ? (
                      <Image
                        src={m.photo.src}
                        width={m.photo.width}
                        height={m.photo.height}
                        alt={m.photoAlt}
                        className="h-full w-full object-cover"
                        sizes="(min-width: 768px) 40vw, 100vw"
                      />
                    ) : (
                      <div className="flex h-full flex-col justify-between p-8 text-paper">
                        <LogoMark
                          width={260}
                          className="pointer-events-none absolute -bottom-10 -right-12 text-paper/6"
                        />
                        <span className="font-mono text-sm text-lime">[ {m.role} ]</span>
                        <span
                          aria-hidden="true"
                          className="font-display text-[7rem] font-medium leading-none tracking-[-0.05em] text-paper/90"
                        >
                          {initials(m.name)}
                        </span>
                      </div>
                    )}
                  </div>
                  <h3 className="mt-8 font-display text-2xl font-medium tracking-tight">
                    {m.name}
                  </h3>
                  <p className="label-mono-sm mt-2 text-ink/70">{m.role}</p>
                  <div className="mt-6 max-w-xl space-y-4">
                    {m.bio.map((p) => (
                      <p key={p.slice(0, 40)} className="body-md text-ink/75">
                        {p}
                      </p>
                    ))}
                  </div>
                  {m.background && m.background.length > 0 && (
                    <>
                      <p className="label-mono-sm mt-8 text-ink/70">
                        {m.backgroundLabel}
                      </p>
                      <ul className="mt-4 border-t border-ink/20">
                        {m.background.map((d, j) => (
                          <li
                            key={d}
                            className="flex items-baseline gap-4 border-b border-ink/20 py-4"
                          >
                            <span className="font-mono text-sm text-blue-2">
                              [{String(j + 1).padStart(2, "0")}]
                            </span>
                            <span className="font-display text-lg font-medium tracking-tight">
                              {d}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
