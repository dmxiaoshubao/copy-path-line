package com.dmxiaoshubao.copypathline.idea.actions

import com.dmxiaoshubao.copypathline.idea.core.CopyMode

class CopyRelativePathWithLineAction : BaseCopyPathWithLineAction() {
    override fun copyMode(): CopyMode = CopyMode.RELATIVE
}
