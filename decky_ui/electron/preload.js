const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  readConfig: () => ipcRenderer.invoke('read-config'),
  saveConfig: (buttons) => ipcRenderer.invoke('save-config', buttons),
});
