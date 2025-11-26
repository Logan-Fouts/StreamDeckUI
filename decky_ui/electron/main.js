const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs').promises;
const path = require('path');
const isDev = require('electron-is-dev');

function createWindow() {
  // Create the browser window
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "./preload.js"),
    },
  });

  // Load the app
  const startUrl = 'http://localhost:3000';
  
  mainWindow.loadURL(startUrl);

  // Open DevTools in development
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// TODO: Clean up 

ipcMain.handle("read-config", async (event) => {
  const configPath = path.join(__dirname, '..', 'buttons.json');

  try {
    const data = await fs.readFile(configPath, 'utf8');
    return JSON.parse(data).buttons;
  } catch (error) {
    console.error("Error reading config file:", error);
    return null;
  }
});

ipcMain.handle("save-config", async (event, buttons) => {
  const configPath = path.join(__dirname, '..', 'buttons.json');
  try {
    await fs.writeFile(configPath, JSON.stringify({ buttons }, null, 2));
    console.log('Config:', buttons);
    return true;
  } catch (error) {
    console.error('Save failed:', error);
    return false;
  }
});
