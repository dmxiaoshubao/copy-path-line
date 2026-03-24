# Copy Path Line for JetBrains IDEs

This subproject contains the IntelliJ Platform plugin version of Copy Path Line.

## Goals

- Copy relative path with line numbers
- Copy absolute path with line numbers
- Support multiple carets and multiple selections
- Merge line ranges into compact output such as `1-3,5-6,8-11`
- Work in JetBrains IDE editor popup menu
- Keep behavior quiet on success

## Scope

The plugin is built against the IntelliJ Platform and targets common editor APIs so it can be used by JetBrains IDEs that support the platform action system and local-file editors.

## Development

This subproject expects Java 17 through `jenv local 17` and uses a project-local Gradle wrapper instead of a global Gradle installation.
