class Ruter
  constructor: (routes) ->
    @routes = routes

  # Get route based on route name
  #
  # @param string route name
  # @return object route
  @getRoute: (name) ->
    if @routes[name]
        return @routes[name]
    else
        return new Error('Route ' + name + ' not found')

  # Generate url based on route name. part of url with ':' will be replaced with parameters provided as argument
  #
  # @param string route name
  # @param object parameters to override
  # @return string generated url
  @generateUrl: (name, parameters) ->
    route = @getRoute(name)
    url = '/'
    for part in route.pattern.split '/'
      if part isnt ''
        if part[0] is ':'
          part = part.substring(1)
          url += parameters[part]
        else
          url += part
        url += '/'
    return url


module.exports = Ruter
