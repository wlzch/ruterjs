require 'should'
underscore = require 'underscore'
ruter = require '../../index'
routes = require '../fixtures/routes'
ObjectLoader = require '../../loader/object_loader'

describe('ObjectLoader', () ->
  class Plugin
    @supports: (key) ->
      if key is 'test' then return true

    @load: (routeName, route, routes) ->
      routes[routeName + '_show'] = route

  describe('load', () ->
    it('should calls the plugins', () ->
      cnt = Object.keys(routes).length
      loader = new ObjectLoader([Plugin])
      routes = loader.load(routes)
      Object.keys(routes).should.have.lengthOf(cnt + 1)
    )
  )
)
