const DeepSpeech = require('deepspeech');
const fs = require('fs');
const wav = require('wav');

// create the model
let modelPath = './models/deepspeech-0.7.4-models.pbmm';
let scorerPath = './models/deepspeech-0.7.4-models.scorer';
let model = new DeepSpeech.Model(modelPath);
model.enableExternalScorer(scorerPath);

// create a file/model stream and return the recognition results
function recognizeFile(path) {
	return new Promise(function(resolve, reject) {
		let modelStream = model.createStream();
		const bufferSize = 512;
		const file = fs.createReadStream(path, {highWaterMark: bufferSize});
		const reader = new wav.Reader();
		reader.on('format', function (format) {
			if (format.sampleRate !== model.sampleRate()) {
				throw new Error('invalid sample rate: '+format.sampleRate);
			}
			reader.on('end', function () {
				const results = modelStream.finishStream();
				resolve(results);
			});
			reader.on('data', function (data) {
				modelStream.feedAudioContent(data);
			});
		});
		file.pipe(reader);
	});
}

module.exports = recognizeFile;