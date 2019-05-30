const routes = require('../lib/journey/routes')

routes.get({path: '/', to: 'home#index'})
routes.get({path: '/about', to: 'home#show'})
routes.resources({path: '/users', except: ['destroy']})

module.exports = routes
