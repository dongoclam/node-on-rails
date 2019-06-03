const ApplicationController = require('./application_controller')

class HomeController extends ApplicationController {
  index() {
    this.render({title: 'LamDo'})
  }
  
  show() {
    this.render({title: 'Show LamDo'})
  }
}

module.exports = HomeController
