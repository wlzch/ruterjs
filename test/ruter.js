var routes, ruter;

ruter = require('../lib/index');

require('should');

routes = require('./fixtures/routes');

describe('Ruter', function() {
    router = new ruter(routes);
    describe('.getRoute', function() {
      return it('should return route', function() {
        router.getRoute('index').pattern.should.equal('/');
        return router.getRoute('show').pattern.should.equal('/show/:id');
      });
    });

    describe('.generateUrl', function() {
      it('should return parsed url', function() {
        router.generateUrl('index').should.equal('/');
        router.generateUrl('show', {
          'id': 1
        }).should.equal('/show/1/');
        router.generateUrl('user_profile', {
          'id': 20
        }).should.equal('/user/20/profile/');
      });
    });
});
