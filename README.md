# Ruter.js
Ruter is a routing extension for [Express](http://expressjs.com) which is designed to be extensible.

## Installation
`$ npm install ruter`

## Usage
The main purpose of Ruter is to be able to configure routes through a configuration file.

    ruter = require('ruter');
    app = require('express').createServer();

    routes = {
        homepage: {
            pattern: '/',
            controller: function(req, res, next) {
                //do something
            }
        },
        post_product: {
            pattern: '/product',
            controller: function(req, res, next) {
                //do something
            },
            method: 'post'
        }
    };

    loader = new ruter.ObjectLoader
    routes = loader.load(routes);

    ruter.init(routes);
    ruter.setup(app);

### Url generator
The url can be generated based on the route name.

    ruter = require('ruter');
    routes = {
        homepage: {
            pattern: '/',
            controller: function(req, res, next) {
                // do something
            }
        }
    };

    ruter.init(routes);
    console.log ruter.generateUrl('homepage'); /** outputs '/' */

### Plugin
Ruter can be extended with plugin. Register the configuration's key and you can process the route however you want.

    Plugin = (function() {
        function Plugin() {}

        Plugin.supports = function(key) {
          if (key === 'plugin') {
            return true;
          }
        };

        Plugin.load = function(routeName, route, routes) {
          routes[routeName + '_plugin'] = route;
        };

        return Plugin;
    })();

    routes = {
        index: {
            pattern: '/',
            plugin: true
        }
    }

    loader = new ruter.ObjectLoader([Plugin]);
    routes = loader.load(routes); /* now routes will have a route with name 'index_plugin' */
