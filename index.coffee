ruter = require './ruter'
ObjectLoader = require './loader/object_loader'

module.exports = ruter

ruter.plugins = []

ruter.init = (routes) ->
  ruter.routes = routes

ruter.registerPlugin = (plugin) ->
  ruter.plugins.push plugin

ruter.setup = (server) ->
  for name, options of ruter.routes
    method = if options.method then options.method else 'get'
    if options.pattern? and options.controller?
      server[method] options.pattern, options.controller
    else
      return new Error('Route must have controller')
    
ruter.middleware = (req, res, next) ->
    req.ruter = ruter
    next()

ruter.registerAppHelper = (server) ->
  server.dynamicHelpers
    ruter: (req, res) ->
      return req.ruter

ruter.ObjectLoader = ObjectLoader
