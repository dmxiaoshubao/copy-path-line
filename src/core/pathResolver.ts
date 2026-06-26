import * as path from "path";

export interface RelativePathInput {
  readonly filePath: string;
  readonly workspaceFolderPath?: string;
  readonly pathApi?: Pick<typeof path, "isAbsolute" | "relative">;
}

export function resolvePathForCopy(input: RelativePathInput, mode: "absolute" | "relative"): string {
  if (mode === "absolute" || !input.workspaceFolderPath) {
    return input.filePath;
  }

  const pathApi = input.pathApi ?? path;
  const relativePath = pathApi.relative(input.workspaceFolderPath, input.filePath);

  if (!relativePath || isOutsideWorkspace(relativePath, pathApi)) {
    return input.filePath;
  }

  return relativePath;
}

function isOutsideWorkspace(relativePath: string, pathApi: Pick<typeof path, "isAbsolute">): boolean {
  const firstSegment = relativePath.split(/[\\/]/, 1)[0];
  return firstSegment === ".." || pathApi.isAbsolute(relativePath);
}
