
const ApplicationController = require('./application_controller')
const Transcript = require('../services/transcript')

class UploadsController extends ApplicationController {
  create() {
    Transcript.speechToText()
  }
}

module.exports = UploadsController
