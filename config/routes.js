const Routes = require('../lib/journey/routes')

Routes.get({path: '/', to: 'home#index'})
Routes.get({path: '/about', to: 'home#show'})
Routes.resources({path: '/users', except: ['destroy']})

module.exports = Routes
