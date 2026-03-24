import * as path from "path";

export interface RelativePathInput {
  readonly filePath: string;
  readonly workspaceFolderPath?: string;
  readonly pathApi?: Pick<typeof path, "relative">;
}

export function resolvePathForCopy(input: RelativePathInput, mode: "absolute" | "relative"): string {
  if (mode === "absolute" || !input.workspaceFolderPath) {
    return input.filePath;
  }

  const pathApi = input.pathApi ?? path;
  const relativePath = pathApi.relative(input.workspaceFolderPath, input.filePath);

  if (!relativePath || relativePath.startsWith("..")) {
    return input.filePath;
  }

  return relativePath;
}
