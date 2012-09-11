var Ruter;

Ruter = (function() {

function Ruter(routes) {
  this.routes = routes;
}

Ruter.prototype.getRoute = function(name) {
  if (this.routes[name]) {
    return this.routes[name];
  } else {
    return new Error('Route ' + name + ' not found');
  }
};

Ruter.prototype.generateUrl = function(name, parameters) {
  var part, route, url, _i, _len, _ref;
  route = this.getRoute(name);
  url = '/';
  _ref = route.pattern.split('/');
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    part = _ref[_i];
    if (part !== '') {
      if (part[0] === ':') {
        part = part.substring(1);
        url += parameters[part];
      } else {
        url += part;
      }
      url += '/';
    }
  }
  return url;
};

return Ruter;

})();

module.exports = Ruter;
