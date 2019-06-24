const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
const Config = require('../config/initializers/config')
const crypto = require('crypto')

ffmpeg.setFfmpegPath(ffmpegPath);

function convertVideoToAudio(videoName, callback) {
  const videoPath = Config.uploadDir + videoName
  const audioName = crypto.randomBytes(16).toString("hex") + ".wav"
  const audioPath = Config.uploadDir + audioName
  
  return new Promise((resolve, reject) => {
    ffmpeg(videoPath)
      .withNoVideo()
      .outputFormat('wav')
      .audioChannels(1)
      .audioBitrate(128)
      .audioFrequency(16000)
      .save(audioPath)
      .on('end', () => {
        resolve(audioName)
      })
  })
}

module.exports = convertVideoToAudio
