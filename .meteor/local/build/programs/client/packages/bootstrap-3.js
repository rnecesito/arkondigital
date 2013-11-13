//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
//                                                                      //
// If you are using Chrome, open the Developer Tools and click the gear //
// icon in its lower right corner. In the General Settings panel, turn  //
// on 'Enable source maps'.                                             //
//                                                                      //
// If you are using Firefox 23, go to `about:config` and set the        //
// `devtools.debugger.source-maps-enabled` preference to true.          //
// (The preference should be on by default in Firefox 24; versions      //
// older than 23 do not support source maps.)                           //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var $ = Package.jquery.$;
var jQuery = Package.jquery.jQuery;

(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/bootstrap-3/bootstrap-3/js/bootstrap.js                                                                   //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
/*!                                                                                                                   // 1
 * Bootstrap v3.0.2 by @fat and @mdo                                                                                  // 2
 * Copyright 2013 Twitter, Inc.                                                                                       // 3
 * Licensed under http://www.apache.org/licenses/LICENSE-2.0                                                          // 4
 *                                                                                                                    // 5
 * Designed and built with all the love in the world by @mdo and @fat.                                                // 6
 */                                                                                                                   // 7
                                                                                                                      // 8
if (typeof jQuery === "undefined") { throw new Error("Bootstrap requires jQuery") }                                   // 9
                                                                                                                      // 10
/* ========================================================================                                           // 11
 * Bootstrap: transition.js v3.0.2                                                                                    // 12
 * http://getbootstrap.com/javascript/#transitions                                                                    // 13
 * ========================================================================                                           // 14
 * Copyright 2013 Twitter, Inc.                                                                                       // 15
 *                                                                                                                    // 16
 * Licensed under the Apache License, Version 2.0 (the "License");                                                    // 17
 * you may not use this file except in compliance with the License.                                                   // 18
 * You may obtain a copy of the License at                                                                            // 19
 *                                                                                                                    // 20
 * http://www.apache.org/licenses/LICENSE-2.0                                                                         // 21
 *                                                                                                                    // 22
 * Unless required by applicable law or agreed to in writing, software                                                // 23
 * distributed under the License is distributed on an "AS IS" BASIS,                                                  // 24
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.                                           // 25
 * See the License for the specific language governing permissions and                                                // 26
 * limitations under the License.                                                                                     // 27
 * ======================================================================== */                                        // 28
                                                                                                                      // 29
                                                                                                                      // 30
+function ($) { "use strict";                                                                                         // 31
                                                                                                                      // 32
  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)                                                     // 33
  // ============================================================                                                     // 34
                                                                                                                      // 35
  function transitionEnd() {                                                                                          // 36
    var el = document.createElement('bootstrap')                                                                      // 37
                                                                                                                      // 38
    var transEndEventNames = {                                                                                        // 39
      'WebkitTransition' : 'webkitTransitionEnd'                                                                      // 40
    , 'MozTransition'    : 'transitionend'                                                                            // 41
    , 'OTransition'      : 'oTransitionEnd otransitionend'                                                            // 42
    , 'transition'       : 'transitionend'                                                                            // 43
    }                                                                                                                 // 44
                                                                                                                      // 45
    for (var name in transEndEventNames) {                                                                            // 46
      if (el.style[name] !== undefined) {                                                                             // 47
        return { end: transEndEventNames[name] }                                                                      // 48
      }                                                                                                               // 49
    }                                                                                                                 // 50
  }                                                                                                                   // 51
                                                                                                                      // 52
  // http://blog.alexmaccaw.com/css-transitions                                                                       // 53
  $.fn.emulateTransitionEnd = function (duration) {                                                                   // 54
    var called = false, $el = this                                                                                    // 55
    $(this).one($.support.transition.end, function () { called = true })                                              // 56
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }                              // 57
    setTimeout(callback, duration)                                                                                    // 58
    return this                                                                                                       // 59
  }                                                                                                                   // 60
                                                                                                                      // 61
  $(function () {                                                                                                     // 62
    $.support.transition = transitionEnd()                                                                            // 63
  })                                                                                                                  // 64
                                                                                                                      // 65
}(jQuery);                                                                                                            // 66
                                                                                                                      // 67
/* ========================================================================                                           // 68
 * Bootstrap: alert.js v3.0.2                                                                                         // 69
 * http://getbootstrap.com/javascript/#alerts                                                                         // 70
 * ========================================================================                                           // 71
 * Copyright 2013 Twitter, Inc.                                                                                       // 72
 *                                                                                                                    // 73
 * Licensed under the Apache License, Version 2.0 (the "License");                                                    // 74
 * you may not use this file except in compliance with the License.                                                   // 75
 * You may obtain a copy of the License at                                                                            // 76
 *                                                                                                                    // 77
 * http://www.apache.org/licenses/LICENSE-2.0                                                                         // 78
 *                                                                                                                    // 79
 * Unless required by applicable law or agreed to in writing, software                                                // 80
 * distributed under the License is distributed on an "AS IS" BASIS,                                                  // 81
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.                                           // 82
 * See the License for the specific language governing permissions and                                                // 83
 * limitations under the License.                                                                                     // 84
 * ======================================================================== */                                        // 85
                                                                                                                      // 86
                                                                                                                      // 87
+function ($) { "use strict";                                                                                         // 88
                                                                                                                      // 89
  // ALERT CLASS DEFINITION                                                                                           // 90
  // ======================                                                                                           // 91
                                                                                                                      // 92
  var dismiss = '[data-dismiss="alert"]'                                                                              // 93
  var Alert   = function (el) {                                                                                       // 94
    $(el).on('click', dismiss, this.close)                                                                            // 95
  }                                                                                                                   // 96
                                                                                                                      // 97
  Alert.prototype.close = function (e) {                                                                              // 98
    var $this    = $(this)                                                                                            // 99
    var selector = $this.attr('data-target')                                                                          // 100
                                                                                                                      // 101
    if (!selector) {                                                                                                  // 102
      selector = $this.attr('href')                                                                                   // 103
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7                                  // 104
    }                                                                                                                 // 105
                                                                                                                      // 106
    var $parent = $(selector)                                                                                         // 107
                                                                                                                      // 108
    if (e) e.preventDefault()                                                                                         // 109
                                                                                                                      // 110
    if (!$parent.length) {                                                                                            // 111
      $parent = $this.hasClass('alert') ? $this : $this.parent()                                                      // 112
    }                                                                                                                 // 113
                                                                                                                      // 114
    $parent.trigger(e = $.Event('close.bs.alert'))                                                                    // 115
                                                                                                                      // 116
    if (e.isDefaultPrevented()) return                                                                                // 117
                                                                                                                      // 118
    $parent.removeClass('in')                                                                                         // 119
                                                                                                                      // 120
    function removeElement() {                                                                                        // 121
      $parent.trigger('closed.bs.alert').remove()                                                                     // 122
    }                                                                                                                 // 123
                                                                                                                      // 124
    $.support.transition && $parent.hasClass('fade') ?                                                                // 125
      $parent                                                                                                         // 126
        .one($.support.transition.end, removeElement)                                                                 // 127
        .emulateTransitionEnd(150) :                                                                                  // 128
      removeElement()                                                                                                 // 129
  }                                                                                                                   // 130
                                                                                                                      // 131
                                                                                                                      // 132
  // ALERT PLUGIN DEFINITION                                                                                          // 133
  // =======================                                                                                          // 134
                                                                                                                      // 135
  var old = $.fn.alert                                                                                                // 136
                                                                                                                      // 137
  $.fn.alert = function (option) {                                                                                    // 138
    return this.each(function () {                                                                                    // 139
      var $this = $(this)                                                                                             // 140
      var data  = $this.data('bs.alert')                                                                              // 141
                                                                                                                      // 142
      if (!data) $this.data('bs.alert', (data = new Alert(this)))                                                     // 143
      if (typeof option == 'string') data[option].call($this)                                                         // 144
    })                                                                                                                // 145
  }                                                                                                                   // 146
                                                                                                                      // 147
  $.fn.alert.Constructor = Alert                                                                                      // 148
                                                                                                                      // 149
                                                                                                                      // 150
  // ALERT NO CONFLICT                                                                                                // 151
  // =================                                                                                                // 152
                                                                                                                      // 153
  $.fn.alert.noConflict = function () {                                                                               // 154
    $.fn.alert = old                                                                                                  // 155
    return this                                                                                                       // 156
  }                                                                                                                   // 157
                                                                                                                      // 158
                                                                                                                      // 159
  // ALERT DATA-API                                                                                                   // 160
  // ==============                                                                                                   // 161
                                                                                                                      // 162
  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)                                           // 163
                                                                                                                      // 164
}(jQuery);                                                                                                            // 165
                                                                                                                      // 166
/* ========================================================================                                           // 167
 * Bootstrap: button.js v3.0.2                                                                                        // 168
 * http://getbootstrap.com/javascript/#buttons                                                                        // 169
 * ========================================================================                                           // 170
 * Copyright 2013 Twitter, Inc.                                                                                       // 171
 *                                                                                                                    // 172
 * Licensed under the Apache License, Version 2.0 (the "License");                                                    // 173
 * you may not use this file except in compliance with the License.                                                   // 174
 * You may obtain a copy of the License at                                                                            // 175
 *                                                                                                                    // 176
 * http://www.apache.org/licenses/LICENSE-2.0                                                                         // 177
 *                                                                                                                    // 178
 * Unless required by applicable law or agreed to in writing, software                                                // 179
 * distributed under the License is distributed on an "AS IS" BASIS,                                                  // 180
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.                                           // 181
 * See the License for the specific language governing permissions and                                                // 182
 * limitations under the License.                                                                                     // 183
 * ======================================================================== */                                        // 184
                                                                                                                      // 185
                                                                                                                      // 186
+function ($) { "use strict";                                                                                         // 187
                                                                                                                      // 188
  // BUTTON PUBLIC CLASS DEFINITION                                                                                   // 189
  // ==============================                                                                                   // 190
                                                                                                                      // 191
  var Button = function (element, options) {                                                                          // 192
    this.$element = $(element)                                                                                        // 193
    this.options  = $.extend({}, Button.DEFAULTS, options)                                                            // 194
  }                                                                                                                   // 195
                                                                                                                      // 196
  Button.DEFAULTS = {                                                                                                 // 197
    loadingText: 'loading...'                                                                                         // 198
  }                                                                                                                   // 199
                                                                                                                      // 200
  Button.prototype.setState = function (state) {                                                                      // 201
    var d    = 'disabled'                                                                                             // 202
    var $el  = this.$element                                                                                          // 203
    var val  = $el.is('input') ? 'val' : 'html'                                                                       // 204
    var data = $el.data()                                                                                             // 205
                                                                                                                      // 206
    state = state + 'Text'                                                                                            // 207
                                                                                                                      // 208
    if (!data.resetText) $el.data('resetText', $el[val]())                                                            // 209
                                                                                                                      // 210
    $el[val](data[state] || this.options[state])                                                                      // 211
                                                                                                                      // 212
    // push to event loop to allow forms to submit                                                                    // 213
    setTimeout(function () {                                                                                          // 214
      state == 'loadingText' ?                                                                                        // 215
        $el.addClass(d).attr(d, d) :                                                                                  // 216
        $el.removeClass(d).removeAttr(d);                                                                             // 217
    }, 0)                                                                                                             // 218
  }                                                                                                                   // 219
                                                                                                                      // 220
  Button.prototype.toggle = function () {                                                                             // 221
    var $parent = this.$element.closest('[data-toggle="buttons"]')                                                    // 222
                                                                                                                      // 223
    if ($parent.length) {                                                                                             // 224
      var $input = this.$element.find('input')                                                                        // 225
        .prop('checked', !this.$element.hasClass('active'))                                                           // 226
        .trigger('change')                                                                                            // 227
      if ($input.prop('type') === 'radio') $parent.find('.active').removeClass('active')                              // 228
    }                                                                                                                 // 229
                                                                                                                      // 230
    this.$element.toggleClass('active')                                                                               // 231
  }                                                                                                                   // 232
                                                                                                                      // 233
                                                                                                                      // 234
  // BUTTON PLUGIN DEFINITION                                                                                         // 235
  // ========================                                                                                         // 236
                                                                                                                      // 237
  var old = $.fn.button                                                                                               // 238
                                                                                                                      // 239
  $.fn.button = function (option) {                                                                                   // 240
    return this.each(function () {                                                                                    // 241
      var $this   = $(this)                                                                                           // 242
      var data    = $this.data('bs.button')                                                                           // 243
      var options = typeof option == 'object' && option                                                               // 244
                                                                                                                      // 245
      if (!data) $this.data('bs.button', (data = new Button(this, options)))                                          // 246
                                                                                                                      // 247
      if (option == 'toggle') data.toggle()                                                                           // 248
      else if (option) data.setState(option)                                                                          // 249
    })                                                                                                                // 250
  }                                                                                                                   // 251
                                                                                                                      // 252
  $.fn.button.Constructor = Button                                                                                    // 253
                                                                                                                      // 254
                                                                                                                      // 255
  // BUTTON NO CONFLICT                                                                                               // 256
  // ==================                                                                                               // 257
                                                                                                                      // 258
  $.fn.button.noConflict = function () {                                                                              // 259
    $.fn.button = old                                                                                                 // 260
    return this                                                                                                       // 261
  }                                                                                                                   // 262
                                                                                                                      // 263
                                                                                                                      // 264
  // BUTTON DATA-API                                                                                                  // 265
  // ===============                                                                                                  // 266
                                                                                                                      // 267
  $(document).on('click.bs.button.data-api', '[data-toggle^=button]', function (e) {                                  // 268
    var $btn = $(e.target)                                                                                            // 269
    if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')                                                            // 270
    $btn.button('toggle')                                                                                             // 271
    e.preventDefault()                                                                                                // 272
  })                                                                                                                  // 273
                                                                                                                      // 274
}(jQuery);                                                                                                            // 275
                                                                                                                      // 276
