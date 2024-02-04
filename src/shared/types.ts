import { Data, QuestContent, QuestInfo, StatContent, StatInfo } from './models'

export type GetStats = () => Promise<StatInfo[]>
export type GetQuests = () => Promise<QuestInfo[]>

export type ReadStat = (title: StatInfo['title']) => Promise<StatContent>
export type ReadQuest = (title: QuestInfo['title']) => Promise<QuestContent>

export type WriteStat = (title: StatInfo['title'], content: StatContent) => Promise<void>
export type WriteQuest = (title: QuestInfo['title'], content: QuestContent) => Promise<void>

export type CreateStat = () => Promise<StatInfo['title'] | false>
export type CreateQuest = () => Promise<QuestInfo['title'] | false>

export type DeleteStat = (title: StatInfo['title']) => Promise<boolean>
export type DeleteQuest = (title: QuestInfo['title']) => Promise<boolean>

export type ReadDB = (dbName: string) => Promise<Data>
export type WriteDB = (dbName: string, obj: unknown) => Promise<boolean>
