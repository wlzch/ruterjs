ruter = require '../index'

class ObjectLoader
  constructor: (plugins) ->
    @plugins = plugins ? []

  load: (routes) ->
    for routeName, route of routes
      for key, value of route
        for plugin in @plugins
          if plugin.supports(key)
            plugin.load(routeName, route, routes)

    return routes

module.exports = ObjectLoader