/* ========================================================================                                           // 277
 * Bootstrap: carousel.js v3.0.2                                                                                      // 278
 * http://getbootstrap.com/javascript/#carousel                                                                       // 279
 * ========================================================================                                           // 280
 * Copyright 2013 Twitter, Inc.                                                                                       // 281
 *                                                                                                                    // 282
 * Licensed under the Apache License, Version 2.0 (the "License");                                                    // 283
 * you may not use this file except in compliance with the License.                                                   // 284
 * You may obtain a copy of the License at                                                                            // 285
 *                                                                                                                    // 286
 * http://www.apache.org/licenses/LICENSE-2.0                                                                         // 287
 *                                                                                                                    // 288
 * Unless required by applicable law or agreed to in writing, software                                                // 289
 * distributed under the License is distributed on an "AS IS" BASIS,                                                  // 290
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.                                           // 291
 * See the License for the specific language governing permissions and                                                // 292
 * limitations under the License.                                                                                     // 293
 * ======================================================================== */                                        // 294
                                                                                                                      // 295
                                                                                                                      // 296
+function ($) { "use strict";                                                                                         // 297
                                                                                                                      // 298
  // CAROUSEL CLASS DEFINITION                                                                                        // 299
  // =========================                                                                                        // 300
                                                                                                                      // 301
  var Carousel = function (element, options) {                                                                        // 302
    this.$element    = $(element)                                                                                     // 303
    this.$indicators = this.$element.find('.carousel-indicators')                                                     // 304
    this.options     = options                                                                                        // 305
    this.paused      =                                                                                                // 306
    this.sliding     =                                                                                                // 307
    this.interval    =                                                                                                // 308
    this.$active     =                                                                                                // 309
    this.$items      = null                                                                                           // 310
                                                                                                                      // 311
    this.options.pause == 'hover' && this.$element                                                                    // 312
      .on('mouseenter', $.proxy(this.pause, this))                                                                    // 313
      .on('mouseleave', $.proxy(this.cycle, this))                                                                    // 314
  }                                                                                                                   // 315
                                                                                                                      // 316
  Carousel.DEFAULTS = {                                                                                               // 317
    interval: 5000                                                                                                    // 318
  , pause: 'hover'                                                                                                    // 319
  , wrap: true                                                                                                        // 320
  }                                                                                                                   // 321
                                                                                                                      // 322
  Carousel.prototype.cycle =  function (e) {                                                                          // 323
    e || (this.paused = false)                                                                                        // 324
                                                                                                                      // 325
    this.interval && clearInterval(this.interval)                                                                     // 326
                                                                                                                      // 327
    this.options.interval                                                                                             // 328
      && !this.paused                                                                                                 // 329
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))                               // 330
                                                                                                                      // 331
    return this                                                                                                       // 332
  }                                                                                                                   // 333
                                                                                                                      // 334
  Carousel.prototype.getActiveIndex = function () {                                                                   // 335
    this.$active = this.$element.find('.item.active')                                                                 // 336
    this.$items  = this.$active.parent().children()                                                                   // 337
                                                                                                                      // 338
    return this.$items.index(this.$active)                                                                            // 339
  }                                                                                                                   // 340
                                                                                                                      // 341
  Carousel.prototype.to = function (pos) {                                                                            // 342
    var that        = this                                                                                            // 343
    var activeIndex = this.getActiveIndex()                                                                           // 344
                                                                                                                      // 345
    if (pos > (this.$items.length - 1) || pos < 0) return                                                             // 346
                                                                                                                      // 347
    if (this.sliding)       return this.$element.one('slid', function () { that.to(pos) })                            // 348
    if (activeIndex == pos) return this.pause().cycle()                                                               // 349
                                                                                                                      // 350
    return this.slide(pos > activeIndex ? 'next' : 'prev', $(this.$items[pos]))                                       // 351
  }                                                                                                                   // 352
                                                                                                                      // 353
  Carousel.prototype.pause = function (e) {                                                                           // 354
    e || (this.paused = true)                                                                                         // 355
                                                                                                                      // 356
    if (this.$element.find('.next, .prev').length && $.support.transition.end) {                                      // 357
      this.$element.trigger($.support.transition.end)                                                                 // 358
      this.cycle(true)                                                                                                // 359
    }                                                                                                                 // 360
                                                                                                                      // 361
    this.interval = clearInterval(this.interval)                                                                      // 362
                                                                                                                      // 363
    return this                                                                                                       // 364
  }                                                                                                                   // 365
                                                                                                                      // 366
  Carousel.prototype.next = function () {                                                                             // 367
    if (this.sliding) return                                                                                          // 368
    return this.slide('next')                                                                                         // 369
  }                                                                                                                   // 370
                                                                                                                      // 371
  Carousel.prototype.prev = function () {                                                                             // 372
    if (this.sliding) return                                                                                          // 373
    return this.slide('prev')                                                                                         // 374
  }                                                                                                                   // 375
                                                                                                                      // 376
  Carousel.prototype.slide = function (type, next) {                                                                  // 377
    var $active   = this.$element.find('.item.active')                                                                // 378
    var $next     = next || $active[type]()                                                                           // 379
    var isCycling = this.interval                                                                                     // 380
    var direction = type == 'next' ? 'left' : 'right'                                                                 // 381
    var fallback  = type == 'next' ? 'first' : 'last'                                                                 // 382
    var that      = this                                                                                              // 383
                                                                                                                      // 384
    if (!$next.length) {                                                                                              // 385
      if (!this.options.wrap) return                                                                                  // 386
      $next = this.$element.find('.item')[fallback]()                                                                 // 387
    }                                                                                                                 // 388
                                                                                                                      // 389
    this.sliding = true                                                                                               // 390
                                                                                                                      // 391
    isCycling && this.pause()                                                                                         // 392
                                                                                                                      // 393
    var e = $.Event('slide.bs.carousel', { relatedTarget: $next[0], direction: direction })                           // 394
                                                                                                                      // 395
    if ($next.hasClass('active')) return                                                                              // 396
                                                                                                                      // 397
    if (this.$indicators.length) {                                                                                    // 398
      this.$indicators.find('.active').removeClass('active')                                                          // 399
      this.$element.one('slid', function () {                                                                         // 400
        var $nextIndicator = $(that.$indicators.children()[that.getActiveIndex()])                                    // 401
        $nextIndicator && $nextIndicator.addClass('active')                                                           // 402
      })                                                                                                              // 403
    }                                                                                                                 // 404
                                                                                                                      // 405
    if ($.support.transition && this.$element.hasClass('slide')) {                                                    // 406
      this.$element.trigger(e)                                                                                        // 407
      if (e.isDefaultPrevented()) return                                                                              // 408
      $next.addClass(type)                                                                                            // 409
      $next[0].offsetWidth // force reflow                                                                            // 410
      $active.addClass(direction)                                                                                     // 411
      $next.addClass(direction)                                                                                       // 412
      $active                                                                                                         // 413
        .one($.support.transition.end, function () {                                                                  // 414
          $next.removeClass([type, direction].join(' ')).addClass('active')                                           // 415
          $active.removeClass(['active', direction].join(' '))                                                        // 416
          that.sliding = false                                                                                        // 417
          setTimeout(function () { that.$element.trigger('slid') }, 0)                                                // 418
        })                                                                                                            // 419
        .emulateTransitionEnd(600)                                                                                    // 420
    } else {                                                                                                          // 421
      this.$element.trigger(e)                                                                                        // 422
      if (e.isDefaultPrevented()) return                                                                              // 423
      $active.removeClass('active')                                                                                   // 424
      $next.addClass('active')                                                                                        // 425
      this.sliding = false                                                                                            // 426
      this.$element.trigger('slid')                                                                                   // 427
    }                                                                                                                 // 428
                                                                                                                      // 429
    isCycling && this.cycle()                                                                                         // 430
                                                                                                                      // 431
    return this                                                                                                       // 432
  }                                                                                                                   // 433
                                                                                                                      // 434
                                                                                                                      // 435
  // CAROUSEL PLUGIN DEFINITION                                                                                       // 436
  // ==========================                                                                                       // 437
                                                                                                                      // 438
  var old = $.fn.carousel                                                                                             // 439
                                                                                                                      // 440
  $.fn.carousel = function (option) {                                                                                 // 441
    return this.each(function () {                                                                                    // 442
      var $this   = $(this)                                                                                           // 443
      var data    = $this.data('bs.carousel')                                                                         // 444
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)                // 445
      var action  = typeof option == 'string' ? option : options.slide                                                // 446
                                                                                                                      // 447
      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))                                      // 448
      if (typeof option == 'number') data.to(option)                                                                  // 449
      else if (action) data[action]()                                                                                 // 450
      else if (options.interval) data.pause().cycle()                                                                 // 451
    })                                                                                                                // 452
  }                                                                                                                   // 453
                                                                                                                      // 454
  $.fn.carousel.Constructor = Carousel                                                                                // 455
                                                                                                                      // 456
                                                                                                                      // 457
  // CAROUSEL NO CONFLICT                                                                                             // 458
  // ====================                                                                                             // 459
                                                                                                                      // 460
  $.fn.carousel.noConflict = function () {                                                                            // 461
    $.fn.carousel = old                                                                                               // 462
    return this                                                                                                       // 463
  }                                                                                                                   // 464
                                                                                                                      // 465
                                                                                                                      // 466
  // CAROUSEL DATA-API                                                                                                // 467
  // =================                                                                                                // 468
                                                                                                                      // 469
  $(document).on('click.bs.carousel.data-api', '[data-slide], [data-slide-to]', function (e) {                        // 470
    var $this   = $(this), href                                                                                       // 471
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
    var options = $.extend({}, $target.data(), $this.data())                                                          // 473
    var slideIndex = $this.attr('data-slide-to')                                                                      // 474
    if (slideIndex) options.interval = false                                                                          // 475
                                                                                                                      // 476
    $target.carousel(options)                                                                                         // 477
                                                                                                                      // 478
    if (slideIndex = $this.attr('data-slide-to')) {                                                                   // 479
      $target.data('bs.carousel').to(slideIndex)                                                                      // 480
    }                                                                                                                 // 481
                                                                                                                      // 482
    e.preventDefault()                                                                                                // 483
  })                                                                                                                  // 484
                                                                                                                      // 485
  $(window).on('load', function () {                                                                                  // 486
    $('[data-ride="carousel"]').each(function () {                                                                    // 487
      var $carousel = $(this)                                                                                         // 488
      $carousel.carousel($carousel.data())                                                                            // 489
    })                                                                                                                // 490
  })                                                                                                                  // 491
                                                                                                                      // 492
}(jQuery);                                                                                                            // 493
                                                                                                                      // 494
