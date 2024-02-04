import { StatInfo } from '@shared/models'
import { ComponentProps } from 'react'
import { cn, formatDateFromMs } from '@renderer/utils'
import { GenStatModal } from '../Editor/MarkdownEditor'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure
} from '@nextui-org/react'
import { StatTitle } from '../Editor/FloatingContentTitle'
import { StatEditor } from '../Editor/MarkdownEditor'

export type StatPreviewProps = StatInfo & {
  isActive?: boolean
} & ComponentProps<'div'>

export const StatPreview = ({
  title,
  content,
  lastEditTime,
  exp,
  level,
  isActive = false,
  className,
  ...props
}: StatPreviewProps) => {
  const date = formatDateFromMs(lastEditTime)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <div
      className={cn(
        'cursor-pointer rounded-md transition-colors duration-3',
        {
          // 'bg-zinc-900/25': isActive
          'hover:bg-red-900/100': !isActive || isActive
        },
        className
      )}
      {...props}
    >
      <div className="h-[100px] p-3 bg-transparent flex-row">
        <div>
          <div className="font-bold text-xs truncate">{title}</div>
          <div className="text-xs">{exp}%</div>
          <div className="text-xs">Lv.{level}</div>
          {/* <div className="text-xs font-light text-left">{date}</div> */}
        </div>
        <GenStatModal />
      </div>
    </div>
  )
}
