import { Fragment } from "react";

// Renders copy strings, turning `backtick` spans into inline code.
// Each segment is keyed by where it starts in the string.
export function Rich({ text }: Readonly<{ text: string }>) {
  const segments: { part: string; start: number; code: boolean }[] = [];
  let offset = 0;
  for (const [i, part] of text.split("`").entries()) {
    segments.push({ part, start: offset, code: i % 2 === 1 });
    offset += part.length + 1;
  }
  return (
    <>
      {segments.map(({ part, start, code }) =>
        code ? (
          <code key={start} className="inline-code">
            {part}
          </code>
        ) : (
          <Fragment key={start}>{part}</Fragment>
        ),
      )}
    </>
  );
}