/* ========================================================================                                           // 495
 * Bootstrap: collapse.js v3.0.2                                                                                      // 496
 * http://getbootstrap.com/javascript/#collapse                                                                       // 497
 * ========================================================================                                           // 498
 * Copyright 2013 Twitter, Inc.                                                                                       // 499
 *                                                                                                                    // 500
 * Licensed under the Apache License, Version 2.0 (the "License");                                                    // 501
 * you may not use this file except in compliance with the License.                                                   // 502
 * You may obtain a copy of the License at                                                                            // 503
 *                                                                                                                    // 504
 * http://www.apache.org/licenses/LICENSE-2.0                                                                         // 505
 *                                                                                                                    // 506
 * Unless required by applicable law or agreed to in writing, software                                                // 507
 * distributed under the License is distributed on an "AS IS" BASIS,                                                  // 508
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.                                           // 509
 * See the License for the specific language governing permissions and                                                // 510
 * limitations under the License.                                                                                     // 511
 * ======================================================================== */                                        // 512
                                                                                                                      // 513
                                                                                                                      // 514
+function ($) { "use strict";                                                                                         // 515
                                                                                                                      // 516
  // COLLAPSE PUBLIC CLASS DEFINITION                                                                                 // 517
  // ================================                                                                                 // 518
                                                                                                                      // 519
  var Collapse = function (element, options) {                                                                        // 520
    this.$element      = $(element)                                                                                   // 521
    this.options       = $.extend({}, Collapse.DEFAULTS, options)                                                     // 522
    this.transitioning = null                                                                                         // 523
                                                                                                                      // 524
    if (this.options.parent) this.$parent = $(this.options.parent)                                                    // 525
    if (this.options.toggle) this.toggle()                                                                            // 526
  }                                                                                                                   // 527
                                                                                                                      // 528
  Collapse.DEFAULTS = {                                                                                               // 529
    toggle: true                                                                                                      // 530
  }                                                                                                                   // 531
                                                                                                                      // 532
  Collapse.prototype.dimension = function () {                                                                        // 533
    var hasWidth = this.$element.hasClass('width')                                                                    // 534
    return hasWidth ? 'width' : 'height'                                                                              // 535
  }                                                                                                                   // 536
                                                                                                                      // 537
  Collapse.prototype.show = function () {                                                                             // 538
    if (this.transitioning || this.$element.hasClass('in')) return                                                    // 539
                                                                                                                      // 540
    var startEvent = $.Event('show.bs.collapse')                                                                      // 541
    this.$element.trigger(startEvent)                                                                                 // 542
    if (startEvent.isDefaultPrevented()) return                                                                       // 543
                                                                                                                      // 544
    var actives = this.$parent && this.$parent.find('> .panel > .in')                                                 // 545
                                                                                                                      // 546
    if (actives && actives.length) {                                                                                  // 547
      var hasData = actives.data('bs.collapse')                                                                       // 548
      if (hasData && hasData.transitioning) return                                                                    // 549
      actives.collapse('hide')                                                                                        // 550
      hasData || actives.data('bs.collapse', null)                                                                    // 551
    }                                                                                                                 // 552
                                                                                                                      // 553
    var dimension = this.dimension()                                                                                  // 554
                                                                                                                      // 555
    this.$element                                                                                                     // 556
      .removeClass('collapse')                                                                                        // 557
      .addClass('collapsing')                                                                                         // 558
      [dimension](0)                                                                                                  // 559
                                                                                                                      // 560
    this.transitioning = 1                                                                                            // 561
                                                                                                                      // 562
    var complete = function () {                                                                                      // 563
      this.$element                                                                                                   // 564
        .removeClass('collapsing')                                                                                    // 565
        .addClass('in')                                                                                               // 566
        [dimension]('auto')                                                                                           // 567
      this.transitioning = 0                                                                                          // 568
      this.$element.trigger('shown.bs.collapse')                                                                      // 569
    }                                                                                                                 // 570
                                                                                                                      // 571
    if (!$.support.transition) return complete.call(this)                                                             // 572
                                                                                                                      // 573
    var scrollSize = $.camelCase(['scroll', dimension].join('-'))                                                     // 574
                                                                                                                      // 575
    this.$element                                                                                                     // 576
      .one($.support.transition.end, $.proxy(complete, this))                                                         // 577
      .emulateTransitionEnd(350)                                                                                      // 578
      [dimension](this.$element[0][scrollSize])                                                                       // 579
  }                                                                                                                   // 580
                                                                                                                      // 581
  Collapse.prototype.hide = function () {                                                                             // 582
    if (this.transitioning || !this.$element.hasClass('in')) return                                                   // 583
                                                                                                                      // 584
    var startEvent = $.Event('hide.bs.collapse')                                                                      // 585
    this.$element.trigger(startEvent)                                                                                 // 586
    if (startEvent.isDefaultPrevented()) return                                                                       // 587
                                                                                                                      // 588
    var dimension = this.dimension()                                                                                  // 589
                                                                                                                      // 590
    this.$element                                                                                                     // 591
      [dimension](this.$element[dimension]())                                                                         // 592
      [0].offsetHeight                                                                                                // 593
                                                                                                                      // 594
    this.$element                                                                                                     // 595
      .addClass('collapsing')                                                                                         // 596
      .removeClass('collapse')                                                                                        // 597
      .removeClass('in')                                                                                              // 598
                                                                                                                      // 599
    this.transitioning = 1                                                                                            // 600
                                                                                                                      // 601
    var complete = function () {                                                                                      // 602
      this.transitioning = 0                                                                                          // 603
      this.$element                                                                                                   // 604
        .trigger('hidden.bs.collapse')                                                                                // 605
        .removeClass('collapsing')                                                                                    // 606
        .addClass('collapse')                                                                                         // 607
    }                                                                                                                 // 608
                                                                                                                      // 609
    if (!$.support.transition) return complete.call(this)                                                             // 610
                                                                                                                      // 611
    this.$element                                                                                                     // 612
      [dimension](0)                                                                                                  // 613
      .one($.support.transition.end, $.proxy(complete, this))                                                         // 614
      .emulateTransitionEnd(350)                                                                                      // 615
  }                                                                                                                   // 616
                                                                                                                      // 617
  Collapse.prototype.toggle = function () {                                                                           // 618
    this[this.$element.hasClass('in') ? 'hide' : 'show']()                                                            // 619
  }                                                                                                                   // 620
                                                                                                                      // 621
                                                                                                                      // 622
  // COLLAPSE PLUGIN DEFINITION                                                                                       // 623
  // ==========================                                                                                       // 624
                                                                                                                      // 625
  var old = $.fn.collapse                                                                                             // 626
                                                                                                                      // 627
  $.fn.collapse = function (option) {                                                                                 // 628
    return this.each(function () {                                                                                    // 629
      var $this   = $(this)                                                                                           // 630
      var data    = $this.data('bs.collapse')                                                                         // 631
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)                // 632
                                                                                                                      // 633
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))                                      // 634
      if (typeof option == 'string') data[option]()                                                                   // 635
    })                                                                                                                // 636
  }                                                                                                                   // 637
                                                                                                                      // 638
  $.fn.collapse.Constructor = Collapse                                                                                // 639
                                                                                                                      // 640
                                                                                                                      // 641
  // COLLAPSE NO CONFLICT                                                                                             // 642
  // ====================                                                                                             // 643
                                                                                                                      // 644
  $.fn.collapse.noConflict = function () {                                                                            // 645
    $.fn.collapse = old                                                                                               // 646
    return this                                                                                                       // 647
  }                                                                                                                   // 648
                                                                                                                      // 649
                                                                                                                      // 650
  // COLLAPSE DATA-API                                                                                                // 651
  // =================                                                                                                // 652
                                                                                                                      // 653
  $(document).on('click.bs.collapse.data-api', '[data-toggle=collapse]', function (e) {                               // 654
    var $this   = $(this), href                                                                                       // 655
    var target  = $this.attr('data-target')                                                                           // 656
        || e.preventDefault()                                                                                         // 657
        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7                          // 658
    var $target = $(target)                                                                                           // 659
    var data    = $target.data('bs.collapse')                                                                         // 660
    var option  = data ? 'toggle' : $this.data()                                                                      // 661
    var parent  = $this.attr('data-parent')                                                                           // 662
    var $parent = parent && $(parent)                                                                                 // 663
                                                                                                                      // 664
    if (!data || !data.transitioning) {                                                                               // 665
      if ($parent) $parent.find('[data-toggle=collapse][data-parent="' + parent + '"]').not($this).addClass('collapsed')
      $this[$target.hasClass('in') ? 'addClass' : 'removeClass']('collapsed')                                         // 667
    }                                                                                                                 // 668
                                                                                                                      // 669
    $target.collapse(option)                                                                                          // 670
  })                                                                                                                  // 671
                                                                                                                      // 672
}(jQuery);                                                                                                            // 673
                                                                                                                      // 674
/* ========================================================================                                           // 675
 * Bootstrap: dropdown.js v3.0.2                                                                                      // 676
 * http://getbootstrap.com/javascript/#dropdowns                                                                      // 677
 * ========================================================================                                           // 678
 * Copyright 2013 Twitter, Inc.                                                                                       // 679
 *                                                                                                                    // 680
 * Licensed under the Apache License, Version 2.0 (the "License");                                                    // 681
 * you may not use this file except in compliance with the License.                                                   // 682
 * You may obtain a copy of the License at                                                                            // 683
 *                                                                                                                    // 684
 * http://www.apache.org/licenses/LICENSE-2.0                                                                         // 685
 *                                                                                                                    // 686
 * Unless required by applicable law or agreed to in writing, software                                                // 687
 * distributed under the License is distributed on an "AS IS" BASIS,                                                  // 688
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.                                           // 689
 * See the License for the specific language governing permissions and                                                // 690
 * limitations under the License.                                                                                     // 691
 * ======================================================================== */                                        // 692
                                                                                                                      // 693
                                                                                                                      // 694
