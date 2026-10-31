import { LogoMark } from "@/components/logo";
import { Container, SectionHeader } from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import type { SectionIntro } from "@/content/types";

export interface ComparisonCopy {
  intro: SectionIntro;
  /** Header for the row-label column. */
  rowLabel: string;
  /** Column heads. The last one is us and renders on ink. */
  options: string[];
  /** One cell per option, in the same order. */
  rows: { label: string; cells: string[] }[];
}

/**
 * The ways to get AI done, side by side. A table from `md` up. Below that,
 * one card per option, so nothing scrolls sideways on a phone.
 */
export function Comparison({
  id,
  anchor,
  copy,
}: {
  id: string;
  /** Section id for in-page links, e.g. "compare". */
  anchor?: string;
  copy: ComparisonCopy;
}) {
  const last = copy.options.length - 1;
  return (
    <section id={anchor} aria-labelledby={id} className="scroll-mt-20 border-t border-ink/15">
      <Container className="py-24 lg:py-32">
        <Reveal>
          <SectionHeader
            eyebrow={copy.intro.eyebrow}
            title={<span id={id}>{copy.intro.title}</span>}
          />
        </Reveal>

        {/* Tablet and up */}
        <Reveal delay={80} className="mt-16 hidden md:block">
          <table aria-labelledby={id} className="w-full table-fixed border-collapse text-left">
            <thead>
              <tr>
                <th scope="col" className="label-mono-sm w-[22%] pb-4 pr-6 align-bottom font-normal text-ink/70">
                  {copy.rowLabel}
                </th>
                {copy.options.map((opt, i) => (
                  <th
                    key={opt}
                    scope="col"
                    className={`px-6 pb-4 align-bottom font-display text-lg font-medium tracking-tight ${
                      i === last
                        ? "rounded-t-[5px] bg-ink pt-6 text-paper"
                        : "text-ink"
                    }`}
                  >
                    {i === last && (
                      <LogoMark width={22} className="mb-3 block text-lime" />
                    )}
                    {opt}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {copy.rows.map((row, r) => (
                <tr key={row.label}>
                  <th
                    scope="row"
                    className="border-t border-ink/20 py-5 pr-6 align-top font-display text-base font-medium tracking-tight"
                  >
                    {row.label}
                  </th>
                  {row.cells.map((cell, i) => (
                    <td
                      key={`${row.label}-${i}`}
                      className={`px-6 py-5 align-top text-[0.9375rem] leading-snug ${
                        i === last
                          ? `border-t border-paper/15 bg-ink text-paper ${
                              r === copy.rows.length - 1 ? "rounded-b-[5px] pb-6" : ""
                            }`
                          : "border-t border-ink/20 text-ink/75"
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        {/* Phones */}
        <ul className="mt-12 flex flex-col gap-4 md:hidden">
          {copy.options.map((opt, i) => (
            <li
              key={opt}
              className={`rounded-[5px] p-6 ${
                i === last ? "bg-ink text-paper" : "border border-ink/15 bg-paper-2"
              }`}
            >
              <h3 className="display-3">{opt}</h3>
              <dl className="mt-4">
                {copy.rows.map((row) => (
                  <div
                    key={row.label}
                    className={`flex justify-between gap-4 border-t py-3 ${
                      i === last ? "border-paper/15" : "border-ink/15"
                    }`}
                  >
                    <dt className={`label-mono-sm ${i === last ? "text-paper/60" : "text-ink/70"}`}>
                      {row.label}
                    </dt>
                    <dd className="text-right text-[0.9375rem] leading-snug">
                      {row.cells[i]}
                    </dd>
                  </div>
                ))}
              </dl>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
