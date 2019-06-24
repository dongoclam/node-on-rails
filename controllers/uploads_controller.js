const ApplicationController = require('./application_controller')
const Transcript = require('../services/transcript')
const Uploader = require('../services/uploader')
const convertVideoToAudio = require('./../services/convert_video')
const wirteSubtitle = require('../services/write_subtitle')
const path = require('path')

class UploadsController extends ApplicationController {
  async create() {
    const file = await Uploader.saveFile(this.req, this.res)
    const filename = path.basename(file.path)
    const ouputFileName = await convertVideoToAudio(filename)
    const result = await Transcript.speechToText(ouputFileName)
    const subtitle = await wirteSubtitle(result)
    this.res.send({subtitle: subtitle})
  }
}

module.exports = UploadsController
