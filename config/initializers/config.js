const path = require('path')
const rootPath = process.cwd()

class Config {
  constructor() {}
}

Config.rootPath = rootPath
Config.port = process.env.PORT || 3000
Config.publicPath = path.join(rootPath, 'public')
Config.viewEngine = 'hbs'
Config.partialsPath = path.join(rootPath, 'views/partials')
Config.controllersPath = rootPath + '/controllers',

module.exports = Config
