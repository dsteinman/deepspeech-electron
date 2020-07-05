### DeepSpeech Electron example

Install NPM modules:

```
npm install
npm run rebuild
```

Download example audio files to `/audio` directory

```
wget https://github.com/mozilla/DeepSpeech/releases/download/v0.7.0/audio-0.7.0.tar.gz
tar xfvz audio-0.7.0.tar.gz
```

Download or softlink DeepSpeech 0.7.4 model files to `/models`:

```
mkdir models
cd models
wget https://github.com/mozilla/DeepSpeech/releases/download/v0.7.4/deepspeech-0.7.4-models.pbmm
wget https://github.com/mozilla/DeepSpeech/releases/download/v0.7.4/deepspeech-0.7.4-models.scorer
cd ..
```

Run development version (Mac/Linux):

```
npm run dev
```

Run development version (Windows):

```
export BROWSER=none
npm run dev-win
```


Build package (Mac/Linux):

```
npm run dist
```

Run development version (Windows):

```
export BROWSER=none
npm run dist-win
```