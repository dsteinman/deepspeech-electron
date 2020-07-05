const electron = require('electron');
const Path = require('path');
const app = electron.app;
const ipcMain = electron.ipcMain;
const BrowserWindow = electron.BrowserWindow;
const isDev = require('electron-is-dev');
if (isDev) process.env.NODE_ENV = 'dev';

let mainWindow;

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 480,
		height: 540,
		webPreferences: {
			// allow code inside this window to use use native window.open()
			nativeWindowOpen: true,
			nodeIntegration: true,
			nodeIntegrationInWorker: false,
			preload: __dirname + '/preload.js'
		}
	});
	
	mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${Path.join(__dirname, '../build/index.html')}`);
	
	if (isDev) {
		// mainWindow.webContents.openDevTools();
	}
	
	mainWindow.on('closed', () => mainWindow = null);

	app.on('window-all-closed', () => {
		app.quit()
	});
	
	return mainWindow;
}

module.exports = createWindow;