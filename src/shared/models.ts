export type StatInfo = {
  title: string
  lastEditTime: number
  exp: number
  level: number
}

export type QuestInfo = {
  title: string
  lastEditTime: number
  rewards: []
  progress: number
  status: boolean
}

export type Data = {
  stats: StatInfo[]
  quests: QuestInfo[]
}

export type StatContent = string
export type QuestContent = string
