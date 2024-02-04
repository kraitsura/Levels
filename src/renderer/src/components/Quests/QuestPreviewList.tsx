import { statsMock } from '@/store/mocks'
import { ComponentProps } from 'react'
import { QuestPreview } from './QuestPreview'
import { twMerge } from 'tailwind-merge'
import { useQuestList } from '@/hooks/useQuestList'
import { isEmpty } from 'lodash'

export type QuestPreviewListProps = ComponentProps<'ul'> & {
  onSelect?: () => void
}

export const QuestPreviewList = ({ onSelect, className, ...props }: QuestPreviewListProps) => {
  const { quests, selectedQuestIndex, handleQuestSelect } = useQuestList({ onSelect })

  if (!quests) return null

  if (isEmpty(quests)) {
    return (
      <ul className={twMerge('text-center pt-4', className)} {...props}>
        <span>No Quests Added!</span>
      </ul>
    )
  }

  return (
    <ul className={className} {...props}>
      {quests.map((quest, index) => (
        <QuestPreview
          key={quest.title + quest.lastEditTime + quest.status + quest.progress}
          isActive={selectedQuestIndex === index}
          onClick={handleQuestSelect(index)}
          {...quest}
        />
      ))}
    </ul>
  )
}
