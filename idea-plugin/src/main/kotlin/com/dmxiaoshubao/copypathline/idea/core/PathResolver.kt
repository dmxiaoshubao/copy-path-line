package com.dmxiaoshubao.copypathline.idea.core

import java.nio.file.Path

object PathResolver {
    fun resolve(filePath: Path, rootPath: Path?, mode: CopyMode): String {
        if (mode == CopyMode.ABSOLUTE || rootPath == null) {
            return filePath.toString()
        }

        val normalizedRoot = rootPath.normalize()
        val normalizedFile = filePath.normalize()
        val relativePath = normalizedRoot.relativize(normalizedFile).normalize()

        if (relativePath.startsWith("..")) {
            return normalizedFile.toString()
        }

        return relativePath.toString()
    }
}
