"use client";

import { Fragment, useEffect, useRef, useState } from "react";

type Call = "build" | "buy" | "skip";

export interface OpportunityModelCopy {
  stamp: string;
  docTitle: string;
  client: string;
  period: string;
  columns: { project: string; annualReturn: string; payback: string; call: string };
  rows: {
    project: string;
    annualReturn: string;
    payback: string;
    call: Call;
    /** How the row was sized, shown when the row is opened. */
    sizing: string;
  }[];
  callLabels: Record<Call, string>;
  detailLabels: {
    toggle: string;
    sizing: string;
    breakEven: string;
    start: string;
    end: string;
    /** Screen reader label for the curve, followed by the payback month. */
    curve: string;
  };
  /** Sits under the document, outside it. */
  caption: string;
}

const callStyle: Record<Call, string> = {
  build: "border-blue bg-blue text-white",
  buy: "border-ink/40 text-ink",
  skip: "border-dashed border-ink/30 text-ink/70 line-through",
};

/** Load sequence length in ms, and when each row starts, as a share of it. */
const DURATION = 2400;
const rowStart = (i: number) => 0.08 + i * 0.14;
const easeOut = (x: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3);

/** Splits "1,100 staff hours" into 1100 and " staff hours". Null when the text has no leading number. */
function leadingNumber(text: string): { value: number; rest: string } | null {
  const m = text.match(/^([\d,]+)(.*)$/);
  if (!m) return null;
  return { value: Number(m[1].replace(/,/g, "")), rest: m[2] };
}

function countText(text: string, progress: number) {
  const n = leadingNumber(text);
  if (!n || progress >= 1) return text;
  return Math.round(n.value * progress).toLocaleString("en-US") + n.rest;
}

/** Months 0 to 12 on x. Break-even on the dashed line. Rises past it after the payback month. */
function PaybackCurve({
  months,
  labels,
}: {
  months: number;
  labels: OpportunityModelCopy["detailLabels"];
}) {
  const w = 300;
  const zero = 78;
  const points = Array.from({ length: 13 }, (_, m) => {
    const v = Math.min(2, m / months - 1);
    return `${(m * w) / 12},${(zero - v * 52).toFixed(1)}`;
  }).join(" ");
  const x = (months * w) / 12;
  return (
    <svg
      viewBox="0 0 300 120"
      className="w-full max-w-[320px] shrink-0 overflow-visible"
      role="img"
      aria-label={`${labels.curve} ${months}`}
    >
      <line x1="0" y1={zero} x2={w} y2={zero} className="stroke-ink/30" strokeWidth="1" />
      <line x1={x} y1="8" x2={x} y2="104" className="stroke-blue-2" strokeWidth="1" strokeDasharray="3 3" />
      <polyline points={points} fill="none" className="di-draw-path stroke-blue" strokeWidth="2.5" />
      <text x={Math.min(x + 6, 210)} y="18" className="fill-blue-2 font-mono text-[10px] uppercase">
        {labels.breakEven}
      </text>
      <text x="0" y="118" className="fill-ink/60 font-mono text-[10px] uppercase">
        {labels.start}
      </text>
      <text x={w} y="118" textAnchor="end" className="fill-ink/60 font-mono text-[10px] uppercase">
        {labels.end}
      </text>
    </svg>
  );
}

/**
 * A sample Opportunity Model that behaves like the software it describes.
 * When it scrolls into view the rows load one at a time, the figures count up
 * and each call stamps in last. Any row opens to show how it was sized.
 *
 * Without JS, or with reduced motion, it renders complete and static.
 */
