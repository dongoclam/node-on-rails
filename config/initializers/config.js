const path = require('path')
const rootPath = process.cwd()

class Config {
  constructor() {}
}

Config.rootPath = rootPath
Config.port = process.env.PORT || 8080
Config.publicPath = path.join(rootPath, 'public')
Config.viewEngine = 'hbs'
Config.controllersPath = rootPath + '/controllers',

module.exports = Config
