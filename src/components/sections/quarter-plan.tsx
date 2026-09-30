export interface QuarterPlanCopy {
  /** Stamp in the corner, e.g. "Example". */
  stamp: string;
  docTitle: string;
  client: string;
  period: string;
  monthLabel: string;
  deliverablesLabel: string;
  /** One entry per month, in order. */
  months: string[];
  measuresLabel: string;
  measures: string[];
  needsLabel: string;
  needs: string[];
  reviewLabel: string;
  review: string;
  /** Sits under the document, outside it. */
  caption: string;
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 flex flex-col gap-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-baseline gap-3">
          <span aria-hidden="true" className="mt-[7px] size-[5px] shrink-0 bg-blue" />
          <span className="text-[0.9375rem] leading-snug text-ink/80">{item}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * The sample Quarter Plan, set as a paper document on the page. Pure HTML and
 * tokens so it stays sharp, selectable, and readable by screen readers.
 */
export function QuarterPlanExhibit({ copy }: { copy: QuarterPlanCopy }) {
  return (
    <figure>
      <div className="relative rounded-[3px] border border-ink/15 bg-white p-6 shadow-[0_1px_0_rgba(45,42,43,0.04),0_24px_48px_-24px_rgba(45,42,43,0.25)] sm:p-9">
        {/* Letterhead */}
        <div className="flex items-start justify-between gap-6 border-b-2 border-ink pb-5">
          <div>
            <p className="label-mono-sm text-ink/60">{copy.client}</p>
            <p className="mt-2 font-display text-2xl font-medium tracking-tight sm:text-[1.75rem]">
              {copy.docTitle}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="label-mono-sm -rotate-3 rounded-[2px] border border-blue px-2.5 py-1 text-blue">
              {copy.stamp}
            </span>
            <span className="label-mono-sm text-ink/60">{copy.period}</span>
          </div>
        </div>

        {/* Month by month */}
        <table className="mt-6 w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-ink/15">
              <th scope="col" className="label-mono-sm w-20 pb-3 font-normal text-ink/60">
                {copy.monthLabel}
              </th>
              <th scope="col" className="label-mono-sm pb-3 font-normal text-ink/60">
                {copy.deliverablesLabel}
              </th>
            </tr>
          </thead>
          <tbody>
            {copy.months.map((m, i) => (
              <tr key={m} className="border-b border-ink/10 align-baseline">
                <th scope="row" className="py-4 font-mono text-sm font-normal text-blue">
                  [{String(i + 1).padStart(2, "0")}]
                </th>
                <td className="py-4 text-[0.9375rem] leading-snug text-ink/85">{m}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Measures and needs */}
        <div className="mt-7 grid grid-cols-1 gap-7 sm:grid-cols-2">
          <div>
            <p className="label-mono-sm text-ink/60">{copy.measuresLabel}</p>
            <Bullets items={copy.measures} />
          </div>
          <div>
            <p className="label-mono-sm text-ink/60">{copy.needsLabel}</p>
            <Bullets items={copy.needs} />
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-ink/15 pt-5">
          <span className="label-mono-sm text-ink/60">{copy.reviewLabel}</span>
          <span className="text-[0.9375rem] text-ink/80">{copy.review}</span>
        </div>
      </div>
      <figcaption className="label-mono-sm mt-4 text-ink/70">{copy.caption}</figcaption>
    </figure>
  );
}
