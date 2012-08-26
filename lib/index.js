var ObjectLoader, ruter;

ruter = require('./ruter');

ObjectLoader = require('./loader/object_loader');

module.exports = ruter;

ruter.plugins = [];

ruter.init = function(routes) {
    ruter.routes = routes;
};

ruter.registerPlugin = function(plugin) {
    ruter.plugins.push(plugin);
};

ruter.setup = function(server) {
    var method, name, options, _ref;
    _ref = ruter.routes;
    for (name in _ref) {
      options = _ref[name];
      method = options.method ? options.method : 'get';
      if ((options.pattern != null) && (options.controller != null)) {
        server[method](options.pattern, options.controller);
      } else {
        return new Error('Route must have controller');
      }
    }
};

ruter.middleware = function(req, res, next) {
    req.ruter = ruter;
    return next();
};

ruter.registerAppHelper = function(server) {
    return server.dynamicHelpers({
      ruter: function(req, res) {
        return req.ruter;
      }
    });
};

ruter.ObjectLoader = ObjectLoader;
