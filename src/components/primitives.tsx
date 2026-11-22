export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-10 ${className}`}>
      {children}
    </div>
  );
}

/**
 * Section eyebrow. Sentence case Helvetica in the accent color, sitting
 * directly above the heading, the way Apple and Mercury label sections.
 * `lime` is kept for older call sites and renders the same light blue as
 * `dark`, since blue is the site's accent.
 */
export function Eyebrow({
  children,
  dark = false,
  lime = false,
  className = "",
}: {
  children: React.ReactNode;
  dark?: boolean;
  lime?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`block font-display text-[1.0625rem] font-medium leading-snug tracking-[-0.01em] ${
        dark || lime ? "text-blue-3" : "text-blue-2"
      } ${className}`}
    >
      {children}
    </span>
  );
}

/** Mono index marker, e.g. [01] */
export function Index({
  n,
  dark = false,
  lime = false,
  className = "",
}: {
  n: string | number;
  dark?: boolean;
  lime?: boolean;
  className?: string;
}) {
  const label = typeof n === "number" ? String(n).padStart(2, "0") : n;
  return (
    <span
      className={`font-mono text-[0.875rem] ${
        lime ? "text-lime" : "text-blue-2"
      } ${dark ? "" : ""} ${className}`}
    >
      [{label}]
    </span>
  );
}

/** Standard section header. Eyebrow, headline, and an optional link under it. */
export function SectionHeader({
  eyebrow,
  title,
  dark = false,
  right,
  className = "",
}: {
  eyebrow: string;
  title: React.ReactNode;
  dark?: boolean;
  right?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`max-w-3xl ${className}`}>
      <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
      <h2 className={`display-1 mt-3 ${dark ? "text-paper" : "text-ink"}`}>
        {title}
      </h2>
      {right && <div className="mt-6">{right}</div>}
    </div>
  );
}
