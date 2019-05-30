const Config = require('../../config/initializers/config')
const Resource = require('./resource')

class Router {
  constructor(path, method, controller, action) {
    this.path = path
    this.method = method
    this.controller = controller
    this.action = action
  }
}

Router.prototype.getController = function() {
  var controllerName = this.controller + '_controller'
  return require(`${Config.controllersPath}/${controllerName}`)
}

module.exports = Router
