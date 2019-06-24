const formidable = require('formidable')
const Config = require('../config/initializers/config')

class Uploader {
  constructor() {}
}

Uploader.form = new formidable.IncomingForm()
Uploader.form.multiples = false
Uploader.form.keepExtensions = true
Uploader.form.uploadDir = Config.uploadDir
Uploader.form.maxFileSize = 200 * 1024 * 1024;

Uploader.saveFile = async function(req, res, callback) {
  this.form.onPart = (part) => {
    if (!part.filename || part.mime.match(/audio\/|video\//)) {
      this.form.handlePart(part);
    } else {
      res.send({error: 'File type not allowed'})
    }
  }

  this.form.parse(req)

  this.form.on('fileBegin', (field, file) => {
    file.path = file.path.replace('upload_', '')
  })

  this.form.on('error', function(error) {
    res.send({error: error})
  });

  return new Promise((resolve, reject) => {
    this.form.on('file', (name, file) => {
      resolve(file)
    })
  })
}

module.exports = Uploader
