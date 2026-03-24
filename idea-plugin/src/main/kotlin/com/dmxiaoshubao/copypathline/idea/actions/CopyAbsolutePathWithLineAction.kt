package com.dmxiaoshubao.copypathline.idea.actions

import com.dmxiaoshubao.copypathline.idea.core.CopyMode

class CopyAbsolutePathWithLineAction : BaseCopyPathWithLineAction() {
    override fun copyMode(): CopyMode = CopyMode.ABSOLUTE
}
