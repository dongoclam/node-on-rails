const ApplicationController = require('./application_controller');

class Home extends ApplicationController {
  index() {
    this.render({title: 'LamDo'})
  }
  
  show() {
    this.render({title: 'Show LamDo'})
  }
}

module.exports = Home
