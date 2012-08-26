var routes, ruter;

ruter = require('../lib/index');

require('should');

routes = require('./fixtures/routes');

describe('Ruter', function() {
    ruter.init(routes);
    describe('.getRoute', function() {
      return it('should return route', function() {
        ruter.getRoute('index').pattern.should.equal('/');
        return ruter.getRoute('show').pattern.should.equal('/show/:id');
      });
    });

    describe('.generateUrl', function() {
      it('should return parsed url', function() {
        ruter.generateUrl('index').should.equal('/');
        ruter.generateUrl('show', {
          'id': 1
        }).should.equal('/show/1/');
        ruter.generateUrl('user_profile', {
          'id': 20
        }).should.equal('/user/20/profile/');
      });
    });
});
