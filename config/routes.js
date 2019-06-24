const routes = require('../lib/journey/routes')

routes.get({path: '/', to: 'home#index'})
routes.get({path: '/facebook', to: 'socials#index'})
routes.post({path: '/facebook', to: 'socials#create'})
routes.get({path: '/facebook/login', to: 'socials#edit'})
routes.resources({path: '/users', except: ['destroy']})
routes.resources({path: '/admin/dashboard', only: ['index']})
routes.post({path: '/upload', to: 'uploads#create'})

module.exports = routes
