const Config  = require('./config/initializers/config')
const routes  = require('./config/routes')

const hbs = require('hbs')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

hbs.registerPartials(Config.partialsPath)
app.set('view engine', Config.viewEngine)
app.use(express.static(Config.publicPath))
app.use(bodyParser.urlencoded({extended: false}))

routes.draw(app)

app.listen(Config.port, () => {
  console.log(`Runing on port ${Config.port}...`)
})

