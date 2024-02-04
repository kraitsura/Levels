// in NODE JS for File System API'
import { dialog } from 'electron'
import { ensureDir, ensureFile, readFile, readdir, remove, stat, writeFile } from 'fs-extra'
import { isEmpty } from 'lodash'
import { homedir } from 'os'
import path from 'path'
import welcomeFile from '../../../resources/welcome.md?asset'
import { appDirectoryName, fileEncoding, welcomeNoteFilename } from '../../shared/constants'
import { QuestInfo, StatInfo } from '../../shared/models'
import {
  CreateQuest,
  CreateStat,
  DeleteQuest,
  DeleteStat,
  GetQuests,
  GetStats,
  ReadQuest,
  ReadStat,
  WriteStat
} from '../../shared/types'

export const getRootDir = () => {
  return `${homedir()}/${appDirectoryName}`
}

export const getQuestDir = () => {
  return `${homedir()}/${appDirectoryName}/Quests`
}

export const getStatDir = () => {
  return `${homedir()}/${appDirectoryName}/Stats`
}

// ###########################################################################################
// GET FILES
// ###########################################################################################

export const getStatFiles: GetStats = async () => {
  const rootDir = getStatDir()

  await ensureDir(rootDir)

  const statFiles = await readdir(rootDir, {
    encoding: fileEncoding,
    withFileTypes: false
  })

  let statFileNames = statFiles.filter((fileName) => fileName.endsWith('.md'))

  statFileNames = statFileNames.map((stat) => stat.replace('.md', ''))

  const data = await readDatabase('db')

  data.stats.forEach(async (stat) => {
    if (!statFileNames.includes(stat.title)) {
      console.info('Stat Note not found, creating....')

      const content = await readFile(welcomeFile, { encoding: fileEncoding })

      // create the welcome note
      await writeFile(`${rootDir}/${stat.title}.md`, content, { encoding: fileEncoding })
      const generatedFileName = stat.title + '.md'
      statFileNames.push(generatedFileName)
    }
  })

  // if (isEmpty(statFileNames)) {
  //   console.info('No notes found, creating a welcome note')

  //   const content = await readFile(welcomeFile, { encoding: fileEncoding })

  //   // create the welcome note
  //   await writeFile(`${rootDir}/${welcomeNoteFilename}`, content, { encoding: fileEncoding })

  //   statFileNames.push(welcomeNoteFilename)
  // }

  return Promise.all(statFileNames.map(getStatInfoFromFilename))
}

// ###########################################################################################

export const getQuestFiles: GetQuests = async () => {
  const rootDir = getQuestDir()

  await ensureDir(rootDir)

  const questsFileNames = await readdir(rootDir, {
    encoding: fileEncoding,
    withFileTypes: false
  })

  const quests = questsFileNames.filter((fileName) => fileName.endsWith('.md'))

  if (isEmpty(quests)) {
    console.info('No notes found, creating a welcome note')

    const content = await readFile(welcomeFile, { encoding: fileEncoding })

    // create the welcome note
    await writeFile(`${rootDir}/${welcomeNoteFilename}`, content, { encoding: fileEncoding })

    quests.push(welcomeNoteFilename)
  }

  return Promise.all(quests.map(getQuestInfoFromFilename))
}

// ###########################################################################################
// GET INFO FROM FILE
// ###########################################################################################

export const getStatInfoFromFilename = async (filename: string): Promise<StatInfo> => {
  const fileStatistics = await stat(`${getStatDir()}/${filename}.md`)
  const fName = filename.replace(/\.md$/, '')
  const data = readDatabase('db')
  const stats = (await data).stats
  const found = stats.find((stat) => stat.title === fName)
  return {
    title: found?.title || '',
    lastEditTime: fileStatistics.mtimeMs,
    exp: found?.exp || 0,
    level: found?.level || 1
  }
}

// ###########################################################################################

export const getQuestInfoFromFilename = async (filename: string): Promise<QuestInfo> => {
  const fileStatistics = await stat(`${getQuestDir()}/${filename}`)

  return {
    title: filename.replace(/\.md$/, ''),
    lastEditTime: fileStatistics.mtimeMs,
    progress: 0,
    rewards: [],
    status: false
  }
}

// ###########################################################################################
// READ
// ###########################################################################################

export const readStatFile: ReadStat = async (filename) => {
  const rootDir = getStatDir()

  return readFile(`${rootDir}/${filename}.md`, { encoding: fileEncoding })
}

// ###########################################################################################

export const readQuestFile: ReadQuest = async (filename) => {
  const rootDir = getQuestDir()

  return readFile(`${rootDir}/${filename}.md`, { encoding: fileEncoding })
}

// ###########################################################################################
// WRITE
// ###########################################################################################

export const writeStatFile: WriteStat = async (filename, content) => {
  const rootDir = getStatDir()

  console.info(`Writing Over ${filename}`)

  return writeFile(`${rootDir}/${filename}.md`, content, { encoding: fileEncoding })
}

// ###########################################################################################

export const writeQuestFile: WriteStat = async (filename, content) => {
  const rootDir = getQuestDir()

  console.info(`Writing Over ${filename}`)

  return writeFile(`${rootDir}/${filename}.md`, content, { encoding: fileEncoding })
}

