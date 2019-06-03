const puppeteer = require('puppeteer');

class CrawlerBase {
  constructor() {}
}

CrawlerBase.gotoPage = async function(url) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.goto(url)

  return page
}

CrawlerBase.pageContent = async function(url) {
  var page = await this.gotoPage(url)
  var content = await page.content()

  return content
}


module.exports = CrawlerBase
