package com.dmxiaoshubao.copypathline.idea.core

import java.nio.file.Path

object CopyTextBuilder {
    fun build(
        text: CharSequence,
        filePath: Path,
        rootPath: Path?,
        selections: List<SelectionRange>,
        mode: CopyMode,
    ): String {
        val targetPath = PathResolver.resolve(filePath, rootPath, mode)
        val ranges = LineRanges.collect(text, selections)
        return "$targetPath:${LineRanges.format(ranges)}"
    }
}
