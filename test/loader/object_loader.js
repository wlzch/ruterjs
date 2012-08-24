// Generated by CoffeeScript 1.3.3
(function() {
  var ObjectLoader, routes, ruter, underscore;

  require('should');

  underscore = require('underscore');

  ruter = require('../../index');

  routes = require('../fixtures/routes');

  ObjectLoader = require('../../loader/object_loader');

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
    return describe('load', function() {
      return it('should calls the plugins', function() {
        var cnt, loader;
        cnt = Object.keys(routes).length;
        loader = new ObjectLoader([Plugin]);
        routes = loader.load(routes);
        return Object.keys(routes).should.have.lengthOf(cnt + 1);
      });
    });
  });

}).call(this);
