const fs = require('fs')
const sdk = require('microsoft-cognitiveservices-speech-sdk')
const Config = require('../config/initializers/config')

class Transcript {
  constructor() {}
}

Transcript.speechToText = function(filename, language = 'en-US') {
  const serviceRegion = 'centralus'
  const subscriptionKey = '64471df34e4a4d97a9eee045b88f344e'
  const filePath = Config.uploadDir + filename
  const pushStream = sdk.AudioInputStream.createPushStream()

  fs.createReadStream(filePath)
    .on('data', function(arrayBuffer) {
      pushStream.write(arrayBuffer.buffer)
    })
    .on('end', function() {
      pushStream.close()
    })

  const audioConfig = sdk.AudioConfig.fromStreamInput(pushStream)
  const speechConfig = sdk.SpeechConfig.fromSubscription(
    subscriptionKey,
    serviceRegion
  )

  speechConfig.speechRecognitionLanguage = language

  const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig)
  
  return new Promise((resolve, reject) => {
    let result = []

    recognizer.recognized = (r, event) => {
      result.push(JSON.parse(event.privResult.privJson))
    }
  
    recognizer.sessionStopped = () => {
      resolve(result)
      fs.unlinkSync(filePath)
    }
  
    recognizer.startContinuousRecognitionAsync()
  })
}

module.exports = Transcript
