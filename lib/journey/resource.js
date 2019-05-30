class Resource {
  constructor() {}
}

Resource.separator = '#'

Resource.actions = [
  'index',
  'new',
  'create',
  'show',
  'edit',
  'update',
  'destroy'
]

Resource.methods = [
  'get',
  'post',
  'put',
  'delete'
]

Resource.actionPaths = {
  index:   '/',
  new:     '/new',
  create:  '/',
  show:    '/:id',
  edit:    '/:id/edit',
  update:  '/:id',
  destroy: '/:id'
}

Resource.actionMethods = {
  index:   'get',
  new:     'get',
  create:  'post',
  show:    'get',
  edit:    'get',
  update:  'put',
  destroy: 'delete'
}

module.exports = Resource
