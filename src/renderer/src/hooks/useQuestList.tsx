import { selectedQuestIndexAtom, questsAtom } from '@/store'
import { useAtom, useAtomValue } from 'jotai'

export const useQuestList = ({ onSelect }: { onSelect?: () => void }) => {
  const quests = useAtomValue(questsAtom)

  const [selectedQuestIndex, setSelectedQuestIndex] = useAtom(selectedQuestIndexAtom)

  const handleQuestSelect = (index: number) => async () => {
    setSelectedQuestIndex(index)

    if (onSelect) {
      onSelect()
    }
  }

  return {
    quests,
    selectedQuestIndex,
    handleQuestSelect
  }
}
