import Image from "next/image";
import { LogoMark } from "@/components/logo";
import { Container, Eyebrow } from "@/components/primitives";
import { TextLink } from "@/components/cta";
import { Reveal } from "@/components/reveal";
import type { LinkCopy } from "@/content/types";

export interface LeadCopy {
  eyebrow: string;
  title: string;
  name: string;
  roleTitle: string;
  body: string;
  backgroundLabel: string;
  background: string[];
  link?: LinkCopy;
  photoAlt: string;
}

/** Set when the real photograph lands in public/. Natural light, no studio. */
const leadPhoto: { src: string; width: number; height: number } | null =
  null;

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("");
}

/**
 * The lead in the seat. Photograph on one side, name, background, and a short
 * bio on the other. Until the photo exists, an ink panel with initials stands
 * in, so the layout does not change when it arrives.
 */
export function LeadProfile({
  id,
  copy,
  extra,
}: {
  id: string;
  copy: LeadCopy;
  /** Extra paragraphs under the bio, e.g. the longer About page version. */
  extra?: string[];
}) {
  return (
    <section aria-labelledby={id} className="border-t border-ink/15">
      <Container className="py-24 lg:py-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <Reveal>
            <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-[5px] bg-ink">
              {leadPhoto ? (
                <Image
                  src={leadPhoto.src}
                  width={leadPhoto.width}
                  height={leadPhoto.height}
                  alt={copy.photoAlt}
                  className="h-full w-full object-cover"
                  sizes="(min-width: 1024px) 28rem, 100vw"
                />
              ) : (
                <div className="flex h-full flex-col justify-between p-8 text-paper">
                  <LogoMark
                    width={260}
                    className="pointer-events-none absolute -bottom-10 -right-12 text-paper/6"
                  />
                  <span className="font-mono text-sm text-lime">[ {copy.roleTitle} ]</span>
                  <span
                    aria-hidden="true"
                    className="font-display text-[7rem] font-medium leading-none tracking-[-0.05em] text-paper/90"
                  >
                    {initials(copy.name)}
                  </span>
                </div>
              )}
            </div>
          </Reveal>
          <Reveal delay={100}>
            <Eyebrow>{copy.eyebrow}</Eyebrow>
            <h2 id={id} className="display-1 mt-5">
              {copy.title}
            </h2>
            <p className="mt-8 font-display text-2xl font-medium tracking-tight">
              {copy.name}
            </p>
            <p className="label-mono-sm mt-2 text-ink/70">{copy.roleTitle}</p>
            <div className="mt-6 max-w-xl space-y-5">
              {[copy.body, ...(extra ?? [])].map((p) => (
                <p key={p.slice(0, 40)} className="body-lg text-ink/75">
                  {p}
                </p>
              ))}
            </div>
            <p className="label-mono-sm mt-10 text-ink/70">{copy.backgroundLabel}</p>
            <ul className="mt-4 border-t border-ink/20">
              {copy.background.map((d, i) => (
                <li
                  key={d}
                  className="flex items-baseline gap-5 border-b border-ink/20 py-4"
                >
                  <span className="font-mono text-sm text-blue">
                    [{String(i + 1).padStart(2, "0")}]
                  </span>
                  <span className="font-display text-lg font-medium tracking-tight">
                    {d}
                  </span>
                </li>
              ))}
            </ul>
            {copy.link && (
              <div className="mt-8">
                <TextLink href={copy.link.href}>{copy.link.label}</TextLink>
              </div>
            )}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
