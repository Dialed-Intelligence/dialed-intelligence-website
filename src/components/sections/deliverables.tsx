import { Container } from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import { EditorialRow } from "./editorial-row";
import type { DeliverableGroup } from "@/content/types";

/**
 * The parts of the role, each an editorial row with a summary and a list of
 * concrete deliverables. Each group is an anchor, e.g. /services#strategy.
 */
export function Deliverables({ groups }: { groups: DeliverableGroup[] }) {
  return (
    <Container>
      {groups.map((group, i) => (
        <section
          key={group.id}
          id={group.id}
          aria-labelledby={`${group.id}-title`}
          className="scroll-mt-20"
        >
          <Reveal>
            <EditorialRow
              label={group.title}
              index={String(i + 1).padStart(2, "0")}
              headingId={`${group.id}-title`}
            >
              <p className="body-lg max-w-2xl text-ink/75">{group.summary}</p>
              <ul className="mt-8 grid max-w-3xl grid-cols-1 border-t border-ink/15 md:grid-cols-2 md:gap-x-10">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-baseline gap-3 border-b border-ink/15 py-4"
                  >
                    <span aria-hidden="true" className="mt-[7px] size-[6px] shrink-0 bg-blue" />
                    <span className="body-md text-ink/85">{item}</span>
                  </li>
                ))}
              </ul>
            </EditorialRow>
          </Reveal>
        </section>
      ))}
    </Container>
  );
}
