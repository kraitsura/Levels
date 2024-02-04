import { useRef } from 'react'
import {
  QuestEditor,
  StatEditor,
  RootLayout,
  StatArea,
  QuestSidebar,
  StatButtonRow,
  QuestButtonRow,
  StatsPreviewList,
  QuestPreviewList,
  Editor,
  QuestTitle,
  ImageArea,
  StatTitle
} from './components'
import { DraggableTopBar } from './components/DraggableTopBar'
import url from './assets/rpg.jpeg'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure
} from '@nextui-org/react'
import { Box } from '@mui/material'

const App = () => {
  const contentContainerRef = useRef<HTMLDivElement>(null)

  const resetScroll = () => {
    contentContainerRef.current?.scrollTo(0, 0)
  }

  return (
    <>
      <DraggableTopBar />
      <RootLayout>
        <ImageArea className="flex-0">
          {/* <img src={url} /> */}
          <Box component="img" alt="Character Image" src={url} />
        </ImageArea>
        <StatArea className="statrow p-2">
          <StatButtonRow className="flex justify-between mt-1" />
          <StatsPreviewList className="mt-3 space-y-1" onSelect={resetScroll} />
        </StatArea>
        <QuestSidebar className="p-2">
          <QuestButtonRow className="flex  justify-between mt-1" />
          <QuestPreviewList className="mt-3 space-y-1" onSelect={resetScroll} />
        </QuestSidebar>
      </RootLayout>
    </>
  )
}

export default App
