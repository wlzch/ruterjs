var ObjectLoader, routes, ruter, underscore;
require('should');
routes = require('../fixtures/routes');
ObjectLoader = require('../../lib/loader/object_loader');

describe('ObjectLoader', function() {
    var Plugin;
    Plugin = (function() {

      function Plugin() {}

      Plugin.supports = function(key) {
        if (key === 'test') {
          return true;
        }
      };

      Plugin.load = function(routeName, route, routes) {
        return routes[routeName + '_show'] = route;
      };

      return Plugin;

    })();
    describe('load', function() {
      it('should calls the plugins', function() {
        var cnt, loader;
        cnt = Object.keys(routes).length;
        loader = new ObjectLoader([Plugin]);
        routes = loader.load(routes);
        Object.keys(routes).should.have.lengthOf(cnt + 1);
      });
    });
});
