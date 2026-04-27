# Changelog

All notable changes to this project will be documented in this file.

## [0.1.0] - 2026-04-27

### Added

- Add `Add to Claude Thread` command for inserting the active file or selected ranges into Claude Code as `@` mentions.
- Support multiple selections when adding references to a Claude Code thread.

### Changed

- Exclude the JetBrains plugin subproject and local development files from VSIX packaging.
- Remove the unintended macOS `ctrl+shift+c` shortcut entry.

## [0.0.1] - 2026-03-24

### Added

- Initial release of `Copy Path Line`
- Copy relative path with line numbers
- Copy absolute path with line numbers
- Default keyboard shortcut for relative path copy
- Editor context menu entries for relative and absolute path copy
- Multi-selection line range merge such as `1-3,5-6,8-11`
- Unit tests and extension-host integration tests