+function ($) { "use strict";                                                                                         // 695
                                                                                                                      // 696
  // DROPDOWN CLASS DEFINITION                                                                                        // 697
  // =========================                                                                                        // 698
                                                                                                                      // 699
  var backdrop = '.dropdown-backdrop'                                                                                 // 700
  var toggle   = '[data-toggle=dropdown]'                                                                             // 701
  var Dropdown = function (element) {                                                                                 // 702
    var $el = $(element).on('click.bs.dropdown', this.toggle)                                                         // 703
  }                                                                                                                   // 704
                                                                                                                      // 705
  Dropdown.prototype.toggle = function (e) {                                                                          // 706
    var $this = $(this)                                                                                               // 707
                                                                                                                      // 708
    if ($this.is('.disabled, :disabled')) return                                                                      // 709
                                                                                                                      // 710
    var $parent  = getParent($this)                                                                                   // 711
    var isActive = $parent.hasClass('open')                                                                           // 712
                                                                                                                      // 713
    clearMenus()                                                                                                      // 714
                                                                                                                      // 715
    if (!isActive) {                                                                                                  // 716
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {                     // 717
        // if mobile we we use a backdrop because click events don't delegate                                         // 718
        $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus)                            // 719
      }                                                                                                               // 720
                                                                                                                      // 721
      $parent.trigger(e = $.Event('show.bs.dropdown'))                                                                // 722
                                                                                                                      // 723
      if (e.isDefaultPrevented()) return                                                                              // 724
                                                                                                                      // 725
      $parent                                                                                                         // 726
        .toggleClass('open')                                                                                          // 727
        .trigger('shown.bs.dropdown')                                                                                 // 728
                                                                                                                      // 729
      $this.focus()                                                                                                   // 730
    }                                                                                                                 // 731
                                                                                                                      // 732
    return false                                                                                                      // 733
  }                                                                                                                   // 734
                                                                                                                      // 735
  Dropdown.prototype.keydown = function (e) {                                                                         // 736
    if (!/(38|40|27)/.test(e.keyCode)) return                                                                         // 737
                                                                                                                      // 738
    var $this = $(this)                                                                                               // 739
                                                                                                                      // 740
    e.preventDefault()                                                                                                // 741
    e.stopPropagation()                                                                                               // 742
                                                                                                                      // 743
    if ($this.is('.disabled, :disabled')) return                                                                      // 744
                                                                                                                      // 745
    var $parent  = getParent($this)                                                                                   // 746
    var isActive = $parent.hasClass('open')                                                                           // 747
                                                                                                                      // 748
    if (!isActive || (isActive && e.keyCode == 27)) {                                                                 // 749
      if (e.which == 27) $parent.find(toggle).focus()                                                                 // 750
      return $this.click()                                                                                            // 751
    }                                                                                                                 // 752
                                                                                                                      // 753
    var $items = $('[role=menu] li:not(.divider):visible a', $parent)                                                 // 754
                                                                                                                      // 755
    if (!$items.length) return                                                                                        // 756
                                                                                                                      // 757
    var index = $items.index($items.filter(':focus'))                                                                 // 758
                                                                                                                      // 759
    if (e.keyCode == 38 && index > 0)                 index--                        // up                            // 760
    if (e.keyCode == 40 && index < $items.length - 1) index++                        // down                          // 761
    if (!~index)                                      index=0                                                         // 762
                                                                                                                      // 763
    $items.eq(index).focus()                                                                                          // 764
  }                                                                                                                   // 765
                                                                                                                      // 766
  function clearMenus() {                                                                                             // 767
    $(backdrop).remove()                                                                                              // 768
    $(toggle).each(function (e) {                                                                                     // 769
      var $parent = getParent($(this))                                                                                // 770
      if (!$parent.hasClass('open')) return                                                                           // 771
      $parent.trigger(e = $.Event('hide.bs.dropdown'))                                                                // 772
      if (e.isDefaultPrevented()) return                                                                              // 773
      $parent.removeClass('open').trigger('hidden.bs.dropdown')                                                       // 774
    })                                                                                                                // 775
  }                                                                                                                   // 776
                                                                                                                      // 777
  function getParent($this) {                                                                                         // 778
    var selector = $this.attr('data-target')                                                                          // 779
                                                                                                                      // 780
    if (!selector) {                                                                                                  // 781
      selector = $this.attr('href')                                                                                   // 782
      selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7             // 783
    }                                                                                                                 // 784
                                                                                                                      // 785
    var $parent = selector && $(selector)                                                                             // 786
                                                                                                                      // 787
    return $parent && $parent.length ? $parent : $this.parent()                                                       // 788
  }                                                                                                                   // 789
                                                                                                                      // 790
                                                                                                                      // 791
  // DROPDOWN PLUGIN DEFINITION                                                                                       // 792
  // ==========================                                                                                       // 793
                                                                                                                      // 794
  var old = $.fn.dropdown                                                                                             // 795
                                                                                                                      // 796
  $.fn.dropdown = function (option) {                                                                                 // 797
    return this.each(function () {                                                                                    // 798
      var $this = $(this)                                                                                             // 799
      var data  = $this.data('dropdown')                                                                              // 800
                                                                                                                      // 801
      if (!data) $this.data('dropdown', (data = new Dropdown(this)))                                                  // 802
      if (typeof option == 'string') data[option].call($this)                                                         // 803
    })                                                                                                                // 804
  }                                                                                                                   // 805
                                                                                                                      // 806
  $.fn.dropdown.Constructor = Dropdown                                                                                // 807
                                                                                                                      // 808
                                                                                                                      // 809
  // DROPDOWN NO CONFLICT                                                                                             // 810
  // ====================                                                                                             // 811
                                                                                                                      // 812
  $.fn.dropdown.noConflict = function () {                                                                            // 813
    $.fn.dropdown = old                                                                                               // 814
    return this                                                                                                       // 815
  }                                                                                                                   // 816
                                                                                                                      // 817
                                                                                                                      // 818
  // APPLY TO STANDARD DROPDOWN ELEMENTS                                                                              // 819
  // ===================================                                                                              // 820
                                                                                                                      // 821
  $(document)                                                                                                         // 822
    .on('click.bs.dropdown.data-api', clearMenus)                                                                     // 823
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })                         // 824
    .on('click.bs.dropdown.data-api'  , toggle, Dropdown.prototype.toggle)                                            // 825
    .on('keydown.bs.dropdown.data-api', toggle + ', [role=menu]' , Dropdown.prototype.keydown)                        // 826
                                                                                                                      // 827
}(jQuery);                                                                                                            // 828
                                                                                                                      // 829
/* ========================================================================                                           // 830
 * Bootstrap: modal.js v3.0.2                                                                                         // 831
 * http://getbootstrap.com/javascript/#modals                                                                         // 832
 * ========================================================================                                           // 833
 * Copyright 2013 Twitter, Inc.                                                                                       // 834
 *                                                                                                                    // 835
 * Licensed under the Apache License, Version 2.0 (the "License");                                                    // 836
 * you may not use this file except in compliance with the License.                                                   // 837
 * You may obtain a copy of the License at                                                                            // 838
 *                                                                                                                    // 839
 * http://www.apache.org/licenses/LICENSE-2.0                                                                         // 840
 *                                                                                                                    // 841
 * Unless required by applicable law or agreed to in writing, software                                                // 842
 * distributed under the License is distributed on an "AS IS" BASIS,                                                  // 843
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.                                           // 844
 * See the License for the specific language governing permissions and                                                // 845
 * limitations under the License.                                                                                     // 846
 * ======================================================================== */                                        // 847
                                                                                                                      // 848
                                                                                                                      // 849
+function ($) { "use strict";                                                                                         // 850
                                                                                                                      // 851
  // MODAL CLASS DEFINITION                                                                                           // 852
  // ======================                                                                                           // 853
                                                                                                                      // 854
  var Modal = function (element, options) {                                                                           // 855
    this.options   = options                                                                                          // 856
    this.$element  = $(element)                                                                                       // 857
    this.$backdrop =                                                                                                  // 858
    this.isShown   = null                                                                                             // 859
                                                                                                                      // 860
    if (this.options.remote) this.$element.load(this.options.remote)                                                  // 861
  }                                                                                                                   // 862
                                                                                                                      // 863
  Modal.DEFAULTS = {                                                                                                  // 864
      backdrop: true                                                                                                  // 865
    , keyboard: true                                                                                                  // 866
    , show: true                                                                                                      // 867
  }                                                                                                                   // 868
                                                                                                                      // 869
  Modal.prototype.toggle = function (_relatedTarget) {                                                                // 870
    return this[!this.isShown ? 'show' : 'hide'](_relatedTarget)                                                      // 871
  }                                                                                                                   // 872
                                                                                                                      // 873
  Modal.prototype.show = function (_relatedTarget) {                                                                  // 874
    var that = this                                                                                                   // 875
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })                                            // 876
                                                                                                                      // 877
    this.$element.trigger(e)                                                                                          // 878
                                                                                                                      // 879
    if (this.isShown || e.isDefaultPrevented()) return                                                                // 880
                                                                                                                      // 881
    this.isShown = true                                                                                               // 882
                                                                                                                      // 883
    this.escape()                                                                                                     // 884
                                                                                                                      // 885
    this.$element.on('click.dismiss.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))                       // 886
                                                                                                                      // 887
    this.backdrop(function () {                                                                                       // 888
      var transition = $.support.transition && that.$element.hasClass('fade')                                         // 889
                                                                                                                      // 890
      if (!that.$element.parent().length) {                                                                           // 891
        that.$element.appendTo(document.body) // don't move modals dom position                                       // 892
      }                                                                                                               // 893
                                                                                                                      // 894
      that.$element.show()                                                                                            // 895
                                                                                                                      // 896
      if (transition) {                                                                                               // 897
        that.$element[0].offsetWidth // force reflow                                                                  // 898
      }                                                                                                               // 899
                                                                                                                      // 900
      that.$element                                                                                                   // 901
        .addClass('in')                                                                                               // 902
        .attr('aria-hidden', false)                                                                                   // 903
                                                                                                                      // 904
      that.enforceFocus()                                                                                             // 905
                                                                                                                      // 906
      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })                                            // 907
                                                                                                                      // 908
      transition ?                                                                                                    // 909
        that.$element.find('.modal-dialog') // wait for modal to slide in                                             // 910
          .one($.support.transition.end, function () {                                                                // 911
            that.$element.focus().trigger(e)                                                                          // 912
          })                                                                                                          // 913
          .emulateTransitionEnd(300) :                                                                                // 914
        that.$element.focus().trigger(e)                                                                              // 915
    })                                                                                                                // 916
  }                                                                                                                   // 917
                                                                                                                      // 918
  Modal.prototype.hide = function (e) {                                                                               // 919
    if (e) e.preventDefault()                                                                                         // 920
                                                                                                                      // 921
    e = $.Event('hide.bs.modal')                                                                                      // 922
                                                                                                                      // 923
    this.$element.trigger(e)                                                                                          // 924
                                                                                                                      // 925
    if (!this.isShown || e.isDefaultPrevented()) return                                                               // 926
                                                                                                                      // 927
    this.isShown = false                                                                                              // 928
                                                                                                                      // 929
    this.escape()                                                                                                     // 930
                                                                                                                      // 931
    $(document).off('focusin.bs.modal')                                                                               // 932
                                                                                                                      // 933
    this.$element                                                                                                     // 934
      .removeClass('in')                                                                                              // 935
      .attr('aria-hidden', true)                                                                                      // 936
      .off('click.dismiss.modal')                                                                                     // 937
                                                                                                                      // 938
    $.support.transition && this.$element.hasClass('fade') ?                                                          // 939
      this.$element                                                                                                   // 940
        .one($.support.transition.end, $.proxy(this.hideModal, this))                                                 // 941
        .emulateTransitionEnd(300) :                                                                                  // 942
      this.hideModal()                                                                                                // 943
  }                                                                                                                   // 944
                                                                                                                      // 945
  Modal.prototype.enforceFocus = function () {                                                                        // 946
    $(document)                                                                                                       // 947
      .off('focusin.bs.modal') // guard against infinite focus loop                                                   // 948
      .on('focusin.bs.modal', $.proxy(function (e) {                                                                  // 949
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {                                   // 950
          this.$element.focus()                                                                                       // 951
        }                                                                                                             // 952
      }, this))                                                                                                       // 953
  }                                                                                                                   // 954
                                                                                                                      // 955
  Modal.prototype.escape = function () {                                                                              // 956
    if (this.isShown && this.options.keyboard) {                                                                      // 957
      this.$element.on('keyup.dismiss.bs.modal', $.proxy(function (e) {                                               // 958
        e.which == 27 && this.hide()                                                                                  // 959
      }, this))                                                                                                       // 960
    } else if (!this.isShown) {                                                                                       // 961
      this.$element.off('keyup.dismiss.bs.modal')                                                                     // 962
    }                                                                                                                 // 963
  }                                                                                                                   // 964
                                                                                                                      // 965
  Modal.prototype.hideModal = function () {                                                                           // 966
    var that = this                                                                                                   // 967
    this.$element.hide()                                                                                              // 968
    this.backdrop(function () {                                                                                       // 969
      that.removeBackdrop()                                                                                           // 970
      that.$element.trigger('hidden.bs.modal')                                                                        // 971
    })                                                                                                                // 972
  }                                                                                                                   // 973
                                                                                                                      // 974
  Modal.prototype.removeBackdrop = function () {                                                                      // 975
    this.$backdrop && this.$backdrop.remove()                                                                         // 976
    this.$backdrop = null                                                                                             // 977
  }                                                                                                                   // 978
                                                                                                                      // 979
  Modal.prototype.backdrop = function (callback) {                                                                    // 980
    var that    = this                                                                                                // 981
    var animate = this.$element.hasClass('fade') ? 'fade' : ''                                                        // 982
                                                                                                                      // 983
    if (this.isShown && this.options.backdrop) {                                                                      // 984
      var doAnimate = $.support.transition && animate                                                                 // 985
                                                                                                                      // 986
      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')                                            // 987
        .appendTo(document.body)                                                                                      // 988
                                                                                                                      // 989
      this.$element.on('click.dismiss.modal', $.proxy(function (e) {                                                  // 990
        if (e.target !== e.currentTarget) return                                                                      // 991
        this.options.backdrop == 'static'                                                                             // 992
          ? this.$element[0].focus.call(this.$element[0])                                                             // 993
          : this.hide.call(this)                                                                                      // 994
      }, this))                                                                                                       // 995
                                                                                                                      // 996
      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow                                                    // 997
                                                                                                                      // 998
      this.$backdrop.addClass('in')                                                                                   // 999
                                                                                                                      // 1000
      if (!callback) return                                                                                           // 1001
                                                                                                                      // 1002
      doAnimate ?                                                                                                     // 1003
        this.$backdrop                                                                                                // 1004
          .one($.support.transition.end, callback)                                                                    // 1005
          .emulateTransitionEnd(150) :                                                                                // 1006
        callback()                                                                                                    // 1007
                                                                                                                      // 1008
    } else if (!this.isShown && this.$backdrop) {                                                                     // 1009
      this.$backdrop.removeClass('in')                                                                                // 1010
                                                                                                                      // 1011
      $.support.transition && this.$element.hasClass('fade')?                                                         // 1012
        this.$backdrop                                                                                                // 1013
          .one($.support.transition.end, callback)                                                                    // 1014
          .emulateTransitionEnd(150) :                                                                                // 1015
        callback()                                                                                                    // 1016
                                                                                                                      // 1017
    } else if (callback) {                                                                                            // 1018
      callback()                                                                                                      // 1019
    }                                                                                                                 // 1020
  }                                                                                                                   // 1021
                                                                                                                      // 1022
                                                                                                                      // 1023
  // MODAL PLUGIN DEFINITION                                                                                          // 1024
  // =======================                                                                                          // 1025
                                                                                                                      // 1026
  var old = $.fn.modal                                                                                                // 1027
                                                                                                                      // 1028
  $.fn.modal = function (option, _relatedTarget) {                                                                    // 1029
    return this.each(function () {                                                                                    // 1030
      var $this   = $(this)                                                                                           // 1031
      var data    = $this.data('bs.modal')                                                                            // 1032
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)                   // 1033
                                                                                                                      // 1034
      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))                                            // 1035
      if (typeof option == 'string') data[option](_relatedTarget)                                                     // 1036
      else if (options.show) data.show(_relatedTarget)                                                                // 1037
    })                                                                                                                // 1038
  }                                                                                                                   // 1039
                                                                                                                      // 1040
  $.fn.modal.Constructor = Modal                                                                                      // 1041
                                                                                                                      // 1042
                                                                                                                      // 1043
  // MODAL NO CONFLICT                                                                                                // 1044
  // =================                                                                                                // 1045
                                                                                                                      // 1046
  $.fn.modal.noConflict = function () {                                                                               // 1047
    $.fn.modal = old                                                                                                  // 1048
    return this                                                                                                       // 1049
  }                                                                                                                   // 1050
                                                                                                                      // 1051
                                                                                                                      // 1052
  // MODAL DATA-API                                                                                                   // 1053
  // ==============                                                                                                   // 1054
                                                                                                                      // 1055
  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {                                   // 1056
    var $this   = $(this)                                                                                             // 1057
    var href    = $this.attr('href')                                                                                  // 1058
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) //strip for ie7        // 1059
    var option  = $target.data('modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())
                                                                                                                      // 1061
    e.preventDefault()                                                                                                // 1062
                                                                                                                      // 1063
    $target                                                                                                           // 1064
      .modal(option, this)                                                                                            // 1065
      .one('hide', function () {                                                                                      // 1066
        $this.is(':visible') && $this.focus()                                                                         // 1067
      })                                                                                                              // 1068
  })                                                                                                                  // 1069
                                                                                                                      // 1070
  $(document)                                                                                                         // 1071
    .on('show.bs.modal',  '.modal', function () { $(document.body).addClass('modal-open') })                          // 1072
    .on('hidden.bs.modal', '.modal', function () { $(document.body).removeClass('modal-open') })                      // 1073
                                                                                                                      // 1074
}(jQuery);                                                                                                            // 1075
                                                                                                                      // 1076
