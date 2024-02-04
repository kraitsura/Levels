"use strict";
const electron = require("electron");
if (!process.contextIsolated) {
  throw new Error("contextIsolation must be enabled in the BrowserWindow");
}
try {
  electron.contextBridge.exposeInMainWorld("context", {
    locale: navigator.language,
    getStats: (...args) => electron.ipcRenderer.invoke("getStats", ...args),
    readStat: (...args) => electron.ipcRenderer.invoke("readStat", ...args),
    writeStat: (...args) => electron.ipcRenderer.invoke("writeStat", ...args),
    createStat: (...args) => electron.ipcRenderer.invoke("createStat", ...args),
    deleteStat: (...args) => electron.ipcRenderer.invoke("deleteStat", ...args),
    getQuests: (...args) => electron.ipcRenderer.invoke("getQuests", ...args),
    readQuest: (...args) => electron.ipcRenderer.invoke("readQuest", ...args),
    writeQuest: (...args) => electron.ipcRenderer.invoke("writeQuest", ...args),
    createQuest: (...args) => electron.ipcRenderer.invoke("createQuest", ...args),
    deleteQuest: (...args) => electron.ipcRenderer.invoke("deleteQuest", ...args),
    readDb: (...args) => electron.ipcRenderer.invoke("readDb", ...args),
    writeDb: (...args) => electron.ipcRenderer.invoke("writeDb", ...args)
  });
} catch (error) {
  console.error(error);
}
