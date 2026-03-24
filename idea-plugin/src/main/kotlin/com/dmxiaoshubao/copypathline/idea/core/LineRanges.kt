package com.dmxiaoshubao.copypathline.idea.core

object LineRanges {
    fun collect(text: CharSequence, selections: List<SelectionRange>): List<LineRange> {
        if (selections.isEmpty()) {
            return emptyList()
        }

        val lineMap = LineOffsetMap(text)
        return normalize(selections.map { selectionToRange(lineMap, it) })
    }

    fun format(ranges: List<LineRange>): String =
        ranges.joinToString(",") { range ->
            if (range.start == range.end) "${range.start}" else "${range.start}-${range.end}"
        }

    private fun selectionToRange(lineMap: LineOffsetMap, selection: SelectionRange): LineRange {
        val startOffset = selection.startOffset.coerceAtLeast(0)
        val endOffset = selection.endOffset.coerceAtLeast(0)
        val startLine = lineMap.lineForOffset(startOffset) + 1
        var endLine = lineMap.lineForOffset(endOffset) + 1

        if (selection.hasSelection && endOffset > startOffset && lineMap.isLineStart(endOffset) && endLine > startLine) {
            endLine -= 1
        }

        return LineRange(startLine, maxOf(startLine, endLine))
    }

    private fun normalize(ranges: List<LineRange>): List<LineRange> {
        if (ranges.isEmpty()) {
            return emptyList()
        }

        val sorted = ranges.sortedWith(compareBy(LineRange::start, LineRange::end))
        val merged = mutableListOf<LineRange>()

        for (range in sorted) {
            val previous = merged.lastOrNull()
            if (previous == null) {
                merged += range
                continue
            }

            if (range.start <= previous.end + 1) {
                merged[merged.lastIndex] = LineRange(previous.start, maxOf(previous.end, range.end))
                continue
            }

            merged += range
        }

        return merged
    }

    private class LineOffsetMap(text: CharSequence) {
        private val lineStarts: IntArray = buildList {
            add(0)
            text.forEachIndexed { index, char ->
                if (char == '\n' && index + 1 <= text.length) {
                    add(index + 1)
                }
            }
        }.toIntArray()

        fun lineForOffset(offset: Int): Int {
            val normalized = offset.coerceIn(0, maxLineOffset())
            var low = 0
            var high = lineStarts.lastIndex
            var result = 0

            while (low <= high) {
                val middle = (low + high) ushr 1
                if (lineStarts[middle] <= normalized) {
                    result = middle
                    low = middle + 1
                } else {
                    high = middle - 1
                }
            }

            return result
        }

        fun isLineStart(offset: Int): Boolean = lineStarts.binarySearch(offset) >= 0

        private fun maxLineOffset(): Int = lineStarts.last()
    }
}
