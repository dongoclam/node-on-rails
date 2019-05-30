const Config  = require('./config/initializers/config')
const Routes  = require('./config/routes')

const express = require('express')
const app = express()

express.static(Config.publicPath)

app.set('view engine', Config.viewEngine)

Routes.draw(app)

app.listen(Config.port, () => {
  console.log(`Runing on port ${Config.port}...`)
})
