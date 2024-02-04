import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin
} from '@mdxeditor/editor'
import { openQuest, openStat } from '@renderer/hooks/useEditor'
import { StatTitle } from './FloatingContentTitle'
import { IconButton, Box, Button } from '@mui/material'
import Modal from '@mui/material/Modal'
import { GiScrollQuill } from 'react-icons/gi'
import React from 'react'

export const StatEditor = () => {
  const { editorRef, selectedStat, handleAutoSaving, handleBlur } = openStat()
  if (!selectedStat) return null

  return (
    <MDXEditor
      ref={editorRef}
      key={selectedStat.title}
      markdown={selectedStat.content}
      // onChange={handleAutoSaving}
      onBlur={handleBlur}
      plugins={[headingsPlugin(), listsPlugin(), quotePlugin(), markdownShortcutPlugin()]}
      contentEditableClassName="outline-none min-h-screen max-w-none text-lg px-8 py-5 caret-yellow-500 prose prose-invert prose-p:my-3 prose-p:leading-relaxed prose-headings:my-4 prose-blockquote:my-4 prose-ul:my-2 prose-li:my-0 prose-code:px-1 prose-code:text-red-500 prose-code:before:content-[''] prose-code:after:content-['']"
    />
  )
}

export const QuestEditor = () => {
  const { editorRef, selectedQuest, handleAutoSaving, handleBlur } = openQuest()
  if (!selectedQuest) return null

  return (
    <MDXEditor
      ref={editorRef}
      key={selectedQuest.title}
      markdown={selectedQuest.content}
      onChange={handleAutoSaving}
      onBlur={handleBlur}
      plugins={[headingsPlugin(), listsPlugin(), quotePlugin(), markdownShortcutPlugin()]}
      contentEditableClassName="outline-none min-h-screen max-w-none text-lg px-8 py-5 caret-yellow-500 prose prose-invert prose-p:my-3 prose-p:leading-relaxed prose-headings:my-4 prose-blockquote:my-4 prose-ul:my-2 prose-li:my-0 prose-code:px-1 prose-code:text-red-500 prose-code:before:content-[''] prose-code:after:content-['']"
    />
  )
}

const style = {
  position: 'relative',
  width: 400,
  bgcolor: 'black',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflow: scroll
};

export const GenStatModal = () => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <IconButton size="small" onClick={handleOpen}>
        <GiScrollQuill />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <StatTitle />
          <StatEditor />
        </Box>
      </Modal>
    </div>
  )
}
