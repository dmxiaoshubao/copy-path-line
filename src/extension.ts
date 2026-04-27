import * as vscode from "vscode";
import { copyPathWithLine } from "./commands/copyPathWithLine";

export function activate(context: vscode.ExtensionContext): void {
  context.subscriptions.push(
    vscode.commands.registerCommand("copyPathLine.copyRelativePathWithLine", async () => {
      await copyPathWithLine("relative");
    }),
    vscode.commands.registerCommand("copyPathLine.copyAbsolutePathWithLine", async () => {
      await copyPathWithLine("absolute");
    }),
    vscode.commands.registerCommand("copyPathLine.addToClaudeThread", async () => {
      const editor = vscode.window.activeTextEditor;

      if (!editor) {
        await vscode.commands.executeCommand("claude-vscode.insertAtMention");
        return;
      }

      const originalSelections = editor.selections;

      try {
        for (const selection of originalSelections) {
          editor.selections = [selection];
          await vscode.commands.executeCommand("claude-vscode.insertAtMention");
        }
      } finally {
        editor.selections = originalSelections;
      }
    })
  );
}

export function deactivate(): void {}
