const formidable = require('formidable')
const Config = require('../config/initializers/config')

class Uploader {
  constructor() {}
}

Uploader.saveFile = function(req) {
  const form = new formidable.IncomingForm();

  form.keepExtensions = true
  form.multiples = false
  form.uploadDir = Config.uploadDir


  form.parse(req, (error, fields, files) => {
    var file = files.sourceFile
  });
}

Uploader.removeFile = function(fileName) {

}

module.exports = Uploader
