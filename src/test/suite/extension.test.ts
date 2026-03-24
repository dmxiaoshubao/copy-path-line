import * as assert from "assert";
import * as path from "path";
import * as vscode from "vscode";

suite("extension", () => {
  const fixturePath = path.join(vscode.workspace.workspaceFolders![0].uri.fsPath, "fixtures", "sample.ts");

  test("relative command writes merged ranges to clipboard", async () => {
    const document = await vscode.workspace.openTextDocument(fixturePath);
    const editor = await vscode.window.showTextDocument(document);
    const lastLineEnd = document.lineAt(4).range.end.character;

    editor.selections = [
      new vscode.Selection(0, 0, 2, 5),
      new vscode.Selection(4, 0, 4, lastLineEnd)
    ];

    await vscode.commands.executeCommand("copyPathLine.copyRelativePathWithLine");

    const clipboardText = await vscode.env.clipboard.readText();
    assert.strictEqual(clipboardText, path.join("fixtures", "sample.ts") + ":1-3,5");
  });

  test("absolute command writes absolute path to clipboard", async () => {
    const document = await vscode.workspace.openTextDocument(fixturePath);
    const editor = await vscode.window.showTextDocument(document);

    editor.selection = new vscode.Selection(1, 0, 1, 0);

    await vscode.commands.executeCommand("copyPathLine.copyAbsolutePathWithLine");

    const clipboardText = await vscode.env.clipboard.readText();
    assert.strictEqual(clipboardText, `${fixturePath}:2`);
  });

  test("commands are registered", async () => {
    const commands = await vscode.commands.getCommands(true);

    assert.ok(commands.includes("copyPathLine.copyRelativePathWithLine"));
    assert.ok(commands.includes("copyPathLine.copyAbsolutePathWithLine"));
  });
});
