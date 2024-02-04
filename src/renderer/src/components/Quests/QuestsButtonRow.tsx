import { DeleteQuestButton, NewQuestButton, QuestEditor, QuestTitle } from '@/components'
import { ComponentProps } from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure
} from '@nextui-org/react'

export const QuestButtonRow = ({ ...props }: ComponentProps<'div'>) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <div {...props}>
      <NewQuestButton />
      <Button onPress={onOpen}>Open Quest</Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="sm"
        scrollBehavior="inside"
        hideCloseButton={true}
      >
        <ModalContent className="dark">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <QuestTitle />
              </ModalHeader>
              <ModalBody>
                <QuestEditor />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <DeleteQuestButton />
    </div>
  )
}
