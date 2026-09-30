import { Index } from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import type { TitledText } from "@/content/types";

/**
 * Numbered items in a two or three column grid, separated by hairlines. Two
 * columns split at `sm`, three at `lg`.
 */
export function NumberedGrid({
  items,
  cols = 2,
}: {
  items: TitledText[];
  cols?: 2 | 3;
}) {
  const grid = cols === 3 ? "lg:grid-cols-3" : "sm:grid-cols-2";
  return (
    <div className={`grid grid-cols-1 ${grid}`}>
      {items.map((item, i) => {
        const col = i % cols;
        const edge =
          cols === 3
            ? `${col > 0 ? "lg:border-l lg:border-ink/20 lg:pl-10" : ""} ${col < 2 ? "lg:pr-10" : ""}`
            : col === 1
              ? "sm:border-l sm:border-ink/20 sm:pl-10"
              : "sm:pr-10";
        return (
          <Reveal key={item.title} delay={col * 80} className="flex">
            <div
              className={`flex w-full flex-col border-t border-ink/20 py-10 lg:py-12 ${edge}`}
            >
              <Index n={i + 1} />
              <h3 className="display-3 mt-12 lg:mt-16">{item.title}</h3>
              <p className="body-md mt-4 max-w-md text-ink/75">{item.body}</p>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
