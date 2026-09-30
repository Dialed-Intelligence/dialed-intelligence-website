import { LogoMark } from "@/components/logo";
import { Container } from "@/components/primitives";
import { Reveal } from "@/components/reveal";

export interface Stage {
  n: string;
  name: string;
  body: string;
  walkAway: string;
  duration: string;
  /** What we need from the client at this step. */
  needs?: string;
}

export interface StageLabels {
  /** e.g. "Step", rendered as "Step 01 of 05" */
  stage: string;
  of: string;
  whatHappens: string;
  walkAway: string;
  duration: string;
  needs?: string;
  /** Mono label shown under the name on the dark variant. */
  darkTag: string;
}

/**
 * One stage of an engagement. Oversized numeral and name on one side, what
 * happens, what you keep, and how long it takes on the other.
 */
export function StageBlock({
  stage,
  total,
  labels,
  flip = false,
  dark = false,
}: {
  stage: Stage;
  total: number;
  labels: StageLabels;
  flip?: boolean;
  dark?: boolean;
}) {
  const titleId = `stage-${stage.n}-title`;
  const accent = dark ? "text-lime" : "text-blue-2";
  const muted = dark ? "text-paper/60" : "text-ink/70";
  const bodyTone = dark ? "text-paper/70" : "text-ink/70";
  const hairline = dark ? "border-paper/20" : "border-ink/20";

  return (
    <section
      aria-labelledby={titleId}
      className={
        dark
          ? "relative overflow-hidden bg-ink text-paper"
          : "border-t border-ink/15"
      }
    >
      {dark && (
        <LogoMark
          width={520}
          className="pointer-events-none absolute -bottom-28 -right-20 hidden text-paper/4 lg:block"
        />
      )}
      <Container className={dark ? "py-20 lg:py-28" : "py-16 lg:py-20"}>
        <Reveal>
          <div className="grid grid-cols-1 items-start gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
            <div className={flip ? "lg:order-2" : ""}>
              <span
                aria-hidden="true"
                className={`block select-none font-display text-[6rem] font-medium leading-[0.8] tracking-[-0.04em] sm:text-[8rem] lg:text-[10rem] ${
                  dark ? "text-paper/10" : "text-ink/10"
                }`}
              >
                {stage.n}
              </span>
              <p className={`label-mono-sm mt-7 ${accent}`}>
                {labels.stage} {stage.n} {labels.of}{" "}
                {String(total).padStart(2, "0")}
              </p>
              <h2 id={titleId} className="display-1 mt-3">
                {stage.name}
              </h2>
              {dark && (
                <p className="label-mono mt-8 text-lime">[ {labels.darkTag} ]</p>
              )}
            </div>
            <div className={flip ? "lg:order-1" : ""}>
              <p className={`label-mono ${muted}`}>{labels.whatHappens}</p>
              <p className={`body-lg mt-5 max-w-2xl ${bodyTone}`}>
                {stage.body}
              </p>
              <dl
                className={`mt-10 grid grid-cols-1 gap-x-12 gap-y-8 border-t pt-7 sm:grid-cols-2 ${
                  stage.needs ? "xl:grid-cols-3 xl:gap-x-10" : ""
                } ${hairline}`}
              >
                <div>
                  <dt className={`label-mono-sm ${muted}`}>{labels.walkAway}</dt>
                  <dd className="mt-3 font-display text-lg font-medium leading-snug tracking-tight">
                    {stage.walkAway}
                  </dd>
                </div>
                <div>
                  <dt className={`label-mono-sm ${muted}`}>{labels.duration}</dt>
                  <dd className="mt-3 font-display text-lg font-medium leading-snug tracking-tight">
                    {stage.duration}
                  </dd>
                </div>
                {stage.needs && labels.needs && (
                  <div>
                    <dt className={`label-mono-sm ${muted}`}>{labels.needs}</dt>
                    <dd className="mt-3 font-display text-lg font-medium leading-snug tracking-tight">
                      {stage.needs}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
