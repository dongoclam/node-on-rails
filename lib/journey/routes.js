const _ = require('lodash')
const Router = require('./router')
const Resource = require('./resource')

class Routes {
  constructor() {}
}

Routes.routeSet = []

Resource.methods.forEach(method => {
  Routes[method] = function(route) {
    this.routeSet.push(mappingRoute(route, method))
  }
})

Routes.resources = function(route) {
  Array.prototype.push.apply(this.routeSet, mappingResource(route))
}

Routes.draw = function(app) {
  this.routeSet.forEach(router => {
    var controller = router.getController()
    var {path, action, method} = router

    app[method](path, (req, res) => {
      new controller(req, res, router)[action]()
    })
  })
}

function mappingResource(route) {
  var controller = cleanPath(route.path)

  if(route.only)
    var actions = _.intersection(Resource.actions, route.only)
  else
    var actions = _.difference(Resource.actions, route.except)

  return actions.map(action => {
    var path = route.path + Resource.actionPaths[action]
    var method = Resource.actionMethods[action]
    
    return new Router(path, method, controller, action)
  })
}

function mappingRoute(route, method) {
  var path = route.path
  var [controller, action] = route.to.split(Resource.separator)

  return new Router(path, method, controller, action)
}

function cleanPath(path) {
  return path.replace(/^\/|\/$/, '')
}

module.exports = Routes
