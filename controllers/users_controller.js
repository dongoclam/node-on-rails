const ApplicationController = require('./application_controller')

class UsersController extends ApplicationController {
  index() {
    this.render({title: 'UserIndex'})
  }

  layout() {
    return 'layouts/users'
  }
}

module.exports = UsersController
