package com.dmxiaoshubao.copypathline.idea.actions

import com.dmxiaoshubao.copypathline.idea.CopyPathLineBundle
import com.dmxiaoshubao.copypathline.idea.core.CopyMode
import com.dmxiaoshubao.copypathline.idea.core.CopyTextBuilder
import com.dmxiaoshubao.copypathline.idea.core.SelectionRange
import com.intellij.openapi.actionSystem.ActionUpdateThread
import com.intellij.openapi.actionSystem.AnActionEvent
import com.intellij.openapi.actionSystem.CommonDataKeys
import com.intellij.openapi.ide.CopyPasteManager
import com.intellij.openapi.editor.Editor
import com.intellij.openapi.project.DumbAwareAction
import com.intellij.openapi.project.Project
import com.intellij.openapi.roots.ProjectRootManager
import com.intellij.openapi.ui.Messages
import com.intellij.openapi.vfs.VirtualFile
import java.awt.datatransfer.StringSelection
import java.nio.file.Path
import java.nio.file.Paths

abstract class BaseCopyPathWithLineAction : DumbAwareAction() {
    override fun getActionUpdateThread(): ActionUpdateThread = ActionUpdateThread.BGT

    override fun update(event: AnActionEvent) {
        val editor = event.getData(CommonDataKeys.EDITOR)
        val virtualFile = event.getData(CommonDataKeys.VIRTUAL_FILE)
        val enabled = editor != null && virtualFile != null && virtualFile.isInLocalFileSystem

        event.presentation.isEnabledAndVisible = enabled
    }

    override fun actionPerformed(event: AnActionEvent) {
        val editor = event.getData(CommonDataKeys.EDITOR)
        val virtualFile = event.getData(CommonDataKeys.VIRTUAL_FILE)

        if (editor == null || virtualFile == null || !virtualFile.isInLocalFileSystem) {
            showError(event.project)
            return
        }

        val text = CopyTextBuilder.build(
            text = editor.document.charsSequence,
            filePath = Paths.get(virtualFile.path),
            rootPath = resolveRootPath(event.project, virtualFile),
            selections = editor.caretModel.allCarets.map { caret ->
                SelectionRange(
                    startOffset = if (caret.hasSelection()) caret.selectionStart else caret.offset,
                    endOffset = if (caret.hasSelection()) caret.selectionEnd else caret.offset,
                    hasSelection = caret.hasSelection(),
                )
            },
            mode = copyMode(),
        )

        CopyPasteManager.getInstance().setContents(StringSelection(text))
    }

    protected abstract fun copyMode(): CopyMode

    private fun resolveRootPath(project: Project?, virtualFile: VirtualFile): Path? {
        if (project == null) {
            return null
        }

        val fileIndex = ProjectRootManager.getInstance(project).fileIndex
        val contentRoot = fileIndex.getContentRootForFile(virtualFile, false)
        val rootPath = contentRoot?.path ?: project.basePath
        return rootPath?.let(Paths::get)
    }

    private fun showError(project: Project?) {
        Messages.showErrorDialog(
            project,
            CopyPathLineBundle.message("error.noLocalFile"),
            CopyPathLineBundle.message("plugin.name"),
        )
    }
}
