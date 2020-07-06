const electron = require('electron');
const app = electron.app;
const path = require('path');
const createWindow = require('./create-window');
const {getModel} = require('./recognize-wav');
const isDev = require('electron-is-dev');

// in dev mode, use local directory
// in prod mode, use appData
const appDataPath = isDev? __dirname : path.resolve(electron.app.getPath('appData'), 'deepspeech-electron');

app.on('ready', function () {
	getModel(appDataPath, function(model) {
		console.log('model loaded')
		createWindow(model);
	});
});