/* ========================================================================                                           // 1077
 * Bootstrap: tooltip.js v3.0.2                                                                                       // 1078
 * http://getbootstrap.com/javascript/#tooltip                                                                        // 1079
 * Inspired by the original jQuery.tipsy by Jason Frame                                                               // 1080
 * ========================================================================                                           // 1081
 * Copyright 2013 Twitter, Inc.                                                                                       // 1082
 *                                                                                                                    // 1083
 * Licensed under the Apache License, Version 2.0 (the "License");                                                    // 1084
 * you may not use this file except in compliance with the License.                                                   // 1085
 * You may obtain a copy of the License at                                                                            // 1086
 *                                                                                                                    // 1087
 * http://www.apache.org/licenses/LICENSE-2.0                                                                         // 1088
 *                                                                                                                    // 1089
 * Unless required by applicable law or agreed to in writing, software                                                // 1090
 * distributed under the License is distributed on an "AS IS" BASIS,                                                  // 1091
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.                                           // 1092
 * See the License for the specific language governing permissions and                                                // 1093
 * limitations under the License.                                                                                     // 1094
 * ======================================================================== */                                        // 1095
                                                                                                                      // 1096
                                                                                                                      // 1097
+function ($) { "use strict";                                                                                         // 1098
                                                                                                                      // 1099
  // TOOLTIP PUBLIC CLASS DEFINITION                                                                                  // 1100
  // ===============================                                                                                  // 1101
                                                                                                                      // 1102
  var Tooltip = function (element, options) {                                                                         // 1103
    this.type       =                                                                                                 // 1104
    this.options    =                                                                                                 // 1105
    this.enabled    =                                                                                                 // 1106
    this.timeout    =                                                                                                 // 1107
    this.hoverState =                                                                                                 // 1108
    this.$element   = null                                                                                            // 1109
                                                                                                                      // 1110
    this.init('tooltip', element, options)                                                                            // 1111
  }                                                                                                                   // 1112
                                                                                                                      // 1113
  Tooltip.DEFAULTS = {                                                                                                // 1114
    animation: true                                                                                                   // 1115
  , placement: 'top'                                                                                                  // 1116
  , selector: false                                                                                                   // 1117
  , template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'         // 1118
  , trigger: 'hover focus'                                                                                            // 1119
  , title: ''                                                                                                         // 1120
  , delay: 0                                                                                                          // 1121
  , html: false                                                                                                       // 1122
  , container: false                                                                                                  // 1123
  }                                                                                                                   // 1124
                                                                                                                      // 1125
  Tooltip.prototype.init = function (type, element, options) {                                                        // 1126
    this.enabled  = true                                                                                              // 1127
    this.type     = type                                                                                              // 1128
    this.$element = $(element)                                                                                        // 1129
    this.options  = this.getOptions(options)                                                                          // 1130
                                                                                                                      // 1131
    var triggers = this.options.trigger.split(' ')                                                                    // 1132
                                                                                                                      // 1133
    for (var i = triggers.length; i--;) {                                                                             // 1134
      var trigger = triggers[i]                                                                                       // 1135
                                                                                                                      // 1136
      if (trigger == 'click') {                                                                                       // 1137
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))                     // 1138
      } else if (trigger != 'manual') {                                                                               // 1139
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focus'                                                    // 1140
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'blur'                                                     // 1141
                                                                                                                      // 1142
        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))                // 1143
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))                // 1144
      }                                                                                                               // 1145
    }                                                                                                                 // 1146
                                                                                                                      // 1147
    this.options.selector ?                                                                                           // 1148
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :                             // 1149
      this.fixTitle()                                                                                                 // 1150
  }                                                                                                                   // 1151
                                                                                                                      // 1152
  Tooltip.prototype.getDefaults = function () {                                                                       // 1153
    return Tooltip.DEFAULTS                                                                                           // 1154
  }                                                                                                                   // 1155
                                                                                                                      // 1156
  Tooltip.prototype.getOptions = function (options) {                                                                 // 1157
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)                                         // 1158
                                                                                                                      // 1159
    if (options.delay && typeof options.delay == 'number') {                                                          // 1160
      options.delay = {                                                                                               // 1161
        show: options.delay                                                                                           // 1162
      , hide: options.delay                                                                                           // 1163
      }                                                                                                               // 1164
    }                                                                                                                 // 1165
                                                                                                                      // 1166
    return options                                                                                                    // 1167
  }                                                                                                                   // 1168
                                                                                                                      // 1169
  Tooltip.prototype.getDelegateOptions = function () {                                                                // 1170
    var options  = {}                                                                                                 // 1171
    var defaults = this.getDefaults()                                                                                 // 1172
                                                                                                                      // 1173
    this._options && $.each(this._options, function (key, value) {                                                    // 1174
      if (defaults[key] != value) options[key] = value                                                                // 1175
    })                                                                                                                // 1176
                                                                                                                      // 1177
    return options                                                                                                    // 1178
  }                                                                                                                   // 1179
                                                                                                                      // 1180
  Tooltip.prototype.enter = function (obj) {                                                                          // 1181
    var self = obj instanceof this.constructor ?                                                                      // 1182
      obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)                        // 1183
                                                                                                                      // 1184
    clearTimeout(self.timeout)                                                                                        // 1185
                                                                                                                      // 1186
    self.hoverState = 'in'                                                                                            // 1187
                                                                                                                      // 1188
    if (!self.options.delay || !self.options.delay.show) return self.show()                                           // 1189
                                                                                                                      // 1190
    self.timeout = setTimeout(function () {                                                                           // 1191
      if (self.hoverState == 'in') self.show()                                                                        // 1192
    }, self.options.delay.show)                                                                                       // 1193
  }                                                                                                                   // 1194
                                                                                                                      // 1195
  Tooltip.prototype.leave = function (obj) {                                                                          // 1196
    var self = obj instanceof this.constructor ?                                                                      // 1197
      obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)                        // 1198
                                                                                                                      // 1199
    clearTimeout(self.timeout)                                                                                        // 1200
                                                                                                                      // 1201
    self.hoverState = 'out'                                                                                           // 1202
                                                                                                                      // 1203
    if (!self.options.delay || !self.options.delay.hide) return self.hide()                                           // 1204
                                                                                                                      // 1205
    self.timeout = setTimeout(function () {                                                                           // 1206
      if (self.hoverState == 'out') self.hide()                                                                       // 1207
    }, self.options.delay.hide)                                                                                       // 1208
  }                                                                                                                   // 1209
                                                                                                                      // 1210
  Tooltip.prototype.show = function () {                                                                              // 1211
    var e = $.Event('show.bs.'+ this.type)                                                                            // 1212
                                                                                                                      // 1213
    if (this.hasContent() && this.enabled) {                                                                          // 1214
      this.$element.trigger(e)                                                                                        // 1215
                                                                                                                      // 1216
      if (e.isDefaultPrevented()) return                                                                              // 1217
                                                                                                                      // 1218
      var $tip = this.tip()                                                                                           // 1219
                                                                                                                      // 1220
      this.setContent()                                                                                               // 1221
                                                                                                                      // 1222
      if (this.options.animation) $tip.addClass('fade')                                                               // 1223
                                                                                                                      // 1224
      var placement = typeof this.options.placement == 'function' ?                                                   // 1225
        this.options.placement.call(this, $tip[0], this.$element[0]) :                                                // 1226
        this.options.placement                                                                                        // 1227
                                                                                                                      // 1228
      var autoToken = /\s?auto?\s?/i                                                                                  // 1229
      var autoPlace = autoToken.test(placement)                                                                       // 1230
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'                                            // 1231
                                                                                                                      // 1232
      $tip                                                                                                            // 1233
        .detach()                                                                                                     // 1234
        .css({ top: 0, left: 0, display: 'block' })                                                                   // 1235
        .addClass(placement)                                                                                          // 1236
                                                                                                                      // 1237
      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)                // 1238
                                                                                                                      // 1239
      var pos          = this.getPosition()                                                                           // 1240
      var actualWidth  = $tip[0].offsetWidth                                                                          // 1241
      var actualHeight = $tip[0].offsetHeight                                                                         // 1242
                                                                                                                      // 1243
      if (autoPlace) {                                                                                                // 1244
        var $parent = this.$element.parent()                                                                          // 1245
                                                                                                                      // 1246
        var orgPlacement = placement                                                                                  // 1247
        var docScroll    = document.documentElement.scrollTop || document.body.scrollTop                              // 1248
        var parentWidth  = this.options.container == 'body' ? window.innerWidth  : $parent.outerWidth()               // 1249
        var parentHeight = this.options.container == 'body' ? window.innerHeight : $parent.outerHeight()              // 1250
        var parentLeft   = this.options.container == 'body' ? 0 : $parent.offset().left                               // 1251
                                                                                                                      // 1252
        placement = placement == 'bottom' && pos.top   + pos.height  + actualHeight - docScroll > parentHeight  ? 'top'    :
                    placement == 'top'    && pos.top   - docScroll   - actualHeight < 0                         ? 'bottom' :
                    placement == 'right'  && pos.right + actualWidth > parentWidth                              ? 'left'   :
                    placement == 'left'   && pos.left  - actualWidth < parentLeft                               ? 'right'  :
                    placement                                                                                         // 1257
                                                                                                                      // 1258
        $tip                                                                                                          // 1259
          .removeClass(orgPlacement)                                                                                  // 1260
          .addClass(placement)                                                                                        // 1261
      }                                                                                                               // 1262
                                                                                                                      // 1263
      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)                      // 1264
                                                                                                                      // 1265
      this.applyPlacement(calculatedOffset, placement)                                                                // 1266
      this.$element.trigger('shown.bs.' + this.type)                                                                  // 1267
    }                                                                                                                 // 1268
  }                                                                                                                   // 1269
                                                                                                                      // 1270
  Tooltip.prototype.applyPlacement = function(offset, placement) {                                                    // 1271
    var replace                                                                                                       // 1272
    var $tip   = this.tip()                                                                                           // 1273
    var width  = $tip[0].offsetWidth                                                                                  // 1274
    var height = $tip[0].offsetHeight                                                                                 // 1275
                                                                                                                      // 1276
    // manually read margins because getBoundingClientRect includes difference                                        // 1277
    var marginTop = parseInt($tip.css('margin-top'), 10)                                                              // 1278
    var marginLeft = parseInt($tip.css('margin-left'), 10)                                                            // 1279
                                                                                                                      // 1280
    // we must check for NaN for ie 8/9                                                                               // 1281
    if (isNaN(marginTop))  marginTop  = 0                                                                             // 1282
    if (isNaN(marginLeft)) marginLeft = 0                                                                             // 1283
                                                                                                                      // 1284
    offset.top  = offset.top  + marginTop                                                                             // 1285
    offset.left = offset.left + marginLeft                                                                            // 1286
                                                                                                                      // 1287
    $tip                                                                                                              // 1288
      .offset(offset)                                                                                                 // 1289
      .addClass('in')                                                                                                 // 1290
                                                                                                                      // 1291
    // check to see if placing tip in new offset caused the tip to resize itself                                      // 1292
    var actualWidth  = $tip[0].offsetWidth                                                                            // 1293
    var actualHeight = $tip[0].offsetHeight                                                                           // 1294
                                                                                                                      // 1295
    if (placement == 'top' && actualHeight != height) {                                                               // 1296
      replace = true                                                                                                  // 1297
      offset.top = offset.top + height - actualHeight                                                                 // 1298
    }                                                                                                                 // 1299
                                                                                                                      // 1300
    if (/bottom|top/.test(placement)) {                                                                               // 1301
      var delta = 0                                                                                                   // 1302
                                                                                                                      // 1303
      if (offset.left < 0) {                                                                                          // 1304
        delta       = offset.left * -2                                                                                // 1305
        offset.left = 0                                                                                               // 1306
                                                                                                                      // 1307
        $tip.offset(offset)                                                                                           // 1308
                                                                                                                      // 1309
        actualWidth  = $tip[0].offsetWidth                                                                            // 1310
        actualHeight = $tip[0].offsetHeight                                                                           // 1311
      }                                                                                                               // 1312
                                                                                                                      // 1313
      this.replaceArrow(delta - width + actualWidth, actualWidth, 'left')                                             // 1314
    } else {                                                                                                          // 1315
      this.replaceArrow(actualHeight - height, actualHeight, 'top')                                                   // 1316
    }                                                                                                                 // 1317
                                                                                                                      // 1318
    if (replace) $tip.offset(offset)                                                                                  // 1319
  }                                                                                                                   // 1320
                                                                                                                      // 1321
  Tooltip.prototype.replaceArrow = function(delta, dimension, position) {                                             // 1322
    this.arrow().css(position, delta ? (50 * (1 - delta / dimension) + "%") : '')                                     // 1323
  }                                                                                                                   // 1324
                                                                                                                      // 1325
  Tooltip.prototype.setContent = function () {                                                                        // 1326
    var $tip  = this.tip()                                                                                            // 1327
    var title = this.getTitle()                                                                                       // 1328
                                                                                                                      // 1329
    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)                                           // 1330
    $tip.removeClass('fade in top bottom left right')                                                                 // 1331
  }                                                                                                                   // 1332
                                                                                                                      // 1333
  Tooltip.prototype.hide = function () {                                                                              // 1334
    var that = this                                                                                                   // 1335
    var $tip = this.tip()                                                                                             // 1336
    var e    = $.Event('hide.bs.' + this.type)                                                                        // 1337
                                                                                                                      // 1338
    function complete() {                                                                                             // 1339
      if (that.hoverState != 'in') $tip.detach()                                                                      // 1340
    }                                                                                                                 // 1341
                                                                                                                      // 1342
    this.$element.trigger(e)                                                                                          // 1343
                                                                                                                      // 1344
    if (e.isDefaultPrevented()) return                                                                                // 1345
                                                                                                                      // 1346
    $tip.removeClass('in')                                                                                            // 1347
                                                                                                                      // 1348
    $.support.transition && this.$tip.hasClass('fade') ?                                                              // 1349
      $tip                                                                                                            // 1350
        .one($.support.transition.end, complete)                                                                      // 1351
        .emulateTransitionEnd(150) :                                                                                  // 1352
      complete()                                                                                                      // 1353
                                                                                                                      // 1354
    this.$element.trigger('hidden.bs.' + this.type)                                                                   // 1355
                                                                                                                      // 1356
    return this                                                                                                       // 1357
  }                                                                                                                   // 1358
                                                                                                                      // 1359
  Tooltip.prototype.fixTitle = function () {                                                                          // 1360
    var $e = this.$element                                                                                            // 1361
    if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') {                                     // 1362
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')                                        // 1363
    }                                                                                                                 // 1364
  }                                                                                                                   // 1365
                                                                                                                      // 1366
  Tooltip.prototype.hasContent = function () {                                                                        // 1367
    return this.getTitle()                                                                                            // 1368
  }                                                                                                                   // 1369
                                                                                                                      // 1370
  Tooltip.prototype.getPosition = function () {                                                                       // 1371
    var el = this.$element[0]                                                                                         // 1372
    return $.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : {              // 1373
      width: el.offsetWidth                                                                                           // 1374
    , height: el.offsetHeight                                                                                         // 1375
    }, this.$element.offset())                                                                                        // 1376
  }                                                                                                                   // 1377
                                                                                                                      // 1378
  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {                      // 1379
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width   } // 1383
  }                                                                                                                   // 1384
                                                                                                                      // 1385
  Tooltip.prototype.getTitle = function () {                                                                          // 1386
    var title                                                                                                         // 1387
    var $e = this.$element                                                                                            // 1388
    var o  = this.options                                                                                             // 1389
                                                                                                                      // 1390
    title = $e.attr('data-original-title')                                                                            // 1391
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)                                              // 1392
                                                                                                                      // 1393
    return title                                                                                                      // 1394
  }                                                                                                                   // 1395
                                                                                                                      // 1396
  Tooltip.prototype.tip = function () {                                                                               // 1397
    return this.$tip = this.$tip || $(this.options.template)                                                          // 1398
  }                                                                                                                   // 1399
                                                                                                                      // 1400
  Tooltip.prototype.arrow = function () {                                                                             // 1401
    return this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow')                                             // 1402
  }                                                                                                                   // 1403
                                                                                                                      // 1404
  Tooltip.prototype.validate = function () {                                                                          // 1405
    if (!this.$element[0].parentNode) {                                                                               // 1406
      this.hide()                                                                                                     // 1407
      this.$element = null                                                                                            // 1408
      this.options  = null                                                                                            // 1409
    }                                                                                                                 // 1410
  }                                                                                                                   // 1411
                                                                                                                      // 1412
  Tooltip.prototype.enable = function () {                                                                            // 1413
    this.enabled = true                                                                                               // 1414
  }                                                                                                                   // 1415
                                                                                                                      // 1416
  Tooltip.prototype.disable = function () {                                                                           // 1417
    this.enabled = false                                                                                              // 1418
  }                                                                                                                   // 1419
                                                                                                                      // 1420
  Tooltip.prototype.toggleEnabled = function () {                                                                     // 1421
    this.enabled = !this.enabled                                                                                      // 1422
  }                                                                                                                   // 1423
                                                                                                                      // 1424
  Tooltip.prototype.toggle = function (e) {                                                                           // 1425
    var self = e ? $(e.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type) : this            // 1426
    self.tip().hasClass('in') ? self.leave(self) : self.enter(self)                                                   // 1427
  }                                                                                                                   // 1428
                                                                                                                      // 1429
  Tooltip.prototype.destroy = function () {                                                                           // 1430
    this.hide().$element.off('.' + this.type).removeData('bs.' + this.type)                                           // 1431
  }                                                                                                                   // 1432
                                                                                                                      // 1433
                                                                                                                      // 1434
  // TOOLTIP PLUGIN DEFINITION                                                                                        // 1435
  // =========================                                                                                        // 1436
                                                                                                                      // 1437
  var old = $.fn.tooltip                                                                                              // 1438
                                                                                                                      // 1439
  $.fn.tooltip = function (option) {                                                                                  // 1440
    return this.each(function () {                                                                                    // 1441
      var $this   = $(this)                                                                                           // 1442
      var data    = $this.data('bs.tooltip')                                                                          // 1443
      var options = typeof option == 'object' && option                                                               // 1444
                                                                                                                      // 1445
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))                                        // 1446
      if (typeof option == 'string') data[option]()                                                                   // 1447
    })                                                                                                                // 1448
  }                                                                                                                   // 1449
                                                                                                                      // 1450
  $.fn.tooltip.Constructor = Tooltip                                                                                  // 1451
                                                                                                                      // 1452
                                                                                                                      // 1453
  // TOOLTIP NO CONFLICT                                                                                              // 1454
  // ===================                                                                                              // 1455
                                                                                                                      // 1456
  $.fn.tooltip.noConflict = function () {                                                                             // 1457
    $.fn.tooltip = old                                                                                                // 1458
    return this                                                                                                       // 1459
  }                                                                                                                   // 1460
                                                                                                                      // 1461
}(jQuery);                                                                                                            // 1462
                                                                                                                      // 1463
