var ObjectLoader, ruter;

ruter = require('./ruter');

ObjectLoader = require('./loader/object_loader');

module.exports = ruter;

ruter.prototype.setup = function(server) {
    var method, name, options, _ref;
    _ref = this.routes;
    for (name in _ref) {
      options = _ref[name];
      method = options.method ? options.method : 'get';
      if ((options.pattern != null) && (options.controller != null)) {
        server[method](options.pattern, options.controller);
      } else {
        return new Error('Route must have controller and pattern');
      }
    }
};

ruter.prototype.middleware = function(req, res, next) {
    req.ruter = this;
    return next();
};

ruter.prototype.registerAppHelper = function(server) {
    return server.dynamicHelpers({
      ruter: function(req, res) {
        return req.ruter;
      }
    });
};

ruter.ObjectLoader = ObjectLoader;
