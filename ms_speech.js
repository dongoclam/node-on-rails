"use strict";

// pull in the required packages.
var sdk = require("microsoft-cognitiveservices-speech-sdk");
var fs = require("fs");

// replace with your own subscription key,
// service region (e.g., "westus"), and
// the name of the file you want to run
// through the speech recognizer.
var subscriptionKey = "64471df34e4a4d97a9eee045b88f344e";
var serviceRegion = "centralus"; // e.g., "westus"
var filename = "./uploads/audio.wav"; // 16000 Hz, Mono

// create the push stream we need for the speech sdk.
var pushStream = sdk.AudioInputStream.createPushStream();

// open the file and push it to the push stream.
fs.createReadStream(filename)
  .on("data", function(arrayBuffer) {
    pushStream.write(arrayBuffer.buffer);
  })
  .on("end", function() {
    pushStream.close();
  });

// we are done with the setup
console.log("Now recognizing from: " + filename);

// now create the audio-config pointing to our stream and
// the speech config specifying the language.
var audioConfig = sdk.AudioConfig.fromStreamInput(pushStream);
var speechConfig = sdk.SpeechTranslationConfig.fromSubscription(
  subscriptionKey,
  serviceRegion
);

// setting the recognition language to English.
speechConfig.speechRecognitionLanguage = "en-US";
speechConfig.addTargetLanguage('vi');
speechConfig.voiceName = "Lam Do"

// create the speech recognizer.
var recognizer = new sdk.TranslationRecognizer(speechConfig, audioConfig);

// start the recognizer and wait for a result.

recognizer.recognized = (r, event) => {
  console.log(event.privResult);
};

recognizer.sessionStopped = () => {
  console.log('Fucking finished');
}


recognizer.startContinuousRecognitionAsync();
