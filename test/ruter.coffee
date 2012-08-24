ruter = require '../index'
require 'should'
routes = require './fixtures/routes'

describe('Ruter', () ->
    ruter.init(routes)

    describe('.getRoute', () ->
      it('should return route', () ->
        ruter.getRoute('index').pattern.should.equal('/')
        ruter.getRoute('show').pattern.should.equal('/show/:id')
      )
    )

    describe('.generateUrl', () ->
      it('should return parsed url', () ->
        ruter.generateUrl('index').should.equal('/')
        ruter.generateUrl('show', {'id': 1}).should.equal('/show/1/')
        ruter.generateUrl('user_profile', {'id': 20}).should.equal('/user/20/profile/')
      )
    )
)
