import { Container, Eyebrow } from "@/components/primitives";
import { Reveal } from "@/components/reveal";

/** Eyebrow, display headline, and one paragraph. No media. */
export function TextSection({
  id,
  eyebrow,
  title,
  body,
}: {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <section aria-labelledby={id} className="border-t border-ink/15">
      <Container className="py-24 lg:py-32">
        <Reveal>
          <div className="max-w-3xl">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 id={id} className="display-1 mt-5">
              {title}
            </h2>
            <p className="body-lg mt-6 max-w-2xl text-ink/75">{body}</p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
