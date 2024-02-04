import {
  CreateQuest,
  CreateStat,
  DeleteQuest,
  DeleteStat,
  GetStats,
  ReadDB,
  ReadQuest,
  ReadStat,
  WriteDB,
  WriteQuest,
  WriteStat
} from '@shared/types'

declare global {
  interface Window {
    // electron: ElectronAPI
    context: {
      locale: string
      getStats: GetStats
      getQuests: GetQuests
      readStat: ReadStat
      readQuest: ReadQuest
      writeStat: WriteStat
      writeQuest: WriteQuest
      createStat: CreateStat
      createQuest: CreateQuest
      deleteStat: DeleteStat
      deleteQuest: DeleteQuest
      readDb: ReadDB
      writeDb: WriteDB
    }
  }
}
