import { DeleteStatButton, NewStatButton, StatEditor, StatTitle } from '@/components'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure
} from '@nextui-org/react'
import { ComponentProps } from 'react'

export const StatButtonRow = ({ ...props }: ComponentProps<'div'>) => {
  return (
    <div {...props}>
      <NewStatButton />
      <DeleteStatButton />
    </div>
  )
}
