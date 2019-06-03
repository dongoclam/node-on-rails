const BaseController = require('./base_controller')

class DashboardController extends BaseController {
  index() {
    this.render({title: 'LamDo'})
  }
  
  show() {
    this.render({title: 'Show LamDo'})
  }
}

module.exports = DashboardController
