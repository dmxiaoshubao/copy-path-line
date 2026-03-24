import * as assert from "assert";
import * as path from "path";
import { buildCopyText } from "../../core/buildCopyText";
import { resolvePathForCopy } from "../../core/pathResolver";

suite("pathResolver", () => {
  test("resolvePathForCopy returns relative path inside workspace", () => {
    const result = resolvePathForCopy(
      {
        filePath: path.join("/workspace", "src", "extension.ts"),
        workspaceFolderPath: "/workspace"
      },
      "relative"
    );

    assert.strictEqual(result, path.join("src", "extension.ts"));
  });

  test("resolvePathForCopy falls back to absolute path outside workspace", () => {
    const result = resolvePathForCopy(
      {
        filePath: "/outside/file.ts",
        workspaceFolderPath: "/workspace"
      },
      "relative"
    );

    assert.strictEqual(result, "/outside/file.ts");
  });

  test("resolvePathForCopy keeps absolute path when requested", () => {
    const result = resolvePathForCopy(
      {
        filePath: "/workspace/src/extension.ts",
        workspaceFolderPath: "/workspace"
      },
      "absolute"
    );

    assert.strictEqual(result, "/workspace/src/extension.ts");
  });

  test("buildCopyText falls back to absolute path when no workspace is available", () => {
    const result = buildCopyText({
      filePath: "/standalone/file.ts",
      mode: "relative",
      selections: [
        {
          startLine: 6,
          startCharacter: 0,
          endLine: 6,
          endCharacter: 0,
          isEmpty: true
        }
      ]
    });

    assert.strictEqual(result, "/standalone/file.ts:7");
  });

  test("buildCopyText formats windows paths and merged ranges", () => {
    const result = buildCopyText({
      filePath: "C:\\repo\\src\\extension.ts",
      workspaceFolderPath: "C:\\repo",
      pathApi: path.win32,
      mode: "relative",
      selections: [
        {
          startLine: 0,
          startCharacter: 0,
          endLine: 2,
          endCharacter: 4,
          isEmpty: false
        },
        {
          startLine: 4,
          startCharacter: 0,
          endLine: 5,
          endCharacter: 2,
          isEmpty: false
        }
      ]
    });

    assert.strictEqual(result, "src\\extension.ts:1-3,5-6");
  });
});