// ###########################################################################################
// CREATE
// ###########################################################################################

export const createStatFile: CreateStat = async () => {
  const rootDir = getStatDir()

  await ensureDir(rootDir)

  const { filePath, canceled } = await dialog.showSaveDialog({
    title: 'New note',
    defaultPath: `${rootDir}/Untitled.md`,
    buttonLabel: 'Create',
    properties: ['showOverwriteConfirmation'],
    showsTagField: false,
    filters: [{ name: 'Markdown', extensions: ['md'] }]
  })

  if (canceled || !filePath) {
    console.info('Stat creation canceled')
    return false
  }

  const { name: filename, dir: parentDir } = path.parse(filePath)

  if (parentDir !== rootDir) {
    await dialog.showMessageBox({
      type: 'error',
      title: 'Creation failed',
      message: `All Files must be saved under ${rootDir}.
      Avoid using other directories!`
    })

    return false
  }

  console.info(`Creating: ${filePath}`)
  await writeFile(filePath, '')

  statEntryDB(filename)

  return filename
}

// ###########################################################################################

export const createQuestFile: CreateQuest = async () => {
  const rootDir = getQuestDir()

  await ensureDir(rootDir)

  const { filePath, canceled } = await dialog.showSaveDialog({
    title: 'New',
    defaultPath: `${rootDir}/Untitled.md`,
    buttonLabel: 'Create',
    properties: ['showOverwriteConfirmation'],
    showsTagField: false,
    filters: [{ name: 'Markdown', extensions: ['md'] }]
  })

  if (canceled || !filePath) {
    console.info('Quest creation canceled')
    return false
  }

  const { name: filename, dir: parentDir } = path.parse(filePath)

  if (parentDir !== rootDir) {
    await dialog.showMessageBox({
      type: 'error',
      title: 'Creation failed',
      message: `All Files must be saved under ${rootDir}.
      Avoid using other directories!`
    })

    return false
  }

  console.info(`Creating: ${filePath}`)
  await writeFile(filePath, '')

  return filename
}

// ###########################################################################################
// DELETE
// ###########################################################################################

export const deleteStatFile: DeleteStat = async (filename) => {
  const rootDir = getStatDir()

  const { response } = await dialog.showMessageBox({
    type: 'warning',
    title: 'Delete stat',
    message: `Are you sure you want to delete ${filename}?`,
    buttons: ['Delete', 'Cancel'], // 0 is Delete, 1 is Cancel
    defaultId: 1,
    cancelId: 1
  })

  if (response === 1) {
    console.info('Note deletion canceled')
    return false
  }

  console.info(`Deleting stat: ${filename}`)
  await remove(`${rootDir}/${filename}.md`)

  statDelDB(filename)

  return true
}

// ###########################################################################################

export const deleteQuestFile: DeleteQuest = async (filename) => {
  const rootDir = getQuestDir()

  const { response } = await dialog.showMessageBox({
    type: 'warning',
    title: 'Delete quest',
    message: `Are you sure you want to delete ${filename}?`,
    buttons: ['Delete', 'Cancel'], // 0 is Delete, 1 is Cancel
    defaultId: 1,
    cancelId: 1
  })

  if (response === 1) {
    console.info('Quest deletion canceled')
    return false
  }

  console.info(`Deleting: ${filename}`)
  await remove(`${rootDir}/${filename}.md`)
  return true
}

// ###########################################################################################
// Database
// ###########################################################################################

export const readDatabase = async (
  dbName: string
): Promise<{ quests: QuestInfo[]; stats: StatInfo[] }> => {
  ensureFile(`${dbName}.json`)
  const data = await readFile(`${dbName}.json`, 'utf-8')
  const parsedData = JSON.parse(data)

  if (!parsedData) {
    console.log(`Failed to read database: ${dbName}`)
    return { quests: [], stats: [] }
  }

  const { quests, stats } = parsedData

  return {
    quests: Array.isArray(quests) ? quests : [],
    stats: Array.isArray(stats) ? stats : []
  }
}
export const writeDatabase = async (dbName: string, data: unknown): Promise<boolean> => {
  try {
    const filePath = `${dbName}.json`
    ensureFile(filePath)
    await writeFile(filePath, JSON.stringify(data, null, 2))
    console.log(`${dbName} database write successful`)
    return true
  } catch (error) {
    console.error(`Failed to write to ${dbName} database`, error)
    return false
  }
}

export const statEntryDB = async (newStatTitle: string): Promise<boolean> => {
  const dbName = 'db'
  const data = await readDatabase(dbName)
  const newStatInfo = {
    title: newStatTitle,
    lastEditTime: Date.now(),
    exp: 0,
    level: 1
  }
  data.stats.push(newStatInfo)
  return await writeDatabase(dbName, data)
}

export const statDelDB = async (statTitle: string): Promise<boolean> => {
  const dbName = 'db'
  const data = await readDatabase(dbName)
  const statIndex = data.stats.findIndex((stat) => stat.title === statTitle)
  if (statIndex !== -1) {
    data.stats.splice(statIndex, 1)
    return await writeDatabase(dbName, data)
  } else {
    console.error(`Stat with title ${statTitle} not found`)
    return false
  }
}
