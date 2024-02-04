import { ActionButton, ActionButtonProps } from '@/components'
import { deleteStatAtom, deleteQuestAtom } from '@/store'
import { useSetAtom } from 'jotai'
import { GiAxeSword } from 'react-icons/gi'

export const DeleteStatButton = ({ ...props }: ActionButtonProps) => {
  const deleteStat = useSetAtom(deleteStatAtom)

  const handleDelete = async () => {
    await deleteStat()
  }

  return (
    <ActionButton onClick={handleDelete} {...props}>
      <GiAxeSword className="w-6 h-6 text-zinc-300" />
    </ActionButton>
  )
}

export const DeleteQuestButton = ({ ...props }: ActionButtonProps) => {
  const deleteQuest = useSetAtom(deleteQuestAtom)

  const handleDelete = async () => {
    await deleteQuest()
  }

  return (
    <ActionButton onClick={handleDelete} {...props}>
      <GiAxeSword className="w-6 h-6 text-zinc-300" />
    </ActionButton>
  )
}
