/**
 * Two-column editorial row. Sticky index and label on the left, content on
 * the right. Used by the service template and long-form pages.
 */
export function EditorialRow({
  label,
  index,
  headingId,
  dark = false,
  children,
}: {
  label: string;
  index: string;
  headingId?: string;
  dark?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`grid grid-cols-1 gap-x-16 gap-y-8 border-t py-14 lg:grid-cols-[280px_minmax(0,1fr)] lg:py-20 ${
        dark ? "border-paper/20" : "border-ink/20"
      }`}
    >
      <div className="lg:sticky lg:top-28 lg:self-start">
        <span className={`font-mono text-sm ${dark ? "text-lime" : "text-blue-2"}`}>
          [{index}]
        </span>
        <h2 id={headingId} className="display-3 mt-3">
          {label}
        </h2>
      </div>
      <div>{children}</div>
    </div>
  );
}