/* ========================================================================                                           // 1464
 * Bootstrap: popover.js v3.0.2                                                                                       // 1465
 * http://getbootstrap.com/javascript/#popovers                                                                       // 1466
 * ========================================================================                                           // 1467
 * Copyright 2013 Twitter, Inc.                                                                                       // 1468
 *                                                                                                                    // 1469
 * Licensed under the Apache License, Version 2.0 (the "License");                                                    // 1470
 * you may not use this file except in compliance with the License.                                                   // 1471
 * You may obtain a copy of the License at                                                                            // 1472
 *                                                                                                                    // 1473
 * http://www.apache.org/licenses/LICENSE-2.0                                                                         // 1474
 *                                                                                                                    // 1475
 * Unless required by applicable law or agreed to in writing, software                                                // 1476
 * distributed under the License is distributed on an "AS IS" BASIS,                                                  // 1477
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.                                           // 1478
 * See the License for the specific language governing permissions and                                                // 1479
 * limitations under the License.                                                                                     // 1480
 * ======================================================================== */                                        // 1481
                                                                                                                      // 1482
                                                                                                                      // 1483
+function ($) { "use strict";                                                                                         // 1484
                                                                                                                      // 1485
  // POPOVER PUBLIC CLASS DEFINITION                                                                                  // 1486
  // ===============================                                                                                  // 1487
                                                                                                                      // 1488
  var Popover = function (element, options) {                                                                         // 1489
    this.init('popover', element, options)                                                                            // 1490
  }                                                                                                                   // 1491
                                                                                                                      // 1492
  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')                                                   // 1493
                                                                                                                      // 1494
  Popover.DEFAULTS = $.extend({} , $.fn.tooltip.Constructor.DEFAULTS, {                                               // 1495
    placement: 'right'                                                                                                // 1496
  , trigger: 'click'                                                                                                  // 1497
  , content: ''                                                                                                       // 1498
  , template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })                                                                                                                  // 1500
                                                                                                                      // 1501
                                                                                                                      // 1502
  // NOTE: POPOVER EXTENDS tooltip.js                                                                                 // 1503
  // ================================                                                                                 // 1504
                                                                                                                      // 1505
  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)                                                // 1506
                                                                                                                      // 1507
  Popover.prototype.constructor = Popover                                                                             // 1508
                                                                                                                      // 1509
  Popover.prototype.getDefaults = function () {                                                                       // 1510
    return Popover.DEFAULTS                                                                                           // 1511
  }                                                                                                                   // 1512
                                                                                                                      // 1513
  Popover.prototype.setContent = function () {                                                                        // 1514
    var $tip    = this.tip()                                                                                          // 1515
    var title   = this.getTitle()                                                                                     // 1516
    var content = this.getContent()                                                                                   // 1517
                                                                                                                      // 1518
    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)                                           // 1519
    $tip.find('.popover-content')[this.options.html ? 'html' : 'text'](content)                                       // 1520
                                                                                                                      // 1521
    $tip.removeClass('fade top bottom left right in')                                                                 // 1522
                                                                                                                      // 1523
    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do                                      // 1524
    // this manually by checking the contents.                                                                        // 1525
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()                                       // 1526
  }                                                                                                                   // 1527
                                                                                                                      // 1528
  Popover.prototype.hasContent = function () {                                                                        // 1529
    return this.getTitle() || this.getContent()                                                                       // 1530
  }                                                                                                                   // 1531
                                                                                                                      // 1532
  Popover.prototype.getContent = function () {                                                                        // 1533
    var $e = this.$element                                                                                            // 1534
    var o  = this.options                                                                                             // 1535
                                                                                                                      // 1536
    return $e.attr('data-content')                                                                                    // 1537
      || (typeof o.content == 'function' ?                                                                            // 1538
            o.content.call($e[0]) :                                                                                   // 1539
            o.content)                                                                                                // 1540
  }                                                                                                                   // 1541
                                                                                                                      // 1542
  Popover.prototype.arrow = function () {                                                                             // 1543
    return this.$arrow = this.$arrow || this.tip().find('.arrow')                                                     // 1544
  }                                                                                                                   // 1545
                                                                                                                      // 1546
  Popover.prototype.tip = function () {                                                                               // 1547
    if (!this.$tip) this.$tip = $(this.options.template)                                                              // 1548
    return this.$tip                                                                                                  // 1549
  }                                                                                                                   // 1550
                                                                                                                      // 1551
                                                                                                                      // 1552
  // POPOVER PLUGIN DEFINITION                                                                                        // 1553
  // =========================                                                                                        // 1554
                                                                                                                      // 1555
  var old = $.fn.popover                                                                                              // 1556
                                                                                                                      // 1557
  $.fn.popover = function (option) {                                                                                  // 1558
    return this.each(function () {                                                                                    // 1559
      var $this   = $(this)                                                                                           // 1560
      var data    = $this.data('bs.popover')                                                                          // 1561
      var options = typeof option == 'object' && option                                                               // 1562
                                                                                                                      // 1563
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))                                        // 1564
      if (typeof option == 'string') data[option]()                                                                   // 1565
    })                                                                                                                // 1566
  }                                                                                                                   // 1567
                                                                                                                      // 1568
  $.fn.popover.Constructor = Popover                                                                                  // 1569
                                                                                                                      // 1570
                                                                                                                      // 1571
  // POPOVER NO CONFLICT                                                                                              // 1572
  // ===================                                                                                              // 1573
                                                                                                                      // 1574
  $.fn.popover.noConflict = function () {                                                                             // 1575
    $.fn.popover = old                                                                                                // 1576
    return this                                                                                                       // 1577
  }                                                                                                                   // 1578
                                                                                                                      // 1579
}(jQuery);                                                                                                            // 1580
                                                                                                                      // 1581
