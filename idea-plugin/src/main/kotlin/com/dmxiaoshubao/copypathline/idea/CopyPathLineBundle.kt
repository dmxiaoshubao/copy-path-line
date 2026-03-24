package com.dmxiaoshubao.copypathline.idea

import com.intellij.AbstractBundle
import org.jetbrains.annotations.PropertyKey

object CopyPathLineBundle : AbstractBundle("messages.CopyPathLineBundle") {
    fun message(@PropertyKey(resourceBundle = "messages.CopyPathLineBundle") key: String): String = getMessage(key)
}
