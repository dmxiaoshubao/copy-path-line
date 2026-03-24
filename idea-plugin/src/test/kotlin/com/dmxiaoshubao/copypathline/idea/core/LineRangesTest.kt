package com.dmxiaoshubao.copypathline.idea.core

import kotlin.test.Test
import kotlin.test.assertEquals

class LineRangesTest {
    @Test
    fun `empty selection uses current line`() {
        val result = LineRanges.collect(
            text = sampleText(),
            selections = listOf(SelectionRange(startOffset = 2, endOffset = 2, hasSelection = false)),
        )

        assertEquals(listOf(LineRange(1, 1)), result)
    }

    @Test
    fun `selection ending at next line start excludes trailing line`() {
        val text = "one\ntwo\nthree\n"
        val result = LineRanges.collect(
            text = text,
            selections = listOf(
                SelectionRange(
                    startOffset = 0,
                    endOffset = text.indexOf("three"),
                    hasSelection = true,
                ),
            ),
        )

        assertEquals(listOf(LineRange(1, 2)), result)
    }

    @Test
    fun `ranges are sorted and merged`() {
        val text = sampleText()
        val result = LineRanges.collect(
            text = text,
            selections = listOf(
                SelectionRange(text.indexOf("eight"), text.length, true),
                SelectionRange(0, text.indexOf("three"), true),
                SelectionRange(text.indexOf("three"), text.indexOf("six"), true),
                SelectionRange(text.indexOf("five"), text.indexOf("six"), true),
            ),
        )

        assertEquals(listOf(LineRange(1, 5), LineRange(8, 9)), result)
    }

    @Test
    fun `format matches sparse multi selection output`() {
        val text = sampleText()
        val ranges = LineRanges.collect(
            text = text,
            selections = listOf(
                SelectionRange(0, text.indexOf("four"), true),
                SelectionRange(text.indexOf("five"), text.indexOf("seven"), true),
                SelectionRange(text.indexOf("eight"), text.length, true),
            ),
        )

        assertEquals("1-3,5-6,8-9", LineRanges.format(ranges))
    }

    @Test
    fun `crlf text is handled correctly`() {
        val text = "a\r\nb\r\nc\r\n"
        val result = LineRanges.collect(
            text = text,
            selections = listOf(SelectionRange(0, text.indexOf("c"), true)),
        )

        assertEquals(listOf(LineRange(1, 2)), result)
    }

    private fun sampleText(): String = """
        one
        two
        three
        four
        five
        six
        seven
        eight
        nine
    """.trimIndent()
}
