/**
 * Keep hyphenated words like "45-minute" on one line in display type, where a
 * break at the hyphen reads as a typo.
 */
export function noBreakHyphens(text: string): React.ReactNode {
  return text.split(/(\S+-\S+)/).map((part, i) =>
    /\S-\S/.test(part) ? (
      <span key={i} className="whitespace-nowrap">
        {part}
      </span>
    ) : (
      part
    ),
  );
}
