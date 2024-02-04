import { QuestInfo } from '@shared/models'
import { ComponentProps } from 'react'
import { cn, formatDateFromMs } from '@renderer/utils'

export type QuestPreviewProps = QuestInfo & {
  isActive?: boolean
} & ComponentProps<'div'>

export const QuestPreview = ({
  title,
  content,
  lastEditTime,
  rewards,
  progress,
  status,
  isActive = false,
  className,
  ...props
}: QuestPreviewProps) => {
  const date = formatDateFromMs(lastEditTime)

  return (
    <div
      className={cn(
        'cursor-pointer px-2.5 py-3 rounded-md transition-colors duration-75',
        {
          'bg-zinc-400/75': isActive,
          'hover:bg-zinc-500/75': !isActive
        },
        className
      )}
      {...props}
    >
      <div className="grid grid-rows-1 grid-flow-col gap-10">
        <h3 className="mb-1 col-span-1 font-bold truncate">{title}</h3>
        <h2 className="mb-1 col-span-3">{rewards}</h2>
      </div>

      {/* <span className="inline-block w-full mb-2 text-xs font-light text-left">{date}</span> */}
    </div>
  )
}
