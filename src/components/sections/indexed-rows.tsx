import { Index } from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import type { TitledText } from "@/content/types";

/** Full-width numbered rows. Index, a short title, and a sentence or two. */
export function IndexedRows({ items }: { items: TitledText[] }) {
  return (
    <div className="border-t border-ink/20">
      {items.map((item, i) => (
        <Reveal key={item.title} delay={i * 60}>
          <div className="grid grid-cols-1 items-baseline gap-x-8 gap-y-3 border-b border-ink/20 py-8 sm:grid-cols-[64px_minmax(0,1fr)_minmax(0,1.2fr)] lg:py-10">
            <Index n={i + 1} />
            <h3 className="display-3">{item.title}</h3>
            <p className="body-md max-w-xl text-ink/75">{item.body}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
