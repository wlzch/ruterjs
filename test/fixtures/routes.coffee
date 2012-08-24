routes =
  index:
    pattern: '/'
  show:
    pattern: '/show/:id'
  user_profile:
    pattern: '/user/:id/profile'
    test: true

module.exports = routes
