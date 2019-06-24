const _ = require("lodash");
const Router = require("./router");
const Resource = require("./resource");

class Routes {
  constructor() {
    this.routeSet = [];
    this.defineMethods();
  }

  defineMethods() {
    Resource.methods.forEach(method => {
      this[method] = route => {
        this.routeSet.push(this.mappingRoute(route, method));
      };
    });

    this.resources = route => {
      Array.prototype.push.apply(this.routeSet, this.mappingResource(route));
    };
  }

  draw(app) {
    this.routeSet.forEach(router => {
      var controller = router.getController();
      var { path, action, method } = router;

      app[method](path, (req, res) => {
        new controller(req, res, router)[action]();
      });
    });
  }

  mappingResource(route) {
    var controller = this.cleanPath(route.path);

    if (route.only) var actions = _.intersection(Resource.actions, route.only);
    else var actions = _.difference(Resource.actions, route.except);

    return actions.map(action => {
      var path = route.path + Resource.actionPaths[action];
      var method = Resource.actionMethods[action];

      return new Router(path, method, controller, action);
    });
  }

  mappingRoute(route, method) {
    var path = route.path;
    var [controller, action] = route.to.split(Resource.separator);

    return new Router(path, method, controller, action);
  }

  cleanPath(path) {
    return path.replace(/^\/|\/$/, "");
  }
}

module.exports = new Routes();
