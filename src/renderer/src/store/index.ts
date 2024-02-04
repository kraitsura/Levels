import { Data, QuestInfo, StatContent, StatInfo } from '@shared/models'
import { atom } from 'jotai'
import { unwrap } from 'jotai/utils'
import { defaultData } from './mocks'
// import db from '../utils/JSONUtils'

// #######################################################
//  Database Atom Handling
// #######################################################

const loadData = async () => {
  const data = await window.context.readDb('db')
  const statFiles = await window.context.getStats()
  const questFiles = await window.context.getQuests()

  //sort them by most recently edited
  return data
}

const dataAtomAsync = atom<Data | Promise<Data>>(loadData())

export const dataAtom = unwrap(dataAtomAsync, (prev) => prev)

// export const selectedDataIndexAtom = atom<number | null>(null)

// const selectedDataAtomAsync = atom(async (get) => {
//   const data = get(dataAtom)
//   const selectedDataIndex = get(selectedDataIndexAtom)

//   if (selectedDataIndex == null || !data) return null

//   const selectedData = data[selectedDataIndex]

//   const dataContent = await window.context.readQuest(selectedData.title)

//   return {
//     ...selectedData
//   }
// })

// export const selectedDataAtom = unwrap(
//   selectedDataAtomAsync,
//   (prev) =>
//     prev ?? {
//       stats: [],
//       quests: []
//     }
// )

// #######################Save Database###########################

export const saveDataAtom = atom(null, async (get, set) => {
  const data = get(dataAtom)

  if (!data) return

  // save on disk
  await window.context.writeDb('db.json', defaultData)
})

// #######################################################
//  Stats Atom Handling
// #######################################################

const loadStats = async () => {
  const stats = await window.context.getStats()

  //sort them by most recently edited
  return stats.sort((a, b) => b.lastEditTime - a.lastEditTime)
}

const statsAtomAsync = atom<StatInfo[] | Promise<StatInfo[]>>(loadStats())

export const statsAtom = unwrap(statsAtomAsync, (prev) => prev)

export const selectedStatIndexAtom = atom<number | null>(null)

const selectedStatAtomAsync = atom(async (get) => {
  const stats = get(statsAtom)
  const selectedStatIndex = get(selectedStatIndexAtom)

  if (selectedStatIndex == null || !stats) return null

  const selectedStat = stats[selectedStatIndex]

  const statContent = await window.context.readStat(selectedStat.title)

  return {
    ...selectedStat,
    content: statContent
  }
})

export const selectedStatAtom = unwrap(
  selectedStatAtomAsync,
  (prev) =>
    prev ?? {
      title: '',
      content: '',
      lastEditTime: Date.now(),
      exp: 0,
      level: 1
    }
)

// #######################Save Stat###########################

export const saveStatAtom = atom(null, async (get, set, newContent: StatContent) => {
  const stats = get(statsAtom)
  const selectedStat = get(selectedStatAtom)

  if (!selectedStat || !stats) return

  // save on disk
  await window.context.writeStat(selectedStat.title, newContent)

  // update the saved note's last edit time
  set(
    statsAtom,
    stats.map((stat) => {
      // this is the note that we want to update
      if (stat.title === selectedStat.title) {
        return {
          ...stat,
          lastEditTime: Date.now()
        }
      }

      return stat
    })
  )
})

// #######################Create Stat###########################

export const createEmptyStatAtom = atom(null, async (get, set) => {
  const stats = get(statsAtom)

  if (!stats) return

  const title = await window.context.createStat()

  if (!title) return

  const newStat: StatInfo = {
    title,
    lastEditTime: Date.now(),
    exp: 0,
    level: 1
  }

  set(statsAtom, [newStat, ...stats.filter((stat) => stat.title != newStat.title)])

  set(selectedStatIndexAtom, 0)
})

// #######################Delete Stat###########################

export const deleteStatAtom = atom(null, async (get, set) => {
  const stats = get(statsAtom)
  const selectedStat = get(selectedStatAtom)

  if (!selectedStat || !stats) return

  const isDeleted = await window.context.deleteStat(selectedStat.title)

  if (!isDeleted) return

  // filter out the deleted note
  set(
    statsAtom,
    stats.filter((stat) => stat.title !== selectedStat.title)
  )

  // de select any note
  set(selectedStatIndexAtom, null)
})

// #######################################################
// Quest Atom Handling
// #######################################################

const loadQuests = async () => {
  const quests = await window.context.getQuests()

  //sort them by most recently edited
  return quests.sort((a, b) => b.lastEditTime - a.lastEditTime)
}

const questsAtomAsync = atom<QuestInfo[] | Promise<QuestInfo[]>>(loadQuests())

export const questsAtom = unwrap(questsAtomAsync, (prev) => prev)

export const selectedQuestIndexAtom = atom<number | null>(null)

const selectedQuestAtomAsync = atom(async (get) => {
  const quests = get(questsAtom)
  const selectedQuestIndex = get(selectedQuestIndexAtom)

  if (selectedQuestIndex == null || !quests) return null

  const selectedQuest = quests[selectedQuestIndex]

  const questContent = await window.context.readQuest(selectedQuest.title)

  return {
    ...selectedQuest,
    content: questContent
  }
})

export const selectedQuestAtom = unwrap(
  selectedQuestAtomAsync,
  (prev) =>
    prev ?? {
      title: '',
      content: '',
      lastEditTime: Date.now(),
      progress: 0,
      status: false
    }
)

// #######################Save Quest###########################

export const saveQuestAtom = atom(null, async (get, set, newContent: StatContent) => {
  const quests = get(questsAtom)
  const selectedQuest = get(selectedQuestAtom)

  if (!selectedQuest || !quests) return

  // save on disk
  await window.context.writeStat(selectedQuest.title, newContent)

  // update the saved note's last edit time
  set(
    questsAtom,
    quests.map((quest) => {
      // this is the note that we want to update
      if (quest.title === selectedQuest.title) {
        return {
          ...quest,
          lastEditTime: Date.now()
        }
      }

      return quest
    })
  )
})

// #######################Create Quest###########################

export const createEmptyQuestAtom = atom(null, async (get, set) => {
  const quests = get(questsAtom)

  if (!quests) return

  const title = await window.context.createQuest()

  if (!title) return

  const newQuest: QuestInfo = {
    title,
    lastEditTime: Date.now(),
    progress: 0,
    rewards: [],
    status: false
  }

  set(questsAtom, [newQuest, ...quests.filter((quest) => quest.title != newQuest.title)])

  set(selectedQuestIndexAtom, 0)
})

// #######################Delete Quest###########################

export const deleteQuestAtom = atom(null, async (get, set) => {
  const quests = get(questsAtom)
  const selectedQuest = get(selectedQuestAtom)

  if (!selectedQuest || !quests) return

  const isDeleted = await window.context.deleteQuest(selectedQuest.title)

  if (!isDeleted) return

  // filter out the deleted note
  set(
    questsAtom,
    quests.filter((quest) => quest.title !== selectedQuest.title)
  )

  // de select any note
  set(selectedQuestIndexAtom, null)
})

// #######################################################
// #######################################################
// #######################################################
