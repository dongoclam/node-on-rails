const ApplicationController = require('./application_controller');

class User extends ApplicationController {
  index() {
    this.render({title: 'UserIndex'})
  }

  layout() {
    return 'layouts/users'
  }
}

module.exports = User
