const electron = require('electron');
const ipcMain = electron.ipcMain;
const app = electron.app;
const fs = require('fs');
const path = require('path');
const createWindow = require('./create-window');
const recognizeFile = require('./recognize-file');

ipcMain.handle('recognize-file', async function(event, file) {
	let filePath = path.resolve(__dirname,'..','audio',file);
	return recognizeFile(filePath)
});

ipcMain.handle('load-files', function(event) {
	return new Promise(function(resolve, reject) {
		let audioPath = path.resolve(__dirname,'..','audio');
		console.log('load-files', audioPath);
		fs.readdir(audioPath, function (err, files) {
			console.log('files', files);
			files = files.filter(function(file) {
				return file.endsWith('.wav');
			});
			resolve(files);
		});
	});
});

app.on('ready', function () {
	createWindow();
});
