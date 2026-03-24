# Copy Path Line

Copy the current file path with line numbers from VS Code.

`Copy Path Line` is a quiet utility extension for engineers who often paste file references into chats, issues, PRs, or code review comments. It supports both relative and absolute paths, and it formats multi-selection ranges into a compact output such as `1-3,5-6,8-11`.

[中文文档](https://github.com/dmxiaoshubao/copy-path-line/blob/main/docs/README.zh-CN.md)

Repository: <https://github.com/dmxiaoshubao/copy-path-line>

## Features

- Copy relative path with line numbers
- Copy absolute path with line numbers
- Support multi-cursor and multi-selection ranges
- Merge overlapping and adjacent line ranges automatically
- Work from keyboard shortcuts, Command Palette, and editor context menu
- Stay quiet on success without notifications

## Commands

- `Copy Path Line: Copy Relative Path with Line`
- `Copy Path Line: Copy Absolute Path with Line`

Command IDs:

- `copyPathLine.copyRelativePathWithLine`
- `copyPathLine.copyAbsolutePathWithLine`

The command titles are localized automatically. In English VS Code they appear in English, and in Simplified Chinese VS Code they appear in Chinese.

## Default Shortcut

The default shortcut is bound to the relative-path command:

- macOS: `shift+cmd+c`
- Windows / Linux: `shift+ctrl+c`

The absolute-path command is available but does not ship with a default shortcut. You can assign one in VS Code keyboard shortcuts by using:

- `copyPathLine.copyAbsolutePathWithLine`

## Context Menu

The editor context menu uses the same localized command titles:

- Relative path with line numbers
- Absolute path with line numbers

## Output Examples

```text
src/extension.ts:8
src/extension.ts:1-3,5-6,8-11
/Users/name/project/src/extension.ts:8
```

## Line Range Rules

- An empty selection uses the current cursor line
- A normal selection spanning multiple lines becomes `start-end`
- Multiple selections are sorted, de-duplicated, and merged when ranges overlap or touch
- A selection ending at column `0` of the next line is treated as the previous line only

## Relative Path Rules

- Relative paths are resolved from the workspace folder that owns the current file
- In multi-root workspaces, the containing workspace folder is used
- If the file is not inside a workspace folder, the extension falls back to the absolute path

## Development

```bash
npm install
npm run compile
npm run test:host
```

To debug the extension in VS Code, open this project and run the `Run Copy Path Line` launch configuration.
