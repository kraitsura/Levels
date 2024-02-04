import { selectedStatAtom, saveStatAtom, saveQuestAtom, selectedQuestAtom } from '@/store'
import { MDXEditorMethods } from '@mdxeditor/editor'
import { autoSavingTime } from '@shared/constants'
import { StatContent } from '@shared/models'
import { throttle } from 'lodash'
import { useAtomValue, useSetAtom } from 'jotai'
import { useRef } from 'react'

export const openStat = () => {
  const selectedStat = useAtomValue(selectedStatAtom)
  const saveStat = useSetAtom(saveStatAtom)
  const editorRef = useRef<MDXEditorMethods>(null)

  const handleAutoSaving = throttle(
    async (content: StatContent) => {
      if (!selectedStat) return

      console.info('Auto saving:', selectedStat.title)

      await saveStat(content)
    },
    autoSavingTime,
    {
      leading: false,
      trailing: true
    }
  )

  const handleBlur = async () => {
    if (!selectedStat) return

    handleAutoSaving.cancel()

    const content = editorRef.current?.getMarkdown()

    if (content != null) {
      await saveStat(content)
    }
  }

  return {
    editorRef,
    selectedStat,
    handleAutoSaving,
    handleBlur
  }
}

export const openQuest = () => {
  const selectedQuest = useAtomValue(selectedQuestAtom)
  const saveQuest = useSetAtom(saveQuestAtom)
  const editorRef = useRef<MDXEditorMethods>(null)

  const handleAutoSaving = throttle(
    async (content: StatContent) => {
      if (!selectedQuest) return

      console.info('Auto saving:', selectedQuest.title)

      await saveQuest(content)
    },
    autoSavingTime,
    {
      leading: false,
      trailing: true
    }
  )

  const handleBlur = async () => {
    if (!selectedQuest) return

    handleAutoSaving.cancel()

    const content = editorRef.current?.getMarkdown()

    if (content != null) {
      await saveQuest(content)
    }
  }

  return {
    editorRef,
    selectedQuest,
    handleAutoSaving,
    handleBlur
  }
}