/* ========================================================================                                           // 1582
 * Bootstrap: scrollspy.js v3.0.2                                                                                     // 1583
 * http://getbootstrap.com/javascript/#scrollspy                                                                      // 1584
 * ========================================================================                                           // 1585
 * Copyright 2013 Twitter, Inc.                                                                                       // 1586
 *                                                                                                                    // 1587
 * Licensed under the Apache License, Version 2.0 (the "License");                                                    // 1588
 * you may not use this file except in compliance with the License.                                                   // 1589
 * You may obtain a copy of the License at                                                                            // 1590
 *                                                                                                                    // 1591
 * http://www.apache.org/licenses/LICENSE-2.0                                                                         // 1592
 *                                                                                                                    // 1593
 * Unless required by applicable law or agreed to in writing, software                                                // 1594
 * distributed under the License is distributed on an "AS IS" BASIS,                                                  // 1595
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.                                           // 1596
 * See the License for the specific language governing permissions and                                                // 1597
 * limitations under the License.                                                                                     // 1598
 * ======================================================================== */                                        // 1599
                                                                                                                      // 1600
                                                                                                                      // 1601
+function ($) { "use strict";                                                                                         // 1602
                                                                                                                      // 1603
  // SCROLLSPY CLASS DEFINITION                                                                                       // 1604
  // ==========================                                                                                       // 1605
                                                                                                                      // 1606
  function ScrollSpy(element, options) {                                                                              // 1607
    var href                                                                                                          // 1608
    var process  = $.proxy(this.process, this)                                                                        // 1609
                                                                                                                      // 1610
    this.$element       = $(element).is('body') ? $(window) : $(element)                                              // 1611
    this.$body          = $('body')                                                                                   // 1612
    this.$scrollElement = this.$element.on('scroll.bs.scroll-spy.data-api', process)                                  // 1613
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)                                                   // 1614
    this.selector       = (this.options.target                                                                        // 1615
      || ((href = $(element).attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7                     // 1616
      || '') + ' .nav li > a'                                                                                         // 1617
    this.offsets        = $([])                                                                                       // 1618
    this.targets        = $([])                                                                                       // 1619
    this.activeTarget   = null                                                                                        // 1620
                                                                                                                      // 1621
    this.refresh()                                                                                                    // 1622
    this.process()                                                                                                    // 1623
  }                                                                                                                   // 1624
                                                                                                                      // 1625
  ScrollSpy.DEFAULTS = {                                                                                              // 1626
    offset: 10                                                                                                        // 1627
  }                                                                                                                   // 1628
                                                                                                                      // 1629
  ScrollSpy.prototype.refresh = function () {                                                                         // 1630
    var offsetMethod = this.$element[0] == window ? 'offset' : 'position'                                             // 1631
                                                                                                                      // 1632
    this.offsets = $([])                                                                                              // 1633
    this.targets = $([])                                                                                              // 1634
                                                                                                                      // 1635
    var self     = this                                                                                               // 1636
    var $targets = this.$body                                                                                         // 1637
      .find(this.selector)                                                                                            // 1638
      .map(function () {                                                                                              // 1639
        var $el   = $(this)                                                                                           // 1640
        var href  = $el.data('target') || $el.attr('href')                                                            // 1641
        var $href = /^#\w/.test(href) && $(href)                                                                      // 1642
                                                                                                                      // 1643
        return ($href                                                                                                 // 1644
          && $href.length                                                                                             // 1645
          && [[ $href[offsetMethod]().top + (!$.isWindow(self.$scrollElement.get(0)) && self.$scrollElement.scrollTop()), href ]]) || null
      })                                                                                                              // 1647
      .sort(function (a, b) { return a[0] - b[0] })                                                                   // 1648
      .each(function () {                                                                                             // 1649
        self.offsets.push(this[0])                                                                                    // 1650
        self.targets.push(this[1])                                                                                    // 1651
      })                                                                                                              // 1652
  }                                                                                                                   // 1653
                                                                                                                      // 1654
  ScrollSpy.prototype.process = function () {                                                                         // 1655
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset                                          // 1656
    var scrollHeight = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight                              // 1657
    var maxScroll    = scrollHeight - this.$scrollElement.height()                                                    // 1658
    var offsets      = this.offsets                                                                                   // 1659
    var targets      = this.targets                                                                                   // 1660
    var activeTarget = this.activeTarget                                                                              // 1661
    var i                                                                                                             // 1662
                                                                                                                      // 1663
    if (scrollTop >= maxScroll) {                                                                                     // 1664
      return activeTarget != (i = targets.last()[0]) && this.activate(i)                                              // 1665
    }                                                                                                                 // 1666
                                                                                                                      // 1667
    for (i = offsets.length; i--;) {                                                                                  // 1668
      activeTarget != targets[i]                                                                                      // 1669
        && scrollTop >= offsets[i]                                                                                    // 1670
        && (!offsets[i + 1] || scrollTop <= offsets[i + 1])                                                           // 1671
        && this.activate( targets[i] )                                                                                // 1672
    }                                                                                                                 // 1673
  }                                                                                                                   // 1674
                                                                                                                      // 1675
  ScrollSpy.prototype.activate = function (target) {                                                                  // 1676
    this.activeTarget = target                                                                                        // 1677
                                                                                                                      // 1678
    $(this.selector)                                                                                                  // 1679
      .parents('.active')                                                                                             // 1680
      .removeClass('active')                                                                                          // 1681
                                                                                                                      // 1682
    var selector = this.selector                                                                                      // 1683
      + '[data-target="' + target + '"],'                                                                             // 1684
      + this.selector + '[href="' + target + '"]'                                                                     // 1685
                                                                                                                      // 1686
    var active = $(selector)                                                                                          // 1687
      .parents('li')                                                                                                  // 1688
      .addClass('active')                                                                                             // 1689
                                                                                                                      // 1690
    if (active.parent('.dropdown-menu').length)  {                                                                    // 1691
      active = active                                                                                                 // 1692
        .closest('li.dropdown')                                                                                       // 1693
        .addClass('active')                                                                                           // 1694
    }                                                                                                                 // 1695
                                                                                                                      // 1696
    active.trigger('activate')                                                                                        // 1697
  }                                                                                                                   // 1698
                                                                                                                      // 1699
                                                                                                                      // 1700
  // SCROLLSPY PLUGIN DEFINITION                                                                                      // 1701
  // ===========================                                                                                      // 1702
                                                                                                                      // 1703
  var old = $.fn.scrollspy                                                                                            // 1704
                                                                                                                      // 1705
  $.fn.scrollspy = function (option) {                                                                                // 1706
    return this.each(function () {                                                                                    // 1707
      var $this   = $(this)                                                                                           // 1708
      var data    = $this.data('bs.scrollspy')                                                                        // 1709
      var options = typeof option == 'object' && option                                                               // 1710
                                                                                                                      // 1711
      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))                                    // 1712
      if (typeof option == 'string') data[option]()                                                                   // 1713
    })                                                                                                                // 1714
  }                                                                                                                   // 1715
                                                                                                                      // 1716
  $.fn.scrollspy.Constructor = ScrollSpy                                                                              // 1717
                                                                                                                      // 1718
                                                                                                                      // 1719
  // SCROLLSPY NO CONFLICT                                                                                            // 1720
  // =====================                                                                                            // 1721
                                                                                                                      // 1722
  $.fn.scrollspy.noConflict = function () {                                                                           // 1723
    $.fn.scrollspy = old                                                                                              // 1724
    return this                                                                                                       // 1725
  }                                                                                                                   // 1726
                                                                                                                      // 1727
                                                                                                                      // 1728
  // SCROLLSPY DATA-API                                                                                               // 1729
  // ==================                                                                                               // 1730
                                                                                                                      // 1731
  $(window).on('load', function () {                                                                                  // 1732
    $('[data-spy="scroll"]').each(function () {                                                                       // 1733
      var $spy = $(this)                                                                                              // 1734
      $spy.scrollspy($spy.data())                                                                                     // 1735
    })                                                                                                                // 1736
  })                                                                                                                  // 1737
                                                                                                                      // 1738
}(jQuery);                                                                                                            // 1739
                                                                                                                      // 1740
/* ========================================================================                                           // 1741
 * Bootstrap: tab.js v3.0.2                                                                                           // 1742
 * http://getbootstrap.com/javascript/#tabs                                                                           // 1743
 * ========================================================================                                           // 1744
 * Copyright 2013 Twitter, Inc.                                                                                       // 1745
 *                                                                                                                    // 1746
 * Licensed under the Apache License, Version 2.0 (the "License");                                                    // 1747
 * you may not use this file except in compliance with the License.                                                   // 1748
 * You may obtain a copy of the License at                                                                            // 1749
 *                                                                                                                    // 1750
 * http://www.apache.org/licenses/LICENSE-2.0                                                                         // 1751
 *                                                                                                                    // 1752
 * Unless required by applicable law or agreed to in writing, software                                                // 1753
 * distributed under the License is distributed on an "AS IS" BASIS,                                                  // 1754
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.                                           // 1755
 * See the License for the specific language governing permissions and                                                // 1756
 * limitations under the License.                                                                                     // 1757
 * ======================================================================== */                                        // 1758
                                                                                                                      // 1759
                                                                                                                      // 1760
