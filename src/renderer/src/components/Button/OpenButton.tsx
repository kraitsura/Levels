import { ActionButton, ActionButtonProps } from '@/components'
import { createEmptyStatAtom, createEmptyQuestAtom, saveDataAtom } from '@renderer/store'
import { defaultData } from '@renderer/store/mocks'
import { useSetAtom } from 'jotai'
import { GiAxeSwing } from 'react-icons/gi'

export const OpenEditor = ({ ...props }: ActionButtonProps) => {
  const createEmptyStat = useSetAtom(createEmptyStatAtom)

  const handleCreation = async () => {
    await createEmptyStat()
  }

  return (
    <ActionButton onClick={handleCreation} {...props}>
      <GiAxeSwing className="w-6 h-6 text-zinc-300" />
    </ActionButton>
  )
}