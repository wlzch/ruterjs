var ObjectLoader, ruter;

ruter = require('../index');

ObjectLoader = (function() {

function ObjectLoader(plugins) {
  this.plugins = plugins != null ? plugins : [];
}

ObjectLoader.prototype.load = function(routes) {
  var key, plugin, route, routeName, value, _i, _len, _ref;
  for (routeName in routes) {
    route = routes[routeName];
    for (key in route) {
      value = route[key];
      _ref = this.plugins;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        plugin = _ref[_i];
        if (plugin.supports(key)) {
          plugin.load(routeName, route, routes);
        }
      }
    }
  }
  return routes;
};

return ObjectLoader;

})();

module.exports = ObjectLoader;
