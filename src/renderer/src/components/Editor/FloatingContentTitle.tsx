import { selectedStatAtom, selectedQuestAtom } from '@renderer/store'
import { useAtomValue } from 'jotai'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export const QuestTitle = ({ className, ...props }: ComponentProps<'div'>) => {
  const selectedQuest = useAtomValue(selectedQuestAtom)

  if (selectedQuest == null) return null

  return (
    <div className={twMerge('flex justify-center', className)} {...props}>
      <span className="text-gray-400">{selectedQuest.title}</span>
    </div>
  )
}

export const StatTitle = ({ className, ...props }: ComponentProps<'div'>) => {
  const selectedStat = useAtomValue(selectedStatAtom)

  if (selectedStat == null) return null

  return (
    <div className={twMerge('flex justify-center', className)} {...props}>
      <span className="text-gray-400">{selectedStat.title}</span>
    </div>
  )
}
