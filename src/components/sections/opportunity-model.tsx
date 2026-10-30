type Call = "build" | "buy" | "skip";

export interface OpportunityModelCopy {
  stamp: string;
  docTitle: string;
  client: string;
  period: string;
  columns: { project: string; annualReturn: string; payback: string; call: string };
  rows: { project: string; annualReturn: string; payback: string; call: Call }[];
  callLabels: Record<Call, string>;
  /** Sits under the document, outside it. */
  caption: string;
}

const callStyle: Record<Call, string> = {
  build: "border-blue bg-blue text-white",
  buy: "border-ink/40 text-ink",
  skip: "border-ink/25 text-ink/60",
};

/**
 * A sample Opportunity Model, set as a paper document to match the Quarter
 * Plan exhibit. Each project carries a return, a payback, and a call.
 */
export function OpportunityModelExhibit({ copy }: { copy: OpportunityModelCopy }) {
  return (
    <figure>
      <div className="relative rounded-[3px] border border-ink/15 bg-white p-6 shadow-[0_1px_0_rgba(45,42,43,0.04),0_24px_48px_-24px_rgba(45,42,43,0.25)] sm:p-9">
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

        {/* Tablet and up, a table */}
        <table className="mt-6 hidden w-full border-collapse text-left sm:table">
          <thead>
            <tr className="border-b border-ink/15">
              {[copy.columns.project, copy.columns.annualReturn, copy.columns.payback, copy.columns.call].map(
                (h) => (
                  <th key={h} scope="col" className="label-mono-sm pb-3 pr-4 font-normal text-ink/60 last:pr-0">
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {copy.rows.map((row) => (
              <tr key={row.project} className="border-b border-ink/10 align-top">
                <th
                  scope="row"
                  className={`py-4 pr-4 text-[0.9375rem] font-medium leading-snug ${
                    row.call === "skip" ? "text-ink/55" : "text-ink"
                  }`}
                >
                  {row.project}
                </th>
                <td className="py-4 pr-4 text-[0.9375rem] leading-snug text-ink/80">
                  {row.annualReturn}
                </td>
                <td className="whitespace-nowrap py-4 pr-4 font-mono text-sm text-ink/80">
                  {row.payback}
                </td>
                <td className="py-4">
                  <span
                    className={`label-mono-sm inline-block whitespace-nowrap rounded-[2px] border px-2 py-1 ${callStyle[row.call]}`}
                  >
                    {copy.callLabels[row.call]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Phones, one block per project */}
        <ul className="mt-4 sm:hidden">
          {copy.rows.map((row) => (
            <li key={row.project} className="border-b border-ink/10 py-4">
              <div className="flex items-start justify-between gap-4">
                <p className={`text-[0.9375rem] font-medium leading-snug ${row.call === "skip" ? "text-ink/55" : ""}`}>
                  {row.project}
                </p>
                <span
                  className={`label-mono-sm shrink-0 rounded-[2px] border px-2 py-1 ${callStyle[row.call]}`}
                >
                  {copy.callLabels[row.call]}
                </span>
              </div>
              <p className="mt-2 text-sm text-ink/75">
                {row.annualReturn}
                <span className="font-mono text-ink/60"> / {row.payback}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
      <figcaption className="label-mono-sm mt-4 text-ink/70">{copy.caption}</figcaption>
    </figure>
  );
}
