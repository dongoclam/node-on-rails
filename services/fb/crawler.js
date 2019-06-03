const CrawlerBase = require('../crawler/base')

class FbCrawler extends CrawlerBase {
  constructor() {}
}

FbCrawler.homePage = 'https://facebook.com'
FbCrawler.loginPage = 'https://www.facebook.com/login'
FbCrawler.emailSelector = '#email'
FbCrawler.passwordSelector = '#pass'
FbCrawler.submitButtonSelector = '#loginbutton'
FbCrawler.userCookieName = 'c_user'

FbCrawler.homePageContent = async function() {
  return this.pageContent(this.homePage)
}

FbCrawler.loginPageContent = async function() {
  return this.pageContent(this.loginPage)
}

FbCrawler.verify = async function(email, pass) {
  const page = await this.gotoPage(this.homePage)
  
  await page.click(this.emailSelector)
  await page.keyboard.type(email)
  
  await page.click(this.passwordSelector)
  await page.keyboard.type(pass)
  
  await page.click(this.submitButtonSelector)

  await page.waitForNavigation({waitUntil: 'load'});
  
  await page.screenshot({path: 'example.png'});

  const cookies = await page.cookies()

  const verified = !!cookies.find(cookie => cookie.name == this.userCookieName)
  
  page.browser().close()
  return {verified: verified, cookies: cookies}
}

module.exports = FbCrawler
