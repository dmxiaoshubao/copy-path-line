package com.dmxiaoshubao.copypathline.idea.core

data class SelectionRange(
    val startOffset: Int,
    val endOffset: Int,
    val hasSelection: Boolean,
)