export function OpportunityModelExhibit({ copy }: { copy: OpportunityModelCopy }) {
  const ref = useRef<HTMLDivElement | null>(null);
  // null = render complete (server, no JS, reduced motion). 0..1 = load progress.
  const [t, setT] = useState<number | null>(null);
  const [open, setOpen] = useState<number | null>(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    // Hide the rows until the model is on screen. A state update inside the
    // effect is intended here: it only runs once, on the client.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setT(0);
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        const start = performance.now();
        const step = (now: number) => {
          const p = Math.min(1, (now - start) / DURATION);
          setT(p);
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  const done = t === null || t >= 1;
  const rows = copy.rows.map((row, i) => {
    const start = rowStart(i);
    const progress = t === null ? 1 : easeOut((t - start) / 0.35);
    return {
      ...row,
      visible: t === null || t >= start,
      stamped: t === null || t >= start + 0.28,
      returnText: countText(row.annualReturn, progress),
      paybackText: countText(row.payback, progress),
      months: leadingNumber(row.payback)?.value ?? null,
    };
  });

  const toggle = (i: number) => setOpen((cur) => (cur === i ? null : i));

  return (
    <figure aria-labelledby="opportunity-model-caption">
      <div
        ref={ref}
        className="relative rounded-[3px] border border-ink/15 bg-white p-6 shadow-[0_1px_0_rgba(45,42,43,0.04),0_40px_80px_-32px_rgba(45,42,43,0.35)] sm:p-9"
      >
        <div className="flex items-start justify-between gap-6 border-b-2 border-ink pb-5">
          <div>
            <p className="label-mono-sm text-ink/70">{copy.client}</p>
            <p className="mt-2 font-display text-2xl font-medium tracking-tight sm:text-[1.75rem]">
              {copy.docTitle}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="label-mono-sm -rotate-3 rounded-[2px] border border-blue px-2.5 py-1 text-blue">
              {copy.stamp}
            </span>
            <span className="label-mono-sm text-ink/70">
              {done ? copy.period : `${Math.round((t ?? 0) * 100)}%`}
            </span>
          </div>
        </div>

        <table aria-labelledby="opportunity-model-caption" className="mt-6 w-full border-collapse text-left">
          <thead className="hidden sm:table-header-group">
            <tr className="border-b border-ink/15">
              {[copy.columns.project, copy.columns.annualReturn, copy.columns.payback, copy.columns.call].map(
                (h) => (
                  <th key={h} scope="col" className="label-mono-sm pb-3 pr-4 font-normal text-ink/70 last:pr-0">
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              const isOpen = open === i;
              const detailId = `om-detail-${i}`;
              return (
                <Fragment key={row.project}>
                  <tr
                    className={`grid grid-cols-[1fr_auto] gap-x-4 border-b border-ink/10 py-4 align-top transition-[opacity,transform] duration-500 sm:table-row sm:py-0 ${
                      row.visible ? "opacity-100" : "translate-y-2 opacity-0"
                    } ${isOpen ? "bg-paper-2" : ""}`}
                  >
                    <th scope="row" className="col-start-1 row-start-1 text-left font-normal sm:py-4 sm:pr-4">
                      <button
                        type="button"
                        onClick={() => toggle(i)}
                        aria-expanded={isOpen}
                        aria-controls={detailId}
                        className={`group flex items-start gap-2 text-left text-[0.9375rem] font-medium leading-snug transition-colors hover:text-blue ${
                          row.call === "skip" ? "text-ink/70" : "text-ink"
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className={`mt-[1px] inline-block w-3 shrink-0 font-mono text-blue transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                        >
                          +
                        </span>
                        <span>
                          {row.project}
                          <span className="sr-only">. {copy.detailLabels.toggle}</span>
                        </span>
                      </button>
                    </th>
                    <td className="col-span-2 row-start-2 pl-5 pt-2 text-sm tabular-nums text-ink/80 sm:py-4 sm:pl-0 sm:pr-4 sm:text-[0.9375rem]">
                      {row.returnText}
                      <span className="font-mono text-ink/70 sm:hidden"> / {row.paybackText}</span>
                    </td>
                    <td className="hidden whitespace-nowrap py-4 pr-4 font-mono text-sm tabular-nums text-ink/80 sm:table-cell">
                      {row.paybackText}
                    </td>
                    <td className="col-start-2 row-start-1 sm:py-4">
                      <span
                        className={`label-mono-sm inline-block whitespace-nowrap rounded-[2px] border px-2 py-1 ${callStyle[row.call]} ${
                          row.stamped ? (t === null ? "" : "di-stamp") : "invisible"
                        }`}
                      >
                        {copy.callLabels[row.call]}
                      </span>
                    </td>
                  </tr>
                  <tr id={detailId} hidden={!isOpen} className="border-b border-ink/10 bg-paper-2">
                    <td colSpan={4} className="block px-5 pb-6 pt-2 sm:table-cell">
                      {isOpen && (
                        <div className="flex flex-col gap-6 sm:flex-row sm:items-end">
                          {row.months && <PaybackCurve months={row.months} labels={copy.detailLabels} />}
                          <div className="min-w-0 flex-1">
                            <p className="label-mono-sm text-ink/70">{copy.detailLabels.sizing}</p>
                            <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink/85">{row.sizing}</p>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      <figcaption id="opportunity-model-caption" className="label-mono-sm mt-4 text-ink/70">
        {copy.caption}
      </figcaption>
    </figure>
  );
}
