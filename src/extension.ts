import * as vscode from "vscode";
import { copyPathWithLine } from "./commands/copyPathWithLine";

export function activate(context: vscode.ExtensionContext): void {
  context.subscriptions.push(
    vscode.commands.registerCommand("copyPathLine.copyRelativePathWithLine", async () => {
      await copyPathWithLine("relative");
    }),
    vscode.commands.registerCommand("copyPathLine.copyAbsolutePathWithLine", async () => {
      await copyPathWithLine("absolute");
    })
  );
}

export function deactivate(): void {}
