class ApplicationController {
  constructor(req, res, router) {
    this.req = req
    this.res = res
    this.router = router
  }

  render(view, options) {
    if(typeof view == 'object') {
      options = view
      view = this.viewPath()
    }
    view = view || this.viewPath()
    options = options || {}
    options.layout = options.layout || this.layout()
    this.res.render(view, options)
  }

  viewPath() {
    return `${this.router.controller}/${this.router.action}`
  }

  layout() {
    return 'layouts/application'
  }
}

module.exports = ApplicationController
