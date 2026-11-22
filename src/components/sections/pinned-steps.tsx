"use client";

import { useEffect, useRef, useState } from "react";
import { Container, SectionHeader } from "@/components/primitives";
import { TextLink } from "@/components/cta";
import type { SectionIntro, Step } from "@/content/types";

/** Scroll distance per step while pinned, in viewport heights. */
const VH_PER_STEP = 70;

/**
 * Engagement steps as a pinned track. On wide screens the section holds
 * still while the steps slide across and a progress rail fills. On phones,
 * with reduced motion, or without JS, the steps stack as a normal list.
 */
export function PinnedSteps({
  id,
  intro,
  steps,
}: {
  id: string;
  intro: SectionIntro;
  steps: Step[];
}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLOListElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);
  const [pinned, setPinned] = useState(false);
  const [active, setActive] = useState(0);

  // Pin only on wide screens with motion allowed.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    const update = () => setPinned(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!pinned) return;
    let raf = 0;
    const measure = () => {
      raf = 0;
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;
      const rect = section.getBoundingClientRect();
      const range = section.offsetHeight - window.innerHeight;
      const p = range > 0 ? Math.min(1, Math.max(0, -rect.top / range)) : 0;
      const overflow = track.scrollWidth - track.clientWidth;
      track.style.transform = `translate3d(${(-p * overflow).toFixed(1)}px,0,0)`;
      if (railRef.current) railRef.current.style.transform = `scaleX(${p.toFixed(4)})`;
      setActive(Math.min(steps.length - 1, Math.round(p * (steps.length - 1))));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [pinned, steps.length]);

  const header = (
    <SectionHeader
      eyebrow={intro.eyebrow}
      title={<span id={id}>{intro.title}</span>}
      right={intro.link && <TextLink href={intro.link.href}>{intro.link.label}</TextLink>}
    />
  );

  if (!pinned) {
    return (
      <section aria-labelledby={id} className="border-t border-ink/15">
        <Container className="py-24 lg:py-32">
          {header}
          <ol className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
            {steps.map((step, i) => (
              <StepCard key={step.title} step={step} n={i + 1} activeCard={false} />
            ))}
          </ol>
        </Container>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      aria-labelledby={id}
      className="relative border-t border-ink/15"
      style={{ height: `${100 + VH_PER_STEP * (steps.length - 1) + 40}vh` }}
    >
      <div className="sticky top-[69px] flex h-[calc(100svh-69px)] flex-col justify-center overflow-hidden">
        <Container>
          <div className="flex items-end justify-between gap-8">
            {header}
            <p className="label-mono shrink-0 text-ink/60" aria-hidden="true">
              <span className="text-blue-2">{String(active + 1).padStart(2, "0")}</span> /{" "}
              {String(steps.length).padStart(2, "0")}
            </p>
          </div>

          <div aria-hidden="true" className="relative mt-12 h-6">
            <div className="absolute inset-x-0 top-[11px] h-px bg-ink/20" />
            <div ref={railRef} className="absolute inset-x-0 top-[10px] h-[3px] origin-left scale-x-0 bg-blue" />
            <div className="absolute inset-0 flex justify-between">
              {steps.map((s, i) => (
                <span
                  key={s.title}
                  className={`bg-paper px-1.5 font-mono text-sm transition-colors duration-300 ${
                    i <= active ? "text-blue-2" : "text-ink/45"
                  }`}
                >
                  [{String(i + 1).padStart(2, "0")}]
                </span>
              ))}
            </div>
          </div>

          <ol ref={trackRef} className="mt-10 flex gap-5 will-change-transform">
            {steps.map((step, i) => (
              <StepCard key={step.title} step={step} n={i + 1} activeCard={i === active} wide />
            ))}
          </ol>
        </Container>
      </div>
    </section>
  );
}

function StepCard({
  step,
  n,
  activeCard,
  wide = false,
}: {
  step: Step;
  n: number;
  activeCard: boolean;
  wide?: boolean;
}) {
  return (
    <li
      aria-current={activeCard ? "step" : undefined}
      className={`flex min-h-[360px] flex-col justify-between rounded-md p-8 transition-colors duration-500 lg:p-10 ${
        wide ? "w-[min(620px,58vw)] shrink-0" : ""
      } ${activeCard ? "bg-ink text-paper" : "bg-paper-2 text-ink"}`}
    >
      <div className="flex items-start justify-between gap-6">
        <span
          aria-hidden="true"
          className={`font-display text-[clamp(5rem,9vw,8.5rem)] font-medium leading-[0.8] tracking-[-0.06em] ${
            activeCard ? "text-blue" : "text-ink/12"
          }`}
        >
          {String(n).padStart(2, "0")}
        </span>
        <span className={`label-mono-sm text-right ${activeCard ? "text-blue-3" : "text-ink/70"}`}>
          {step.duration}
        </span>
      </div>
      <div>
        <h3 className="display-2">{step.title}</h3>
        <p className={`body-md mt-4 max-w-md ${activeCard ? "text-paper/75" : "text-ink/75"}`}>{step.body}</p>
      </div>
    </li>
  );
}
