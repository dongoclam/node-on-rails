const ApplicationController = require('../application_controller')

class BaseController extends ApplicationController {
  layout() {
    return 'layouts/admin'
  }
}

module.exports = BaseController
