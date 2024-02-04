import {
  CreateStat,
  DeleteStat,
  GetQuests,
  GetStats,
  ReadDB,
  ReadStat,
  WriteDB,
  WriteStat
} from '@shared/types'
import { contextBridge, ipcRenderer } from 'electron'

if (!process.contextIsolated) {
  throw new Error('contextIsolation must be enabled in the BrowserWindow')
}

try {
  contextBridge.exposeInMainWorld('context', {
    locale: navigator.language,
    getStats: (...args: Parameters<GetStats>) => ipcRenderer.invoke('getStats', ...args),
    readStat: (...args: Parameters<ReadStat>) => ipcRenderer.invoke('readStat', ...args),
    writeStat: (...args: Parameters<WriteStat>) => ipcRenderer.invoke('writeStat', ...args),
    createStat: (...args: Parameters<CreateStat>) => ipcRenderer.invoke('createStat', ...args),
    deleteStat: (...args: Parameters<DeleteStat>) => ipcRenderer.invoke('deleteStat', ...args),
    getQuests: (...args: Parameters<GetQuests>) => ipcRenderer.invoke('getQuests', ...args),
    readQuest: (...args: Parameters<ReadStat>) => ipcRenderer.invoke('readQuest', ...args),
    writeQuest: (...args: Parameters<WriteStat>) => ipcRenderer.invoke('writeQuest', ...args),
    createQuest: (...args: Parameters<CreateStat>) => ipcRenderer.invoke('createQuest', ...args),
    deleteQuest: (...args: Parameters<DeleteStat>) => ipcRenderer.invoke('deleteQuest', ...args),
    readDb: (...args: Parameters<ReadDB>) => ipcRenderer.invoke('readDb', ...args),
    writeDb: (...args: Parameters<WriteDB>) => ipcRenderer.invoke('writeDb', ...args)
  })
} catch (error) {
  console.error(error)
}