+function ($) { "use strict";                                                                                         // 1761
                                                                                                                      // 1762
  // TAB CLASS DEFINITION                                                                                             // 1763
  // ====================                                                                                             // 1764
                                                                                                                      // 1765
  var Tab = function (element) {                                                                                      // 1766
    this.element = $(element)                                                                                         // 1767
  }                                                                                                                   // 1768
                                                                                                                      // 1769
  Tab.prototype.show = function () {                                                                                  // 1770
    var $this    = this.element                                                                                       // 1771
    var $ul      = $this.closest('ul:not(.dropdown-menu)')                                                            // 1772
    var selector = $this.data('target')                                                                               // 1773
                                                                                                                      // 1774
    if (!selector) {                                                                                                  // 1775
      selector = $this.attr('href')                                                                                   // 1776
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7                                   // 1777
    }                                                                                                                 // 1778
                                                                                                                      // 1779
    if ($this.parent('li').hasClass('active')) return                                                                 // 1780
                                                                                                                      // 1781
    var previous = $ul.find('.active:last a')[0]                                                                      // 1782
    var e        = $.Event('show.bs.tab', {                                                                           // 1783
      relatedTarget: previous                                                                                         // 1784
    })                                                                                                                // 1785
                                                                                                                      // 1786
    $this.trigger(e)                                                                                                  // 1787
                                                                                                                      // 1788
    if (e.isDefaultPrevented()) return                                                                                // 1789
                                                                                                                      // 1790
    var $target = $(selector)                                                                                         // 1791
                                                                                                                      // 1792
    this.activate($this.parent('li'), $ul)                                                                            // 1793
    this.activate($target, $target.parent(), function () {                                                            // 1794
      $this.trigger({                                                                                                 // 1795
        type: 'shown.bs.tab'                                                                                          // 1796
      , relatedTarget: previous                                                                                       // 1797
      })                                                                                                              // 1798
    })                                                                                                                // 1799
  }                                                                                                                   // 1800
                                                                                                                      // 1801
  Tab.prototype.activate = function (element, container, callback) {                                                  // 1802
    var $active    = container.find('> .active')                                                                      // 1803
    var transition = callback                                                                                         // 1804
      && $.support.transition                                                                                         // 1805
      && $active.hasClass('fade')                                                                                     // 1806
                                                                                                                      // 1807
    function next() {                                                                                                 // 1808
      $active                                                                                                         // 1809
        .removeClass('active')                                                                                        // 1810
        .find('> .dropdown-menu > .active')                                                                           // 1811
        .removeClass('active')                                                                                        // 1812
                                                                                                                      // 1813
      element.addClass('active')                                                                                      // 1814
                                                                                                                      // 1815
      if (transition) {                                                                                               // 1816
        element[0].offsetWidth // reflow for transition                                                               // 1817
        element.addClass('in')                                                                                        // 1818
      } else {                                                                                                        // 1819
        element.removeClass('fade')                                                                                   // 1820
      }                                                                                                               // 1821
                                                                                                                      // 1822
      if (element.parent('.dropdown-menu')) {                                                                         // 1823
        element.closest('li.dropdown').addClass('active')                                                             // 1824
      }                                                                                                               // 1825
                                                                                                                      // 1826
      callback && callback()                                                                                          // 1827
    }                                                                                                                 // 1828
                                                                                                                      // 1829
    transition ?                                                                                                      // 1830
      $active                                                                                                         // 1831
        .one($.support.transition.end, next)                                                                          // 1832
        .emulateTransitionEnd(150) :                                                                                  // 1833
      next()                                                                                                          // 1834
                                                                                                                      // 1835
    $active.removeClass('in')                                                                                         // 1836
  }                                                                                                                   // 1837
                                                                                                                      // 1838
                                                                                                                      // 1839
  // TAB PLUGIN DEFINITION                                                                                            // 1840
  // =====================                                                                                            // 1841
                                                                                                                      // 1842
  var old = $.fn.tab                                                                                                  // 1843
                                                                                                                      // 1844
  $.fn.tab = function ( option ) {                                                                                    // 1845
    return this.each(function () {                                                                                    // 1846
      var $this = $(this)                                                                                             // 1847
      var data  = $this.data('bs.tab')                                                                                // 1848
                                                                                                                      // 1849
      if (!data) $this.data('bs.tab', (data = new Tab(this)))                                                         // 1850
      if (typeof option == 'string') data[option]()                                                                   // 1851
    })                                                                                                                // 1852
  }                                                                                                                   // 1853
                                                                                                                      // 1854
  $.fn.tab.Constructor = Tab                                                                                          // 1855
                                                                                                                      // 1856
                                                                                                                      // 1857
  // TAB NO CONFLICT                                                                                                  // 1858
  // ===============                                                                                                  // 1859
                                                                                                                      // 1860
  $.fn.tab.noConflict = function () {                                                                                 // 1861
    $.fn.tab = old                                                                                                    // 1862
    return this                                                                                                       // 1863
  }                                                                                                                   // 1864
                                                                                                                      // 1865
                                                                                                                      // 1866
  // TAB DATA-API                                                                                                     // 1867
  // ============                                                                                                     // 1868
                                                                                                                      // 1869
  $(document).on('click.bs.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {                 // 1870
    e.preventDefault()                                                                                                // 1871
    $(this).tab('show')                                                                                               // 1872
  })                                                                                                                  // 1873
                                                                                                                      // 1874
}(jQuery);                                                                                                            // 1875
                                                                                                                      // 1876
/* ========================================================================                                           // 1877
 * Bootstrap: affix.js v3.0.2                                                                                         // 1878
 * http://getbootstrap.com/javascript/#affix                                                                          // 1879
 * ========================================================================                                           // 1880
 * Copyright 2013 Twitter, Inc.                                                                                       // 1881
 *                                                                                                                    // 1882
 * Licensed under the Apache License, Version 2.0 (the "License");                                                    // 1883
 * you may not use this file except in compliance with the License.                                                   // 1884
 * You may obtain a copy of the License at                                                                            // 1885
 *                                                                                                                    // 1886
 * http://www.apache.org/licenses/LICENSE-2.0                                                                         // 1887
 *                                                                                                                    // 1888
 * Unless required by applicable law or agreed to in writing, software                                                // 1889
 * distributed under the License is distributed on an "AS IS" BASIS,                                                  // 1890
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.                                           // 1891
 * See the License for the specific language governing permissions and                                                // 1892
 * limitations under the License.                                                                                     // 1893
 * ======================================================================== */                                        // 1894
                                                                                                                      // 1895
                                                                                                                      // 1896
+function ($) { "use strict";                                                                                         // 1897
                                                                                                                      // 1898
  // AFFIX CLASS DEFINITION                                                                                           // 1899
  // ======================                                                                                           // 1900
                                                                                                                      // 1901
  var Affix = function (element, options) {                                                                           // 1902
    this.options = $.extend({}, Affix.DEFAULTS, options)                                                              // 1903
    this.$window = $(window)                                                                                          // 1904
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))                                              // 1905
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))                                 // 1906
                                                                                                                      // 1907
    this.$element = $(element)                                                                                        // 1908
    this.affixed  =                                                                                                   // 1909
    this.unpin    = null                                                                                              // 1910
                                                                                                                      // 1911
    this.checkPosition()                                                                                              // 1912
  }                                                                                                                   // 1913
                                                                                                                      // 1914
  Affix.RESET = 'affix affix-top affix-bottom'                                                                        // 1915
                                                                                                                      // 1916
  Affix.DEFAULTS = {                                                                                                  // 1917
    offset: 0                                                                                                         // 1918
  }                                                                                                                   // 1919
                                                                                                                      // 1920
  Affix.prototype.checkPositionWithEventLoop = function () {                                                          // 1921
    setTimeout($.proxy(this.checkPosition, this), 1)                                                                  // 1922
  }                                                                                                                   // 1923
                                                                                                                      // 1924
  Affix.prototype.checkPosition = function () {                                                                       // 1925
    if (!this.$element.is(':visible')) return                                                                         // 1926
                                                                                                                      // 1927
    var scrollHeight = $(document).height()                                                                           // 1928
    var scrollTop    = this.$window.scrollTop()                                                                       // 1929
    var position     = this.$element.offset()                                                                         // 1930
    var offset       = this.options.offset                                                                            // 1931
    var offsetTop    = offset.top                                                                                     // 1932
    var offsetBottom = offset.bottom                                                                                  // 1933
                                                                                                                      // 1934
    if (typeof offset != 'object')         offsetBottom = offsetTop = offset                                          // 1935
    if (typeof offsetTop == 'function')    offsetTop    = offset.top()                                                // 1936
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom()                                             // 1937
                                                                                                                      // 1938
    var affix = this.unpin   != null && (scrollTop + this.unpin <= position.top) ? false :                            // 1939
                offsetBottom != null && (position.top + this.$element.height() >= scrollHeight - offsetBottom) ? 'bottom' :
                offsetTop    != null && (scrollTop <= offsetTop) ? 'top' : false                                      // 1941
                                                                                                                      // 1942
    if (this.affixed === affix) return                                                                                // 1943
    if (this.unpin) this.$element.css('top', '')                                                                      // 1944
                                                                                                                      // 1945
    this.affixed = affix                                                                                              // 1946
    this.unpin   = affix == 'bottom' ? position.top - scrollTop : null                                                // 1947
                                                                                                                      // 1948
    this.$element.removeClass(Affix.RESET).addClass('affix' + (affix ? '-' + affix : ''))                             // 1949
                                                                                                                      // 1950
    if (affix == 'bottom') {                                                                                          // 1951
      this.$element.offset({ top: document.body.offsetHeight - offsetBottom - this.$element.height() })               // 1952
    }                                                                                                                 // 1953
  }                                                                                                                   // 1954
                                                                                                                      // 1955
                                                                                                                      // 1956
  // AFFIX PLUGIN DEFINITION                                                                                          // 1957
  // =======================                                                                                          // 1958
                                                                                                                      // 1959
  var old = $.fn.affix                                                                                                // 1960
                                                                                                                      // 1961
  $.fn.affix = function (option) {                                                                                    // 1962
    return this.each(function () {                                                                                    // 1963
      var $this   = $(this)                                                                                           // 1964
      var data    = $this.data('bs.affix')                                                                            // 1965
      var options = typeof option == 'object' && option                                                               // 1966
                                                                                                                      // 1967
      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))                                            // 1968
      if (typeof option == 'string') data[option]()                                                                   // 1969
    })                                                                                                                // 1970
  }                                                                                                                   // 1971
                                                                                                                      // 1972
  $.fn.affix.Constructor = Affix                                                                                      // 1973
                                                                                                                      // 1974
                                                                                                                      // 1975
  // AFFIX NO CONFLICT                                                                                                // 1976
  // =================                                                                                                // 1977
                                                                                                                      // 1978
  $.fn.affix.noConflict = function () {                                                                               // 1979
    $.fn.affix = old                                                                                                  // 1980
    return this                                                                                                       // 1981
  }                                                                                                                   // 1982
                                                                                                                      // 1983
                                                                                                                      // 1984
  // AFFIX DATA-API                                                                                                   // 1985
  // ==============                                                                                                   // 1986
                                                                                                                      // 1987
  $(window).on('load', function () {                                                                                  // 1988
    $('[data-spy="affix"]').each(function () {                                                                        // 1989
      var $spy = $(this)                                                                                              // 1990
      var data = $spy.data()                                                                                          // 1991
                                                                                                                      // 1992
      data.offset = data.offset || {}                                                                                 // 1993
                                                                                                                      // 1994
      if (data.offsetBottom) data.offset.bottom = data.offsetBottom                                                   // 1995
      if (data.offsetTop)    data.offset.top    = data.offsetTop                                                      // 1996
                                                                                                                      // 1997
      $spy.affix(data)                                                                                                // 1998
    })                                                                                                                // 1999
  })                                                                                                                  // 2000
                                                                                                                      // 2001
}(jQuery);                                                                                                            // 2002
                                                                                                                      // 2003
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['bootstrap-3'] = {};

})();

//# sourceMappingURL=8e9b6ee26c016e608b5448bf96f4029cf33853f2.map
