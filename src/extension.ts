import * as vscode from "vscode";
import { copyPathWithLine } from "./commands/copyPathWithLine";

const claudeAtMentionCommand = "claude-vscode.insertAtMention";

export function activate(context: vscode.ExtensionContext): void {
  context.subscriptions.push(
    vscode.commands.registerCommand("copyPathLine.copyRelativePathWithLine", async () => {
      await copyPathWithLine("relative");
    }),
    vscode.commands.registerCommand("copyPathLine.copyAbsolutePathWithLine", async () => {
      await copyPathWithLine("absolute");
    }),
    vscode.commands.registerCommand("copyPathLine.addToClaudeThread", async () => {
      if (!(await isCommandAvailable(claudeAtMentionCommand))) {
        void vscode.window.showErrorMessage("Claude Code 插件不可用，无法添加 @ 引用。");
        return;
      }

      const editor = vscode.window.activeTextEditor;

      if (!editor) {
        await vscode.commands.executeCommand(claudeAtMentionCommand);
        return;
      }

      const originalSelections = editor.selections;

      try {
        for (const selection of originalSelections) {
          editor.selections = [selection];
          await vscode.commands.executeCommand(claudeAtMentionCommand);
        }
      } finally {
        editor.selections = originalSelections;
      }
    })
  );
}

export function deactivate(): void {}

async function isCommandAvailable(command: string): Promise<boolean> {
  const commands = await vscode.commands.getCommands(true);
  return commands.includes(command);
}
