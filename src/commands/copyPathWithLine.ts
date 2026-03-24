import * as vscode from "vscode";
import { buildCopyText } from "../core/buildCopyText";
import type { SelectionInput } from "../core/lineRanges";

export type CopyMode = "absolute" | "relative";

export async function copyPathWithLine(mode: CopyMode): Promise<void> {
  const editor = vscode.window.activeTextEditor;

  if (!editor || editor.document.uri.scheme !== "file") {
    void vscode.window.showErrorMessage("当前没有可复制路径的文件编辑器。");
    return;
  }

  const workspaceFolder = vscode.workspace.getWorkspaceFolder(editor.document.uri);
  const text = buildCopyText({
    filePath: editor.document.uri.fsPath,
    workspaceFolderPath: workspaceFolder?.uri.fsPath,
    selections: editor.selections.map(toSelectionInput),
    mode
  });

  await vscode.env.clipboard.writeText(text);
}

function toSelectionInput(selection: vscode.Selection): SelectionInput {
  return {
    startLine: selection.start.line,
    startCharacter: selection.start.character,
    endLine: selection.end.line,
    endCharacter: selection.end.character,
    isEmpty: selection.isEmpty
  };
}
