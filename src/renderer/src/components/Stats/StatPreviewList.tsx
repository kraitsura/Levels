import { statsMock } from '@/store/mocks'
import { ComponentProps } from 'react'
import { StatPreview } from './StatPreview'
import { twMerge } from 'tailwind-merge'
import { useStatList } from '@/hooks/useStatsList'
import { isEmpty } from 'lodash'
import { Button } from '@mui/material'
import { StatInfo } from '@shared/models'

export type StatPreviewListProps = ComponentProps<'ul'> & {
  onSelect?: () => void
}

export const StatsPreviewList = ({ onSelect, className, ...props }: StatPreviewListProps) => {
  const { stats, selectedStatIndex, handleStatSelect } = useStatList({ onSelect })

  if (!stats) return null

  if (isEmpty(stats)) {
    return (
      <ul className={twMerge('text-center pt-4', className)} {...props}>
        <span>No Stats Added!</span>
      </ul>
    )
  }

  return (
    <ul className={className} {...props}>
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <StatPreview
            className="col-4"
            key={stat.title + stat.lastEditTime + stat.exp + stat.level}
            isActive={selectedStatIndex === index}
            onClick={handleStatSelect(index)}
            {...stat}
          />
        ))}
      </div>
      {/* <Button onClick={handleStatSelect(-1)}> + </Button> */}
    </ul>
  )
}
