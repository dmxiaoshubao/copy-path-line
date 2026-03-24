package com.dmxiaoshubao.copypathline.idea.core

import kotlin.test.Test
import kotlin.test.assertEquals
import java.nio.file.Paths

class PathResolverTest {
    @Test
    fun `relative path inside root is preserved`() {
        val result = PathResolver.resolve(
            filePath = Paths.get("/workspace/src/App.kt"),
            rootPath = Paths.get("/workspace"),
            mode = CopyMode.RELATIVE,
        )

        assertEquals(Paths.get("src/App.kt").toString(), result)
    }

    @Test
    fun `relative mode falls back to absolute outside root`() {
        val result = PathResolver.resolve(
            filePath = Paths.get("/outside/App.kt"),
            rootPath = Paths.get("/workspace"),
            mode = CopyMode.RELATIVE,
        )

        assertEquals(Paths.get("/outside/App.kt").toString(), result)
    }

    @Test
    fun `absolute mode keeps absolute path`() {
        val result = PathResolver.resolve(
            filePath = Paths.get("/workspace/src/App.kt"),
            rootPath = Paths.get("/workspace"),
            mode = CopyMode.ABSOLUTE,
        )

        assertEquals(Paths.get("/workspace/src/App.kt").toString(), result)
    }

    @Test
    fun `copy text builder formats merged ranges`() {
        val text = """
            a
            b
            c
            d
            e
        """.trimIndent()
        val result = CopyTextBuilder.build(
            text = text,
            filePath = Paths.get("/workspace/src/App.kt"),
            rootPath = Paths.get("/workspace"),
            selections = listOf(
                SelectionRange(0, 5, true),
                SelectionRange(6, 9, true),
            ),
            mode = CopyMode.RELATIVE,
        )

        assertEquals(Paths.get("src/App.kt").toString() + ":1-5", result)
    }
}
