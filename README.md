![ruter](https://secure.travis-ci.org/wlzch/ruterjs.png)

# Ruter.js
Ruter is a routing extension for [Express](http://expressjs.com) which is designed to be extensible.
`Warning: this package is not stable yet.`

## Installation
`$ npm install ruter`

## Usage
The main purpose of Ruter is to be able to configure routes through a loader (object, yml file, etc). The loader must return an object containing route name which at least contains pattern and 1 controller.

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

### License
(The MIT License)

Copyright (c) 2012 Welly

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
