const path = require('path')
const rootPath = process.cwd()

class Config {
  constructor() {}
}

Config.rootPath = rootPath
Config.uploadDir = path.join(rootPath, 'uploads/')
Config.port = process.env.PORT || 8080
Config.publicPath = path.join(rootPath, 'public')
Config.viewEngine = 'hbs'
Config.partialsPath = path.join(rootPath, 'views/partials')
Config.controllersPath = rootPath + '/controllers',

module.exports = Config
