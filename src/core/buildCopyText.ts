import { collectLineRanges, formatLineRanges, type SelectionInput } from "./lineRanges";
import { resolvePathForCopy } from "./pathResolver";
import * as path from "path";

export interface BuildCopyTextInput {
  readonly filePath: string;
  readonly workspaceFolderPath?: string;
  readonly selections: readonly SelectionInput[];
  readonly mode: "absolute" | "relative";
  readonly pathApi?: Pick<typeof path, "relative">;
}

export function buildCopyText(input: BuildCopyTextInput): string {
  const targetPath = resolvePathForCopy(
    {
      filePath: input.filePath,
      workspaceFolderPath: input.workspaceFolderPath,
      pathApi: input.pathApi
    },
    input.mode
  );
  const lineRanges = collectLineRanges(input.selections);
  return `${targetPath}:${formatLineRanges(lineRanges)}`;
}
