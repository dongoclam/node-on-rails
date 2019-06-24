const speech = require('@google-cloud/speech')
const fs = require('fs')
const Config  = require('../config/initializers/config')

class Transcript {
  constructor() {}
}

Transcript.speechToText = async function(bitmap) {
  const client = new speech.SpeechClient()
  const filename = Config.uploadDir + 'lesson41_ShareAppsCrack.com.mp4'
  const audio = {
    content: fs.readFileSync(filename).toString('base64')
  }

  const config = {
    encoding: 'LINEAR16',
    sampleRateHertz: 16000,
    languageCode: 'en-US',
  }

  const request = {
    config: config,
    audio: audio,
  }

  const [response] = await client.recognize(request);
  const transcription = response.results
    .map(result => result.alternatives[0].transcript)
    .join('\n');
  console.log(`Transcription: `, transcription);
}


module.exports = Transcript
