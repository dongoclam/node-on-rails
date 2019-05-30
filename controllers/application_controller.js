class ApplicationController {
  constructor(req, res, router) {
    this.req = req
    this.res = res
    this.router = router
  }

  render(options={}) {
    options.layout = options.layout || this.layout()
    this.res.render(this.viewPath(), options)
  }

  viewPath() {
    return `${this.router.controller}/${this.router.action}`
  }

  layout() {
    return 'layouts/main'
  }
}

module.exports = ApplicationController;
