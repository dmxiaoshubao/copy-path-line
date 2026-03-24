export interface SelectionInput {
  readonly startLine: number;
  readonly startCharacter: number;
  readonly endLine: number;
  readonly endCharacter: number;
  readonly isEmpty: boolean;
}

export interface LineRange {
  readonly start: number;
  readonly end: number;
}

export function selectionToLineRange(selection: SelectionInput): LineRange {
  const start = selection.startLine + 1;
  let endLine = selection.endLine;

  if (!selection.isEmpty && selection.endCharacter === 0 && selection.endLine > selection.startLine) {
    endLine -= 1;
  }

  const end = endLine + 1;
  return {
    start,
    end: Math.max(start, end)
  };
}

export function normalizeLineRanges(ranges: readonly LineRange[]): LineRange[] {
  if (ranges.length === 0) {
    return [];
  }

  const sorted = [...ranges].sort((left, right) => {
    if (left.start !== right.start) {
      return left.start - right.start;
    }

    return left.end - right.end;
  });

  const merged: LineRange[] = [];

  for (const range of sorted) {
    const previous = merged.at(-1);

    if (!previous) {
      merged.push({ ...range });
      continue;
    }

    if (range.start <= previous.end + 1) {
      merged[merged.length - 1] = {
        start: previous.start,
        end: Math.max(previous.end, range.end)
      };
      continue;
    }

    merged.push({ ...range });
  }

  return merged;
}

export function collectLineRanges(selections: readonly SelectionInput[]): LineRange[] {
  return normalizeLineRanges(selections.map(selectionToLineRange));
}

export function formatLineRanges(ranges: readonly LineRange[]): string {
  return ranges
    .map((range) => (range.start === range.end ? `${range.start}` : `${range.start}-${range.end}`))
    .join(",");
}
