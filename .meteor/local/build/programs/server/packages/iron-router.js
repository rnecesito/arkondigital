(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var Deps = Package.deps.Deps;
var _ = Package.underscore._;
var EJSON = Package.ejson.EJSON;
var WebApp = Package.webapp.WebApp;
var main = Package.webapp.main;
var WebAppInternals = Package.webapp.WebAppInternals;

/* Package-scope variables */
var RouteContext, Route, IronRouter, RouteController, Router, ServerRouter, RouterUtils, RoutePath, paramParts;

(function () {

////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                            //
// packages/iron-router/license.js                                                            //
//                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                              //
/*                                                                                            // 1
The MIT License (MIT)                                                                         // 2
                                                                                              // 3
Copyright (c) 2013 Chris Mather <mather@eventedmind.com>                                      // 4
                                                                                              // 5
Permission is hereby granted, free of charge, to any person obtaining a copy                  // 6
of this software and associated documentation files (the "Software"), to deal                 // 7
in the Software without restriction, including without limitation the rights                  // 8
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell                     // 9
copies of the Software, and to permit persons to whom the Software is                         // 10
furnished to do so, subject to the following conditions:                                      // 11
                                                                                              // 12
The above copyright notice and this permission notice shall be included in                    // 13
all copies or substantial portions of the Software.                                           // 14
                                                                                              // 15
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR                    // 16
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,                      // 17
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE                   // 18
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER                        // 19
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,                 // 20
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN                     // 21
THE SOFTWARE.                                                                                 // 22
*/                                                                                            // 23
                                                                                              // 24
////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                            //
// packages/iron-router/lib/router_utils.js                                                   //
//                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                              //
/**                                                                                           // 1
 * Utility methods available privately to the package.                                        // 2
 */                                                                                           // 3
                                                                                              // 4
RouterUtils = {};                                                                             // 5
                                                                                              // 6
/**                                                                                           // 7
 * Returns global on node or window in the browser.                                           // 8
 */                                                                                           // 9
                                                                                              // 10
RouterUtils.global = function () {                                                            // 11
  if (typeof window !== 'undefined')                                                          // 12
    return window;                                                                            // 13
  else if (typeof global !== 'undefined')                                                     // 14
    return global;                                                                            // 15
  else                                                                                        // 16
    return null;                                                                              // 17
};                                                                                            // 18
                                                                                              // 19
/**                                                                                           // 20
 * Given the name of a property, resolves to the value. Works with namespacing                // 21
 * too. If first parameter is already a value that isn't a string it's returned               // 22
 * immediately.                                                                               // 23
 *                                                                                            // 24
 * Examples:                                                                                  // 25
 *  'SomeClass' => window.SomeClass || global.someClass                                       // 26
 *  'App.namespace.SomeClass' => window.App.namespace.SomeClass                               // 27
 *                                                                                            // 28
 * @param {String|Object} nameOrValue                                                         // 29
 */                                                                                           // 30
                                                                                              // 31
RouterUtils.resolveValue = function (nameOrValue) {                                           // 32
  var global = RouterUtils.global()                                                           // 33
    , parts                                                                                   // 34
    , ptr;                                                                                    // 35
                                                                                              // 36
  if (_.isString(nameOrValue)) {                                                              // 37
    parts = nameOrValue.split('.')                                                            // 38
    ptr = global;                                                                             // 39
    for (var i = 0; i < parts.length; i++) {                                                  // 40
      ptr = ptr[parts[i]];                                                                    // 41
      if (!ptr)                                                                               // 42
        throw new Error(parts.slice(0, i+1).join('.') + ' is ' + typeof ptr);                 // 43
    }                                                                                         // 44
  } else {                                                                                    // 45
    ptr = nameOrValue;                                                                        // 46
  }                                                                                           // 47
                                                                                              // 48
  // final position of ptr should be the resolved value                                       // 49
  return ptr;                                                                                 // 50
};                                                                                            // 51
                                                                                              // 52
RouterUtils.hasOwnProperty = function (obj, key) {                                            // 53
  var prop = {}.hasOwnProperty;                                                               // 54
  return prop.call(obj, key);                                                                 // 55
};                                                                                            // 56
                                                                                              // 57
/**                                                                                           // 58
 * Don't mess with this function. It's exactly the same as the compiled                       // 59
 * coffeescript mechanism. If you change it we can't guarantee that our code                  // 60
 * will work when used with Coffeescript. One exception is putting in a runtime               // 61
 * check that both child and parent are of type Function.                                     // 62
 */                                                                                           // 63
                                                                                              // 64
RouterUtils.inherits = function (child, parent) {                                             // 65
  if (RouterUtils.typeOf(child) !== '[object Function]')                                      // 66
    throw new Error('First parameter to RouterUtils.inherits must be a function');            // 67
                                                                                              // 68
  if (RouterUtils.typeOf(parent) !== '[object Function]')                                     // 69
    throw new Error('Second parameter to RouterUtils.inherits must be a function');           // 70
                                                                                              // 71
  for (var key in parent) {                                                                   // 72
    if (RouterUtils.hasOwnProperty(parent, key))                                              // 73
      child[key] = parent[key];                                                               // 74
  }                                                                                           // 75
                                                                                              // 76
  function ctor () {                                                                          // 77
    this.constructor = child;                                                                 // 78
  }                                                                                           // 79
                                                                                              // 80
  ctor.prototype = parent.prototype;                                                          // 81
  child.prototype = new ctor();                                                               // 82
  child.__super__ = parent.prototype;                                                         // 83
  return child;                                                                               // 84
};                                                                                            // 85
                                                                                              // 86
RouterUtils.toArray = function (obj) {                                                        // 87
  if (!obj)                                                                                   // 88
    return [];                                                                                // 89
  else if (RouterUtils.typeOf(obj) !== '[object Array]')                                      // 90
    return [obj];                                                                             // 91
  else                                                                                        // 92
    return obj;                                                                               // 93
};                                                                                            // 94
                                                                                              // 95
RouterUtils.typeOf = function (obj) {                                                         // 96
  if (obj && obj.typeName)                                                                    // 97
    return obj.typeName;                                                                      // 98
  else                                                                                        // 99
    return Object.prototype.toString.call(obj);                                               // 100
};                                                                                            // 101
                                                                                              // 102
RouterUtils.extend = function (Super, definition) {                                           // 103
  if (arguments.length === 1)                                                                 // 104
    definition = Super;                                                                       // 105
  else {                                                                                      // 106
    definition = definition || {};                                                            // 107
    definition.extend = Super;                                                                // 108
  }                                                                                           // 109
                                                                                              // 110
  return RouterUtils.create(definition, {delayInheritance: false});                           // 111
};                                                                                            // 112
                                                                                              // 113
RouterUtils.create = function (definition, options) {                                         // 114
  var Constructor                                                                             // 115
    , extendFrom                                                                              // 116
    , savedPrototype;                                                                         // 117
                                                                                              // 118
  options = options || {};                                                                    // 119
  definition = definition || {};                                                              // 120
                                                                                              // 121
  if (RouterUtils.hasOwnProperty(definition, 'constructor'))                                  // 122
    Constructor = definition.constructor;                                                     // 123
  else {                                                                                      // 124
    Constructor = function () {                                                               // 125
      if (Constructor.__super__ && Constructor.__super__.constructor)                         // 126
        return Constructor.__super__.constructor.apply(this, arguments);                      // 127
    }                                                                                         // 128
  }                                                                                           // 129
                                                                                              // 130
  extendFrom = definition.extend;                                                             // 131
                                                                                              // 132
  if (definition.extend) delete definition.extend;                                            // 133
                                                                                              // 134
  var inherit = function (Child, Super, prototype) {                                          // 135
    RouterUtils.inherits(Child, RouterUtils.resolveValue(Super));                             // 136
    if (prototype) _.extend(Child.prototype, prototype);                                      // 137
  };                                                                                          // 138
                                                                                              // 139
  if (extendFrom) {                                                                           // 140
    inherit(Constructor, extendFrom);                                                         // 141
  }                                                                                           // 142
                                                                                              // 143
  _.extend(Constructor.prototype, definition);                                                // 144
                                                                                              // 145
  return Constructor;                                                                         // 146
};                                                                                            // 147
                                                                                              // 148
/**                                                                                           // 149
 * Assert that the given condition is truthy.                                                 // 150
 *                                                                                            // 151
 * @param {Boolean} condition The boolean condition to test for truthiness.                   // 152
 * @param {String} msg The error message to show if the condition is falsy.                   // 153
 */                                                                                           // 154
                                                                                              // 155
RouterUtils.assert = function (condition, msg) {                                              // 156
  if (!condition)                                                                             // 157
    throw new Error(msg);                                                                     // 158
};                                                                                            // 159
                                                                                              // 160
RouterUtils.capitalize = function (str) {                                                     // 161
  return str[0].toUpperCase() + str.slice(1, str.length);                                     // 162
};                                                                                            // 163
                                                                                              // 164
RouterUtils.classify = function (str) {                                                       // 165
  var re = /_|-|\./;                                                                          // 166
  return _.map(str.split(re), function (word) {                                               // 167
    return RouterUtils.capitalize(word);                                                      // 168
  }).join('');                                                                                // 169
};                                                                                            // 170
                                                                                              // 171
/**                                                                                           // 172
 * Finds the given template in the Template namespace or returns the defaultFn                // 173
 * if no template is found in Template. If no defaultFn is provided and the                   // 174
 * template is not found, throws an exception. In other words, ensures a                      // 175
 * template function is returned.                                                             // 176
 *                                                                                            // 177
 * @param {String|Function} name The name of the template or the template                     // 178
 * function itself.                                                                           // 179
 * @param {Function} [defaultFn] The default function to use if no template                   // 180
 * function is found in the Template namespace.                                               // 181
 * @returns {Function}                                                                        // 182
 * @api private                                                                               // 183
 */                                                                                           // 184
                                                                                              // 185
RouterUtils.getTemplateFunction = function (name, defaultFn) {                                // 186
  var template = null;                                                                        // 187
                                                                                              // 188
  if (_.isFunction(name))                                                                     // 189
    template = name;                                                                          // 190
  else if (_.isString(name))                                                                  // 191
    template = Template[name];                                                                // 192
                                                                                              // 193
  if (!template && defaultFn)                                                                 // 194
    template = defaultFn;                                                                     // 195
                                                                                              // 196
  RouterUtils.assert(template, 'Template "' + name + '" not found');                          // 197
  return template;                                                                            // 198
}                                                                                             // 199
                                                                                              // 200
////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                            //
// packages/iron-router/lib/route_path.js                                                     //
//                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                              //
/**                                                                                           // 1
 * Credit:                                                                                    // 2
 *                                                                                            // 3
 * The inspiration and some code for RoutePath comes from the page-js project:                // 4
 * https://github.com/visionmedia/page.js (MIT License), particularly the                     // 5
 * compile method. RoutePath has been enhanced with a few features like the                   // 6
 * ability to access the regular expression, and a few additional methods for                 // 7
 * bidirectionally compiling and retrieving a path given some parameters.                     // 8
 *                                                                                            // 9
 */                                                                                           // 10
                                                                                              // 11
/**                                                                                           // 12
 * Compiles a path with support for required, optional, wildcard and named                    // 13
 * wildcard parameters. Also supports regular expression paths.                               // 14
 *                                                                                            // 15
 * Examples:                                                                                  // 16
 *  "/posts"                                                                                  // 17
 *  "/posts/:_id"                                                                             // 18
 *  "/posts/:paramOne/:paramTwo"                                                              // 19
 *  "/posts/:required/:optional?"                                                             // 20
 *  "/posts/*"                                                                                // 21
 *  "/posts/:file(*)"                                                                         // 22
 *  /^\/commits\/(\d+)\.\.(\d+)/                                                              // 23
 *                                                                                            // 24
 *  @constructor RoutePath                                                                    // 25
 *  @param {String|RegExp} path                                                               // 26
 *  @param {Object} [options]                                                                 // 27
 *  @param {Boolean} [options.sensitive] Paths are case sensitive                             // 28
 *  @param {Boolean} [options.strict] Truncate /? from path                                   // 29
 *  @api private                                                                              // 30
 */                                                                                           // 31
                                                                                              // 32
RoutePath = function (path, options) {                                                        // 33
  RouterUtils.assert(arguments.length >= 1,                                                   // 34
         'RoutePath constructor requires a path as the first parameter');                     // 35
                                                                                              // 36
  this.keys = [];                                                                             // 37
  this.path = path || '';                                                                     // 38
  this.options = options || {};                                                               // 39
};                                                                                            // 40
                                                                                              // 41
RoutePath.prototype = {                                                                       // 42
  typeName: 'RoutePath',                                                                      // 43
                                                                                              // 44
  constructor: RoutePath,                                                                     // 45
                                                                                              // 46
  /**                                                                                         // 47
   * Compile the path. Typically you compile the path immediately after it is                 // 48
   * initialized, but this is not required.                                                   // 49
   *                                                                                          // 50
   *  @return {RoutePath}                                                                     // 51
   *  @api public                                                                             // 52
   */                                                                                         // 53
                                                                                              // 54
  compile: function () {                                                                      // 55
    var self = this                                                                           // 56
      , path                                                                                  // 57
      , options = self.options;                                                               // 58
                                                                                              // 59
    if (self.path instanceof RegExp) {                                                        // 60
      self.re = self.path;                                                                    // 61
    } else {                                                                                  // 62
      path = self.path                                                                        // 63
        .concat(options.strict ? '' : '/?')                                                   // 64
        .replace(/\/\(/g, '(?:/')                                                             // 65
        .replace(                                                                             // 66
          /(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?/g,                                             // 67
          function (match, slash, format, key, capture, optional){                            // 68
            self.keys.push({ name: key, optional: !! optional });                             // 69
            slash = slash || '';                                                              // 70
            return ''                                                                         // 71
              + (optional ? '' : slash)                                                       // 72
              + '(?:'                                                                         // 73
              + (optional ? slash : '')                                                       // 74
              + (format || '')                                                                // 75
              + (capture || (format && '([^/.]+?)' || '([^/]+?)')) + ')'                      // 76
              + (optional || '');                                                             // 77
          }                                                                                   // 78
        )                                                                                     // 79
        .replace(/([\/.])/g, '\\$1')                                                          // 80
        .replace(/\*/g, '(.*)');                                                              // 81
                                                                                              // 82
      self.re = new RegExp('^' + path + '$', options.sensitive ? '' : 'i');                   // 83
    }                                                                                         // 84
                                                                                              // 85
    return this;                                                                              // 86
  },                                                                                          // 87
                                                                                              // 88
  /**                                                                                         // 89
   * Returns an array of parameters given a path. The array may have named                    // 90
   * properties in addition to indexed values.                                                // 91
   *                                                                                          // 92
   * @param {String} path                                                                     // 93
   * @return {Array}                                                                          // 94
   * @api public                                                                              // 95
   */                                                                                         // 96
                                                                                              // 97
  params: function (path) {                                                                   // 98
    if (!path) return null;                                                                   // 99
                                                                                              // 100
    var params = []                                                                           // 101
      , m = this.exec(path)                                                                   // 102
      , queryString                                                                           // 103
      , keys = this.keys                                                                      // 104
      , key                                                                                   // 105
      , value;                                                                                // 106
                                                                                              // 107
    for (var i = 1, len = m.length; i < len; ++i) {                                           // 108
      key = keys[i - 1];                                                                      // 109
      value = typeof m[i] == 'string' ? decodeURIComponent(m[i]) : m[i];                      // 110
      if (key) {                                                                              // 111
        params[key.name] = params[key.name] !== undefined ?                                   // 112
          params[key.name] : value;                                                           // 113
      } else                                                                                  // 114
        params.push(value);                                                                   // 115
    }                                                                                         // 116
                                                                                              // 117
    queryString = decodeURI(path).split('?')[1];                                              // 118
                                                                                              // 119
    if (queryString) {                                                                        // 120
      _.each(queryString.split('&'), function (paramString) {                                 // 121
        paramParts = paramString.split('=');                                                  // 122
        params[paramParts[0]] = decodeURIComponent(paramParts[1]);                            // 123
      });                                                                                     // 124
    }                                                                                         // 125
                                                                                              // 126
    return params;                                                                            // 127
  },                                                                                          // 128
                                                                                              // 129
  /**                                                                                         // 130
   * Returns true if the path matches and false otherwise.                                    // 131
   *                                                                                          // 132
   * @param {String} path                                                                     // 133
   * @return {Boolean}                                                                        // 134
   * @api public                                                                              // 135
   */                                                                                         // 136
  test: function (path) {                                                                     // 137
    var qsIndex = path.indexOf('?')                                                           // 138
      , pathname = ~qsIndex ? path.slice(0, qsIndex) : path;                                  // 139
                                                                                              // 140
    return this.re.test(pathname);                                                            // 141
  },                                                                                          // 142
                                                                                              // 143
  /**                                                                                         // 144
   * Calls the exec method of the compiled path regular expression and returns                // 145
   * the result.                                                                              // 146
   *                                                                                          // 147
   * @param {String} path                                                                     // 148
   * @return {Array|null}                                                                     // 149
   * @api public                                                                              // 150
   */                                                                                         // 151
  exec: function (path) {                                                                     // 152
    var qsIndex = path.indexOf('?')                                                           // 153
      , pathname = ~qsIndex ? path.slice(0, qsIndex) : path;                                  // 154
    return this.re.exec(pathname);                                                            // 155
  },                                                                                          // 156
                                                                                              // 157
  /**                                                                                         // 158
   * Given an object or array of params, returns a path. This is used to create               // 159
   * Handlebars pathFor and urlFor helpers for example. If the params object has              // 160
   * a 'query' property, its values are used as query params.                                 // 161
   *                                                                                          // 162
   * @param {Object|Array} params                                                             // 163
   * @param {String|Object} [params.query] Query parameters to be appended to                 // 164
   * the path.                                                                                // 165
   * @return {String}                                                                         // 166
   * @api public                                                                              // 167
   */                                                                                         // 168
  resolve: function (params) {                                                                // 169
    var value                                                                                 // 170
      , isValueDefined                                                                        // 171
      , result                                                                                // 172
      , wildCardCount = 0                                                                     // 173
      , path = this.path                                                                      // 174
      , query;                                                                                // 175
                                                                                              // 176
    params = params || [];                                                                    // 177
    query = params.query;                                                                     // 178
                                                                                              // 179
    if (path instanceof RegExp) {                                                             // 180
      throw new Error('Cannot currently resolve a regular expression path');                  // 181
    } else {                                                                                  // 182
      path = this.path                                                                        // 183
        .replace(                                                                             // 184
          /(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?/g,                                             // 185
          function (match, slash, format, key, capture, optional) {                           // 186
            slash = slash || '';                                                              // 187
            value = params[key];                                                              // 188
            isValueDefined = typeof value !== 'undefined';                                    // 189
                                                                                              // 190
            if (optional && !isValueDefined) {                                                // 191
              slash = '';                                                                     // 192
              value = '';                                                                     // 193
            } else if (!isValueDefined) {                                                     // 194
              throw new Error(key + ' not found in params');                                  // 195
            }                                                                                 // 196
                                                                                              // 197
            value = _.isFunction(value) ? value.call(params) : value;                         // 198
            return slash + encodeURIComponent(value);                                         // 199
          }                                                                                   // 200
        )                                                                                     // 201
        .replace(                                                                             // 202
          /\*/g,                                                                              // 203
          function (match) {                                                                  // 204
            if (typeof params[wildCardCount] === 'undefined') {                               // 205
              throw new Error(                                                                // 206
                'You are trying to access a wild card parameter at index ' +                  // 207
                wildCardCount +                                                               // 208
                ' but the value of params at that index is undefined');                       // 209
            }                                                                                 // 210
                                                                                              // 211
            return encodeURIComponent(params[wildCardCount++]);                               // 212
          }                                                                                   // 213
        );                                                                                    // 214
                                                                                              // 215
      if (query) {                                                                            // 216
        if (_.isObject(query)) {                                                              // 217
          query = _.map(_.pairs(query), function (queryPart) {                                // 218
            return queryPart[0] + '=' + encodeURIComponent(queryPart[1]);                     // 219
          }).join('&');                                                                       // 220
        }                                                                                     // 221
                                                                                              // 222
        path = path + '?' + query;                                                            // 223
      }                                                                                       // 224
    }                                                                                         // 225
                                                                                              // 226
    return path;                                                                              // 227
  }                                                                                           // 228
};                                                                                            // 229
                                                                                              // 230
////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                            //
// packages/iron-router/lib/route_context.js                                                  //
//                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                              //
/**                                                                                           // 1
 * A simple object that gets created by the router and passed on to the route                 // 2
 * handler. It has a reactive result method that can be used by the route                     // 3
 * handler to trigger an invlidation somewhere. This is how the Router renders                // 4
 * routes to the page for example.                                                            // 5
 *                                                                                            // 6
 * @constructor RouteContext                                                                  // 7
 * @param {String} path                                                                       // 8
 * @param {IronRouter} router                                                                 // 9
 * @param {Route} route                                                                       // 10
 * @param {Object} [options]                                                                  // 11
 * @api private                                                                               // 12
 */                                                                                           // 13
                                                                                              // 14
RouteContext = function (path, router, route, options) {                                      // 15
  RouterUtils.assert(typeof path === 'string', 'RouteContext requires path parameter');       // 16
  RouterUtils.assert(router instanceof IronRouter, 'RouteContext requires router parameter'); // 17
  RouterUtils.assert(route, 'RouteContext requires route parameter');                         // 18
                                                                                              // 19
  options = this.options = options || {}                                                      // 20
  this._deps = new Deps.Dependency;                                                           // 21
  this._result = null;                                                                        // 22
  this.path = path;                                                                           // 23
  this.router = router;                                                                       // 24
  this.route = route;                                                                         // 25
  this.state = options.state;                                                                 // 26
  this.params = route.params(path);                                                           // 27
  this.action = route.action || 'run';                                                        // 28
  this.controller = route.controller;                                                         // 29
  this.isReactive = route.isReactive;                                                         // 30
};                                                                                            // 31
                                                                                              // 32
RouteContext.prototype = {                                                                    // 33
  typeName: 'RouteContext',                                                                   // 34
                                                                                              // 35
  constructor: RouteContext,                                                                  // 36
                                                                                              // 37
  /**                                                                                         // 38
   * Returns an object that can be used to store state (e.g. pushState on the                 // 39
   * client). The object includes this.state and this.path                                    // 40
   *                                                                                          // 41
   * @returns {Object}                                                                        // 42
   * @api public                                                                              // 43
   */                                                                                         // 44
                                                                                              // 45
  getState: function () {                                                                     // 46
    return _.extend({}, this.state, {                                                         // 47
      path: this.path                                                                         // 48
    });                                                                                       // 49
  }                                                                                           // 50
};                                                                                            // 51
                                                                                              // 52
////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                            //
// packages/iron-router/lib/route.js                                                          //
//                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                              //
/**                                                                                           // 1
 * Container class for route information.                                                     // 2
 *                                                                                            // 3
 * Example:                                                                                   // 4
 *  new Route(router, 'postShow', {path: '/posts/:_id'});                                     // 5
 *  new Route(router, 'postShow', {path: '/posts/:_id'}, function () {});                     // 6
 *  new Route(router, 'postShow', {path: '/posts/:_id', handler: function () {}});            // 7
 *                                                                                            // 8
 * @constructor Route                                                                         // 9
 * @exports Route                                                                             // 10
 * @param {IronRouter} router                                                                 // 11
 * @param {String} name The name will be used as the default path if none is                  // 12
 * specified in the options. For example, 'test' will become '/test'                          // 13
 * @param {Object} [options]                                                                  // 14
 * @param {String} [options.path]                                                             // 15
 * @param {Function} [options.handler]                                                        // 16
 * @param {Function} [handler] Handler function can be passed as the last                     // 17
 * parameter or as an option. A handler function is not required but will be                  // 18
 * used by the Router if one is provided.                                                     // 19
 * @api public                                                                                // 20
 */                                                                                           // 21
                                                                                              // 22
Route = function (router, name, options, handler) {                                           // 23
  var path;                                                                                   // 24
                                                                                              // 25
  RouterUtils.assert(router instanceof IronRouter);                                           // 26
                                                                                              // 27
  RouterUtils.assert(_.isString(name),                                                        // 28
    'Route constructor requires a name as the second parameter');                             // 29
                                                                                              // 30
  if (_.isFunction(options))                                                                  // 31
    options = { handler: options };                                                           // 32
                                                                                              // 33
  if (_.isFunction(handler))                                                                  // 34
    options.handler = handler;                                                                // 35
                                                                                              // 36
  options = this.options = options || {};                                                     // 37
  path = options.path || ('/' + name);                                                        // 38
                                                                                              // 39
  this.router = router;                                                                       // 40
  this.originalPath = path;                                                                   // 41
  this.compiledPath = new RoutePath(path, options).compile();                                 // 42
  this.name = name;                                                                           // 43
  this.where = options.where || 'client';                                                     // 44
  this.handler = this.handler || options.handler;                                             // 45
  this.action = options.action;                                                               // 46
  this.controller = options.controller;                                                       // 47
                                                                                              // 48
  if (typeof options.reactive !== 'undefined')                                                // 49
    this.isReactive = options.reactive;                                                       // 50
  else                                                                                        // 51
    this.isReactive = true;                                                                   // 52
};                                                                                            // 53
                                                                                              // 54
Route.prototype = {                                                                           // 55
  typeName: 'Route',                                                                          // 56
                                                                                              // 57
  constructor: Route,                                                                         // 58
                                                                                              // 59
  /**                                                                                         // 60
   * Returns true if the given path matches this route's compiled path. Proxies               // 61
   * to the RoutePath instance stored in compiledPath.                                        // 62
   *                                                                                          // 63
   * @param {String} path                                                                     // 64
   * @return {Boolean}                                                                        // 65
   * @api public                                                                              // 66
   */                                                                                         // 67
                                                                                              // 68
  test: function (path) {                                                                     // 69
    return this.compiledPath.test(path);                                                      // 70
  },                                                                                          // 71
                                                                                              // 72
  /**                                                                                         // 73
   * Returns an array or object of params given a path. Proxies to the RoutePath              // 74
   * instance stored in compiledPath.                                                         // 75
   *                                                                                          // 76
   * @param {String} path                                                                     // 77
   * @return {Array|Object}                                                                   // 78
   * @api public                                                                              // 79
   */                                                                                         // 80
                                                                                              // 81
  params: function (path) {                                                                   // 82
    return this.compiledPath.params(path);                                                    // 83
  },                                                                                          // 84
                                                                                              // 85
  /**                                                                                         // 86
   * Returns a path given a params object or array. Proxies to the RoutePath                  // 87
   * instance stored in compiledPath.                                                         // 88
   *                                                                                          // 89
   * Example:                                                                                 // 90
   *  route = new Route(router, 'postShow', {path: '/posts/:id'});                            // 91
   *  route.path({id: 5}) => '/posts/5'                                                       // 92
   *                                                                                          // 93
   * @param {Array|Object} params                                                             // 94
   * @return {String}                                                                         // 95
   * @api public                                                                              // 96
   */                                                                                         // 97
                                                                                              // 98
  path: function (params) {                                                                   // 99
    return this.compiledPath.resolve(params);                                                 // 100
  },                                                                                          // 101
                                                                                              // 102
  /**                                                                                         // 103
   * Returns an absolute url given a params object or array. Uses                             // 104
   * Meteor.absoluteUrl() for the root url.                                                   // 105
   *                                                                                          // 106
   * Example:                                                                                 // 107
   *  route = new Route(router, 'postShow', {path: '/posts/:id'});                            // 108
   *  route.url({id: 5}) => 'http://www.eventedmind.com/posts/5'                              // 109
   *                                                                                          // 110
   * @param {Array|Object} params                                                             // 111
   * @return {String}                                                                         // 112
   * @api public                                                                              // 113
   */                                                                                         // 114
                                                                                              // 115
  url: function (params) {                                                                    // 116
    var path = this.path(params);                                                             // 117
    if (path[0] === '/')                                                                      // 118
      path = path.slice(1, path.length);                                                      // 119
    return Meteor.absoluteUrl() + path;                                                       // 120
  }                                                                                           // 121
};                                                                                            // 122
                                                                                              // 123
////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                            //
// packages/iron-router/lib/route_controller.js                                               //
//                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                              //
/**                                                                                           // 1
 * Main class for handling data and rendering logic for a route.                              // 2
 *                                                                                            // 3
 * @constructor RouteController                                                               // 4
 * @exports RouteController                                                                   // 5
 * @param {RouteContext} context                                                              // 6
 * @param {Object} [options]                                                                  // 7
 * @param {String|Function} [options.template]                                                // 8
 * @param {String|Function} [options.loadingTemplate]                                         // 9
 * @param {String|Function} [options.notFoundTemplate]                                        // 10
 * @param {Object|Function} [options.data]                                                    // 11
 */                                                                                           // 12
                                                                                              // 13
RouteController = function (context, options) {                                               // 14
  var routerOptions                                                                           // 15
    , routeOptions                                                                            // 16
    , self = this;                                                                            // 17
                                                                                              // 18
  RouterUtils.assert(context, 'RouteController requires a RouteContext');                     // 19
                                                                                              // 20
  options = this.options = options || {};                                                     // 21
                                                                                              // 22
  routerOptions = (context.router && context.router.options) || {};                           // 23
  routeOptions = (context.route && context.route.options) || {};                              // 24
                                                                                              // 25
  this.params = context.params || [];                                                         // 26
  this.route = context.route;                                                                 // 27
  this.router = context.router;                                                               // 28
  this.context = context;                                                                     // 29
                                                                                              // 30
  var getOption = function(name) {                                                            // 31
    return options[name]                                                                      // 32
      || routeOptions[name]                                                                   // 33
      || routerOptions[name]                                                                  // 34
      || self[name];                                                                          // 35
  };                                                                                          // 36
                                                                                              // 37
  this['onBeforeRun'] = getOption('onBeforeRun');                                             // 38
  this['onAfterRun'] = getOption('onAfterRun');                                               // 39
  this['onBeforeRerun'] = getOption('onBeforeRerun');                                         // 40
  this['onAfterRerun'] = getOption('onAfterRerun');                                           // 41
                                                                                              // 42
  this.stopped = false;                                                                       // 43
  this.isFirstRun = true;                                                                     // 44
                                                                                              // 45
  this.before = []                                                                            // 46
    .concat(RouterUtils.toArray(routerOptions.before))                                        // 47
    .concat(RouterUtils.toArray(routeOptions.before))                                         // 48
    .concat(RouterUtils.toArray(options.before))                                              // 49
    .concat(RouterUtils.toArray(this.before));                                                // 50
                                                                                              // 51
  this.after = []                                                                             // 52
    .concat(RouterUtils.toArray(routerOptions.after))                                         // 53
    .concat(RouterUtils.toArray(routeOptions.after))                                          // 54
    .concat(RouterUtils.toArray(options.after))                                               // 55
    .concat(RouterUtils.toArray(this.after));                                                 // 56
                                                                                              // 57
  this.initialize(context, options);                                                          // 58
};                                                                                            // 59
                                                                                              // 60
RouteController.prototype = {                                                                 // 61
  typeName: 'RouteController',                                                                // 62
                                                                                              // 63
  constructor: RouteController,                                                               // 64
                                                                                              // 65
  initialize: function (context, options) {                                                   // 66
    throw new Error('not implemented');                                                       // 67
  },                                                                                          // 68
                                                                                              // 69
  before: [],                                                                                 // 70
                                                                                              // 71
  /**                                                                                         // 72
   * After hooks to run after the controller action is called. The Router will                // 73
   * typically call the runHooks method to call this function. This property is               // 74
   * defined for inheritance. Each instance gets its own copy of after hooks at               // 75
   * constructor time. This means that after hooks added to the prototype after               // 76
   * constructor time will not be used in the instance.                                       // 77
   */                                                                                         // 78
                                                                                              // 79
  after: [],                                                                                  // 80
                                                                                              // 81
  /**                                                                                         // 82
   * Run the hooks for the given name (e.g. before/after)                                     // 83
   *                                                                                          // 84
   * @param {String} name The name of the hooks to run (e.g. before/after)                    // 85
   * @api public                                                                              // 86
   */                                                                                         // 87
                                                                                              // 88
  runHooks: function (name) {                                                                 // 89
    var self = this                                                                           // 90
      , hooks = self[name];                                                                   // 91
                                                                                              // 92
    if (!hooks) return;                                                                       // 93
                                                                                              // 94
    for (var i = 0; i < hooks.length; i++) {                                                  // 95
      if (this.stopped) break;                                                                // 96
      hooks[i].call(this);                                                                    // 97
    }                                                                                         // 98
  },                                                                                          // 99
                                                                                              // 100
                                                                                              // 101
  /**                                                                                         // 102
   * The default action for the controller. Called by the Router. Calls the main              // 103
   * render method and then the render method for each template specified in                  // 104
   * renderTemplates.                                                                         // 105
   *                                                                                          // 106
   * @api public                                                                              // 107
   */                                                                                         // 108
                                                                                              // 109
  run: function () {                                                                          // 110
    throw new Error('not implemented');                                                       // 111
  },                                                                                          // 112
                                                                                              // 113
  /**                                                                                         // 114
   * Stop running this controller and redirect to a new path. Same parameters as              // 115
   * those of Router.go.                                                                      // 116
   *                                                                                          // 117
   * @api public                                                                              // 118
   */                                                                                         // 119
                                                                                              // 120
  redirect: function (/* args */) {                                                           // 121
    this.stop();                                                                              // 122
    return this.router.go.apply(this.router, arguments);                                      // 123
  },                                                                                          // 124
                                                                                              // 125
  /**                                                                                         // 126
   * Set the stopped property on the controller to true. This would typically be              // 127
   * used in a before filter or hook. If the controller is marked as stopped, it              // 128
   * tells the router not to call the controller's action or afterRun callbacks               // 129
   * and hooks. This property is not used internally by the controller.                       // 130
   *                                                                                          // 131
   * @api public                                                                              // 132
   */                                                                                         // 133
  stop: function() {                                                                          // 134
    this.stopped = true;                                                                      // 135
  },                                                                                          // 136
                                                                                              // 137
  /**                                                                                         // 138
   * Hook called on the before the first run - either the run method being                    // 139
   * called or another action being called. This method is called from the                    // 140
   * router. It should only be called once. Not on reactive reruns.                           // 141
   *                                                                                          // 142
   * @api public                                                                              // 143
   */                                                                                         // 144
                                                                                              // 145
  onBeforeRun: function () {                                                                  // 146
  },                                                                                          // 147
                                                                                              // 148
  /**                                                                                         // 149
   * Hook called after the first run - either the run method being                            // 150
   * called or another action being called. This method is called from the                    // 151
   * router. It should only be called once. Not on reactive reruns.                           // 152
   *                                                                                          // 153
   * @api public                                                                              // 154
   */                                                                                         // 155
                                                                                              // 156
  onAfterRun: function () {                                                                   // 157
  },                                                                                          // 158
                                                                                              // 159
  /**                                                                                         // 160
   * Hook called before a reactive rerun. Called by the router.                               // 161
   *                                                                                          // 162
   * @api public                                                                              // 163
   */                                                                                         // 164
                                                                                              // 165
  onBeforeRerun: function () {                                                                // 166
  },                                                                                          // 167
                                                                                              // 168
  /**                                                                                         // 169
   * Hook called after a reactive rerun. Called by the router.                                // 170
   *                                                                                          // 171
   * @api public                                                                              // 172
   */                                                                                         // 173
                                                                                              // 174
  onAfterRerun: function () {                                                                 // 175
  }                                                                                           // 176
};                                                                                            // 177
                                                                                              // 178
_.extend(RouteController, {                                                                   // 179
  /**                                                                                         // 180
   * Inherit from RouteController                                                             // 181
   *                                                                                          // 182
   * @param {Object} definition Prototype properties for inherited class.                     // 183
   */                                                                                         // 184
                                                                                              // 185
  extend: function (definition) {                                                             // 186
    return RouterUtils.extend(this, definition);                                              // 187
  }                                                                                           // 188
});                                                                                           // 189
                                                                                              // 190
////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                            //
// packages/iron-router/lib/router.js                                                         //
//                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                              //
/**                                                                                           // 1
 * The main Router class which runs on both client and server.                                // 2
 *                                                                                            // 3
 * @constructor IronRouter                                                                    // 4
 * @exports IronRouter                                                                        // 5
 * @param {Object} [options]                                                                  // 6
 * @api public                                                                                // 7
 */                                                                                           // 8
                                                                                              // 9
IronRouter = function (options) {                                                             // 10
  this.configure(options);                                                                    // 11
                                                                                              // 12
  /**                                                                                         // 13
   * The routes array which doubles as a named route index by adding                          // 14
   * properties to the array.                                                                 // 15
   *                                                                                          // 16
   * @api public                                                                              // 17
   */                                                                                         // 18
  this.routes = [];                                                                           // 19
                                                                                              // 20
  /**                                                                                         // 21
   * The current context. This is set anytime a new route is dispatched. It's                 // 22
   * a reactive variable which you can get by calling Router.current();                       // 23
   *                                                                                          // 24
   * @api private                                                                             // 25
   */                                                                                         // 26
  this._current = null;                                                                       // 27
                                                                                              // 28
  /**                                                                                         // 29
   * Dependency to track dependencies on this._current                                        // 30
   *                                                                                          // 31
   * @api private                                                                             // 32
   */                                                                                         // 33
  this._deps = new Deps.Dependency;                                                           // 34
};                                                                                            // 35
                                                                                              // 36
                                                                                              // 37
IronRouter.prototype = {                                                                      // 38
  typeName: 'IronRouter',                                                                     // 39
                                                                                              // 40
  constructor: IronRouter,                                                                    // 41
                                                                                              // 42
  /**                                                                                         // 43
   * Configure instance with options. This can be called at any time. If the                  // 44
   * instance options object hasn't been created yet it is created here.                      // 45
   *                                                                                          // 46
   * @param {Object} options                                                                  // 47
   * @return {IronRouter}                                                                     // 48
   * @api public                                                                              // 49
   */                                                                                         // 50
                                                                                              // 51
  configure: function (options) {                                                             // 52
    this.options = this.options || {};                                                        // 53
    _.extend(this.options, options);                                                          // 54
    return this;                                                                              // 55
  },                                                                                          // 56
                                                                                              // 57
  /**                                                                                         // 58
   * Convenience function to define a bunch of routes at once. In the future we               // 59
   * might call the callback with a custom dsl.                                               // 60
   *                                                                                          // 61
   * Example:                                                                                 // 62
   *  Router.map(function () {                                                                // 63
   *    this.route('posts');                                                                  // 64
   *  });                                                                                     // 65
   *                                                                                          // 66
   *  @param {Function} cb                                                                    // 67
   *  @return {IronRouter}                                                                    // 68
   *  @api public                                                                             // 69
   */                                                                                         // 70
                                                                                              // 71
  map: function (cb) {                                                                        // 72
    RouterUtils.assert(_.isFunction(cb),                                                      // 73
           'map requires a function as the first parameter');                                 // 74
    cb.call(this);                                                                            // 75
    return this;                                                                              // 76
  },                                                                                          // 77
                                                                                              // 78
  /**                                                                                         // 79
   * Define a new route. You must name the route, but as a second parameter you               // 80
   * can either provide an object of options or a Route instance.                             // 81
   *                                                                                          // 82
   * @param {String} name The name of the route                                               // 83
   * @param {Object} [options] Options to pass along to the route                             // 84
   * @param {Function} [handler] A handler function for the route. This usually               // 85
   * isn't required as a handler is automatically created for you if one doesn't              // 86
   * exist. Behavior is different on client and server.                                       // 87
   * @return {Route}                                                                          // 88
   * @api public                                                                              // 89
   */                                                                                         // 90
                                                                                              // 91
  route: function (name, options, handler) {                                                  // 92
    var route;                                                                                // 93
                                                                                              // 94
    RouterUtils.assert(_.isString(name), 'name is a required parameter');                     // 95
                                                                                              // 96
    if (options instanceof Route)                                                             // 97
      route = options;                                                                        // 98
    else                                                                                      // 99
      route = new Route(this, name, options, handler);                                        // 100
                                                                                              // 101
    this.routes[name] = route;                                                                // 102
    this.routes.push(route);                                                                  // 103
    return route;                                                                             // 104
  },                                                                                          // 105
                                                                                              // 106
  /**                                                                                         // 107
   * Returns a path for a given routeName and params object. Used in Handlebars               // 108
   * path helper for example.                                                                 // 109
   *                                                                                          // 110
   * Example:                                                                                 // 111
   *  Router.route('postShow', {path: '/posts/:id'});                                         // 112
   *  Router.path('postShow', {id: 5, query: {q: 'search'}) =>                                // 113
   *  '/posts/5?q=search'                                                                     // 114
   *                                                                                          // 115
   * @param {String} routeName The name of the route to use.                                  // 116
   * @param {Array|Object} params                                                             // 117
   * @return {String}                                                                         // 118
   * @api public                                                                              // 119
   */                                                                                         // 120
                                                                                              // 121
  //XXX fix up error handling here.                                                           // 122
  path: function (routeName, params) {                                                        // 123
    RouterUtils.assert(this.routes[routeName],                                                // 124
     'You called Router.path for a route named ' + routeName + ' but that that route doesn\'t seem to exist. Are you sure you created it?');
    return this.routes[routeName].path(params);                                               // 126
  },                                                                                          // 127
                                                                                              // 128
  /**                                                                                         // 129
   * Returns a full url for a given routeName and params object. Used in                      // 130
   * Handlebars url helper for example.                                                       // 131
   *                                                                                          // 132
   * Example:                                                                                 // 133
   *  Router.route('postShow', {path: '/posts/:id'});                                         // 134
   *  Router.url('postShow', {id: 5, query: {q: 'search'}) =>                                 // 135
   *  'http://www.eventedmind.com/posts/5?q=search'                                           // 136
   */                                                                                         // 137
                                                                                              // 138
  url: function (routeName, params) {                                                         // 139
    RouterUtils.assert(this.routes[routeName], 'url: No route found named ' + routeName);     // 140
    return this.routes[routeName].url(params);                                                // 141
  },                                                                                          // 142
                                                                                              // 143
  /**                                                                                         // 144
   * Finds a route for the given path and runs it if found. If the route is                   // 145
   * found but is for a different environment (client vs. server) the                         // 146
   * onUnhandled function is called. If the route is not found at all (on client              // 147
   * or server) the onRouteNotFound method is called. These functions are                     // 148
   * overridden on the client and server IronRouters.                                         // 149
   *                                                                                          // 150
   * @param {String} path The path to dispatch                                                // 151
   * @param {Object} [options] Options to pass along to the onRun method                      // 152
   * @param {Function} [cb] Optional callback to call if the path was                         // 153
   * successfully dispatched. Note that if a redirect occurs the original                     // 154
   * callback will not be called.                                                             // 155
   * @param {Function} [onUnhandled] Optional override for onUnhandled function.              // 156
   * For example, the client router overrides this to unhook client event                     // 157
   * handlers and make a request to the server.                                               // 158
   * @return {IronRouter}                                                                     // 159
   * @api public                                                                              // 160
   */                                                                                         // 161
                                                                                              // 162
  dispatch: function (path, options, cb, onUnhandled) {                                       // 163
    var self = this                                                                           // 164
      , routes = self.routes                                                                  // 165
      , route                                                                                 // 166
      , where = Meteor.isClient ? 'client' : 'server'                                         // 167
      , i = 0;                                                                                // 168
                                                                                              // 169
    function next () {                                                                        // 170
      route = routes[i++];                                                                    // 171
      onUnhandled = onUnhandled || self.onUnhandled;                                          // 172
                                                                                              // 173
      if (!route) {                                                                           // 174
        return self.onRouteNotFound(path, options);                                           // 175
      }                                                                                       // 176
                                                                                              // 177
      if (route.test(path)) {                                                                 // 178
        if (route.where !== where)                                                            // 179
          return onUnhandled(path, options);                                                  // 180
        self.run(path, route, options, cb, onUnhandled);                                      // 181
      } else next();                                                                          // 182
    }                                                                                         // 183
                                                                                              // 184
    next();                                                                                   // 185
    return this;                                                                              // 186
  },                                                                                          // 187
                                                                                              // 188
  /**                                                                                         // 189
   * Creates a new RouteContext and runs the given route for the given path by                // 190
   * calling the onRun method of the router. After onRun completes, if the                    // 191
   * context hasn't changed in the mean time (i.e. the route handler calls run                // 192
   * again before this function has completed), the deps.changed() method is called           // 193
   * causing callers that are dependent on Router.current() to be rerun. This                 // 194
   * method also double checks that the given route is supposed to be run in the              // 195
   * current environment (client or server). If not, the onUnhandled function of              // 196
   * router is called. Typically, this method shouldn't be called directly. You               // 197
   * should be calling the dispatch method instead.                                           // 198
   *                                                                                          // 199
   * @param {String} path                                                                     // 200
   * @param {Route} route                                                                     // 201
   * @param {Object} [options]                                                                // 202
   * @param {Function} [cb] Optional callback to call if the path was                         // 203
   * successfully dispatched. Note that if a redirect occurs the original                     // 204
   * callback will not be called.                                                             // 205
   * @param {Function} [onUnhandled] Optional override for onUnhandled function.              // 206
   * For example, the client router overrides this to unhook client event                     // 207
   * handlers and make a request to the server.                                               // 208
   * @return {IronRouter}                                                                     // 209
   * @api public                                                                              // 210
   */                                                                                         // 211
                                                                                              // 212
  run: function (path, route, options, cb, onUnhandled) {                                     // 213
    var self = this                                                                           // 214
      , context                                                                               // 215
      , controller                                                                            // 216
      , where = Meteor.isClient ? 'client' : 'server';                                        // 217
                                                                                              // 218
    RouterUtils.assert(path, 'You must run with a path');                                     // 219
    RouterUtils.assert(route, 'You must provide a route to the run method');                  // 220
                                                                                              // 221
    // one last check to see if we should handle the route here                               // 222
    onUnhandled = onUnhandled || self.onUnhandled;                                            // 223
    if (route.where != where)                                                                 // 224
      onUnhandled && onUnhandled(path, options);                                              // 225
                                                                                              // 226
    context = new RouteContext(path, this, route, options);                                   // 227
    controller = this.getControllerForContext(context, options);                              // 228
                                                                                              // 229
    this._current = context;                                                                  // 230
                                                                                              // 231
    this.onRun(controller, context, options);                                                 // 232
                                                                                              // 233
    if (context == this._current) {                                                           // 234
      cb && cb(context);                                                                      // 235
      this._deps.changed();                                                                   // 236
    }                                                                                         // 237
    return this;                                                                              // 238
  },                                                                                          // 239
                                                                                              // 240
  /**                                                                                         // 241
   * Get a controller instance for the given action, context and options. There               // 242
   * are four cases:                                                                          // 243
   *                                                                                          // 244
   *  1) handler is defined directly on a route                                               // 245
   *  2) controller option is defined on the route                                            // 246
   *  3) intelligently find the controller class in global namespace                          // 247
   *  4) create a new anonymous controller                                                    // 248
   *                                                                                          // 249
   * @param {String} action                                                                   // 250
   * @param {RouteContext} context                                                            // 251
   * @param {Object} [options]                                                                // 252
   * @return {RouteController}                                                                // 253
   * @api private                                                                             // 254
   */                                                                                         // 255
                                                                                              // 256
  getControllerForContext: function (context, options) {                                      // 257
    var handler                                                                               // 258
      , controllerClass                                                                       // 259
      , controller                                                                            // 260
      , action                                                                                // 261
      , routeName;                                                                            // 262
                                                                                              // 263
    var classify = function (name) {                                                          // 264
      return RouterUtils.classify(name);                                                      // 265
    };                                                                                        // 266
                                                                                              // 267
    var getControllerFromWindow = function (name) {                                           // 268
      var controller = window[name];                                                          // 269
      if (typeof controller === 'undefined')                                                  // 270
        throw new Error('controller "' + name + '" is not defined on window');                // 271
      return controller;                                                                      // 272
    };                                                                                        // 273
                                                                                              // 274
    action = context.action = context.action || 'run';                                        // 275
                                                                                              // 276
    // case 1: handler defined directly on the route                                          // 277
    if (handler = (context.route && context.route.handler)) {                                 // 278
      controller = new RouteController(context, options);                                     // 279
      controller[action] = handler;                                                           // 280
      return controller;                                                                      // 281
    }                                                                                         // 282
                                                                                              // 283
    // case 2: controller option is defined on the route                                      // 284
    if (context.controller) {                                                                 // 285
      controllerClass = _.isString(context.controller) ?                                      // 286
        getControllerFromWindow(context.controller) : context.controller;                     // 287
      controller = new controllerClass(context, options);                                     // 288
      return controller;                                                                      // 289
    }                                                                                         // 290
                                                                                              // 291
    // case 3: intelligently find the controller class in global namespace                    // 292
    routeName = context.route && context.route.name;                                          // 293
                                                                                              // 294
    if (routeName) {                                                                          // 295
      controllerClass = window[classify(routeName + 'Controller')];                           // 296
                                                                                              // 297
      if (controllerClass) {                                                                  // 298
        controller = new controllerClass(context, options);                                   // 299
        return controller;                                                                    // 300
      }                                                                                       // 301
    }                                                                                         // 302
                                                                                              // 303
    // case 4: nothing found so create a default controller                                   // 304
    return new RouteController(context, options);                                             // 305
  },                                                                                          // 306
                                                                                              // 307
  /**                                                                                         // 308
   * Run a controller with a given context. Calls the before and after hooks                  // 309
   * and attaches to the onRender callback to render results into the router's                // 310
   * layout.                                                                                  // 311
   *                                                                                          // 312
   * @param {RouteController} controller                                                      // 313
   * @param {RouteContext} context                                                            // 314
   * @api private                                                                             // 315
   */                                                                                         // 316
                                                                                              // 317
  runController: function (controller, context) {                                             // 318
    var self = this                                                                           // 319
      , action = context.action;                                                              // 320
                                                                                              // 321
    RouterUtils.assert(                                                                       // 322
      controller[action],                                                                     // 323
      'No action "' + action + '" on controller ' + controller.typeName                       // 324
    );                                                                                        // 325
                                                                                              // 326
    // Since runController can be reactive, this resets the controller to a non               // 327
    // stopped state on each run.                                                             // 328
    controller.stopped = false;                                                               // 329
                                                                                              // 330
    if (controller.isFirstRun)                                                                // 331
      controller.onBeforeRun();                                                               // 332
    else                                                                                      // 333
      controller.onBeforeRerun();                                                             // 334
                                                                                              // 335
    controller.runHooks('before');                                                            // 336
                                                                                              // 337
    // if the user stopped the controller in a before filter or hook then don't               // 338
    // run the rest of the controller.                                                        // 339
    if (controller.stopped) return;                                                           // 340
                                                                                              // 341
    controller[action]();                                                                     // 342
    controller.runHooks('after');                                                             // 343
                                                                                              // 344
    if (controller.isFirstRun)                                                                // 345
      controller.onAfterRun();                                                                // 346
    else                                                                                      // 347
      controller.onAfterRerun();                                                              // 348
                                                                                              // 349
    controller.isFirstRun = false;                                                            // 350
  },                                                                                          // 351
                                                                                              // 352
  /**                                                                                         // 353
   * Reactive accessor for the current context. You can also get a nonreactive                // 354
   * value by specifiying {reactive: false} as an option.                                     // 355
   *                                                                                          // 356
   * @param {Object} [opts] configuration options                                             // 357
   * @param {Boolean} [opts.reactive] Set to false to enable a non-reactive read.             // 358
   * @return {RouteContext}                                                                   // 359
   * @api public                                                                              // 360
   */                                                                                         // 361
                                                                                              // 362
  current: function (opts) {                                                                  // 363
    if (opts && opts.reactive === false)                                                      // 364
      return this._current;                                                                   // 365
    else {                                                                                    // 366
      this._deps.depend();                                                                    // 367
      return this._current;                                                                   // 368
    }                                                                                         // 369
  },                                                                                          // 370
                                                                                              // 371
  /**                                                                                         // 372
   * Called by the run method to run a context which by this point should                     // 373
   * include the path and route. Should be overridden in client and server                    // 374
   * routers since the behavior will be different on client vs. server.                       // 375
   *                                                                                          // 376
   * @param {RouteContext} context                                                            // 377
   * @param {Object} [options]                                                                // 378
   * @api public                                                                              // 379
   */                                                                                         // 380
                                                                                              // 381
  onRun: function (context, options) {                                                        // 382
    throw new Error('onRun not implemented');                                                 // 383
  },                                                                                          // 384
                                                                                              // 385
  /**                                                                                         // 386
   * Called from the dispatch or run method when a route was found but not                    // 387
   * handled in the current environment (e.g. client or server). Should be                    // 388
   * overridden in client and server routers.                                                 // 389
   *                                                                                          // 390
   * @param {String} path                                                                     // 391
   * @param {Object} [options]                                                                // 392
   * @api public                                                                              // 393
   */                                                                                         // 394
                                                                                              // 395
  onUnhandled: function (path, options) {                                                     // 396
    throw new Error('onUnhandled not implemented');                                           // 397
  },                                                                                          // 398
                                                                                              // 399
  /**                                                                                         // 400
   * Called from the dispatch method when a route was not found for the given                 // 401
   * dispatched path. This method can be overridden in client and server routers              // 402
   * but doesn't have to be.                                                                  // 403
   *                                                                                          // 404
   * @param {String} path                                                                     // 405
   * @param {Object} [options]                                                                // 406
   * @api public                                                                              // 407
   */                                                                                         // 408
                                                                                              // 409
  onRouteNotFound: function (path, options) {                                                 // 410
    throw new Error('No route found for path: ' + path);                                      // 411
  }                                                                                           // 412
};                                                                                            // 413
                                                                                              // 414
////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                            //
// packages/iron-router/lib/server/route_controller.js                                        //
//                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                              //
_.extend(RouteController.prototype, {                                                         // 1
  initialize: function (context, options) {                                                   // 2
    this.request = context.options.request;                                                   // 3
    this.response = context.options.response;                                                 // 4
    this.next = context.options.next;                                                         // 5
  },                                                                                          // 6
                                                                                              // 7
  onRun: function () {                                                                        // 8
    this.response.end();                                                                      // 9
  }                                                                                           // 10
});                                                                                           // 11
                                                                                              // 12
////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                            //
// packages/iron-router/lib/server/server_router.js                                           //
//                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                              //
var connect = Npm.require('connect');                                                         // 1
var Fiber = Npm.require('fibers');                                                            // 2
                                                                                              // 3
var root = global;                                                                            // 4
                                                                                              // 5
var connectHandlers                                                                           // 6
  , connect;                                                                                  // 7
                                                                                              // 8
if (typeof __meteor_bootstrap__.app !== 'undefined') {                                        // 9
  connectHandlers = __meteor_bootstrap__.app;                                                 // 10
} else {                                                                                      // 11
  connectHandlers = WebApp.connectHandlers;                                                   // 12
}                                                                                             // 13
                                                                                              // 14
ServerRouter = RouterUtils.extend(IronRouter, {                                               // 15
  constructor: function () {                                                                  // 16
    var self = this;                                                                          // 17
    ServerRouter.__super__.constructor.apply(this, arguments);                                // 18
    Meteor.startup(function () {                                                              // 19
      setTimeout(function () {                                                                // 20
        if (self.options.autoStart !== false)                                                 // 21
          self.start();                                                                       // 22
      });                                                                                     // 23
    });                                                                                       // 24
  },                                                                                          // 25
                                                                                              // 26
  onRun: function (controller, context, options) {                                            // 27
    var response = context.options.response;                                                  // 28
                                                                                              // 29
    try {                                                                                     // 30
      this.runController(controller, context);                                                // 31
    } finally {                                                                               // 32
      response.end();                                                                         // 33
    }                                                                                         // 34
  },                                                                                          // 35
                                                                                              // 36
  start: function () {                                                                        // 37
    connectHandlers                                                                           // 38
      .use(connect.query())                                                                   // 39
      .use(connect.bodyParser())                                                              // 40
      .use(_.bind(this.onRequest, this));                                                     // 41
  },                                                                                          // 42
                                                                                              // 43
  onRequest: function (req, res, next) {                                                      // 44
    var self = this;                                                                          // 45
    Fiber(function () {                                                                       // 46
      self.dispatch(req.url, {                                                                // 47
        request: req,                                                                         // 48
        response: res,                                                                        // 49
        next: next                                                                            // 50
      });                                                                                     // 51
    }).run();                                                                                 // 52
  },                                                                                          // 53
                                                                                              // 54
  stop: function () {                                                                         // 55
  },                                                                                          // 56
                                                                                              // 57
  onUnhandled: function (path, options) {                                                     // 58
    options.next();                                                                           // 59
  },                                                                                          // 60
                                                                                              // 61
  onRouteNotFound: function (path, options) {                                                 // 62
    options.next();                                                                           // 63
  }                                                                                           // 64
});                                                                                           // 65
                                                                                              // 66
Router = new ServerRouter;                                                                    // 67
                                                                                              // 68
////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['iron-router'] = {
  RouteContext: RouteContext,
  Route: Route,
  IronRouter: IronRouter,
  RouteController: RouteController,
  Router: Router,
  ServerRouter: ServerRouter
};

})();
