import { selectedStatIndexAtom, statsAtom } from '@/store'
import { useAtom, useAtomValue } from 'jotai'

export const useStatList = ({ onSelect }: { onSelect?: () => void }) => {
  const stats = useAtomValue(statsAtom)

  const [selectedStatIndex, setSelectedStatIndex] = useAtom(selectedStatIndexAtom)

  const handleStatSelect = (index: number) => async () => {
    if (index != -1) {
      setSelectedStatIndex(index)

      if (onSelect) {
        onSelect()
      }
    } else {
      setSelectedStatIndex(null)
    }
  }

  return {
    stats,
    selectedStatIndex,
    handleStatSelect
  }
}
