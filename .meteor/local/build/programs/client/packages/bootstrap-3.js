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
/**                                                                                                                   // 1
* bootstrap.js v3.0.0 by @fat and @mdo                                                                                // 2
* Copyright 2013 Twitter Inc.                                                                                         // 3
* http://www.apache.org/licenses/LICENSE-2.0                                                                          // 4
*/                                                                                                                    // 5
if (!jQuery) { throw new Error("Bootstrap requires jQuery") }                                                         // 6
                                                                                                                      // 7
/* ========================================================================                                           // 8
 * Bootstrap: transition.js v3.0.0                                                                                    // 9
 * http://twbs.github.com/bootstrap/javascript.html#transitions                                                       // 10
 * ========================================================================                                           // 11
 * Copyright 2013 Twitter, Inc.                                                                                       // 12
 *                                                                                                                    // 13
 * Licensed under the Apache License, Version 2.0 (the "License");                                                    // 14
 * you may not use this file except in compliance with the License.                                                   // 15
 * You may obtain a copy of the License at                                                                            // 16
 *                                                                                                                    // 17
 * http://www.apache.org/licenses/LICENSE-2.0                                                                         // 18
 *                                                                                                                    // 19
 * Unless required by applicable law or agreed to in writing, software                                                // 20
 * distributed under the License is distributed on an "AS IS" BASIS,                                                  // 21
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.                                           // 22
 * See the License for the specific language governing permissions and                                                // 23
 * limitations under the License.                                                                                     // 24
 * ======================================================================== */                                        // 25
                                                                                                                      // 26
                                                                                                                      // 27
+function ($) { "use strict";                                                                                         // 28
                                                                                                                      // 29
  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)                                                     // 30
  // ============================================================                                                     // 31
                                                                                                                      // 32
  function transitionEnd() {                                                                                          // 33
    var el = document.createElement('bootstrap')                                                                      // 34
                                                                                                                      // 35
    var transEndEventNames = {                                                                                        // 36
      'WebkitTransition' : 'webkitTransitionEnd'                                                                      // 37
    , 'MozTransition'    : 'transitionend'                                                                            // 38
    , 'OTransition'      : 'oTransitionEnd otransitionend'                                                            // 39
    , 'transition'       : 'transitionend'                                                                            // 40
    }                                                                                                                 // 41
                                                                                                                      // 42
    for (var name in transEndEventNames) {                                                                            // 43
      if (el.style[name] !== undefined) {                                                                             // 44
        return { end: transEndEventNames[name] }                                                                      // 45
      }                                                                                                               // 46
    }                                                                                                                 // 47
  }                                                                                                                   // 48
                                                                                                                      // 49
  // http://blog.alexmaccaw.com/css-transitions                                                                       // 50
  $.fn.emulateTransitionEnd = function (duration) {                                                                   // 51
    var called = false, $el = this                                                                                    // 52
    $(this).one($.support.transition.end, function () { called = true })                                              // 53
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }                              // 54
    setTimeout(callback, duration)                                                                                    // 55
    return this                                                                                                       // 56
  }                                                                                                                   // 57
                                                                                                                      // 58
  $(function () {                                                                                                     // 59
    $.support.transition = transitionEnd()                                                                            // 60
  })                                                                                                                  // 61
                                                                                                                      // 62
}(window.jQuery);                                                                                                     // 63
                                                                                                                      // 64
/* ========================================================================                                           // 65
 * Bootstrap: alert.js v3.0.0                                                                                         // 66
 * http://twbs.github.com/bootstrap/javascript.html#alerts                                                            // 67
 * ========================================================================                                           // 68
 * Copyright 2013 Twitter, Inc.                                                                                       // 69
 *                                                                                                                    // 70
 * Licensed under the Apache License, Version 2.0 (the "License");                                                    // 71
 * you may not use this file except in compliance with the License.                                                   // 72
 * You may obtain a copy of the License at                                                                            // 73
 *                                                                                                                    // 74
 * http://www.apache.org/licenses/LICENSE-2.0                                                                         // 75
 *                                                                                                                    // 76
 * Unless required by applicable law or agreed to in writing, software                                                // 77
 * distributed under the License is distributed on an "AS IS" BASIS,                                                  // 78
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.                                           // 79
 * See the License for the specific language governing permissions and                                                // 80
 * limitations under the License.                                                                                     // 81
 * ======================================================================== */                                        // 82
                                                                                                                      // 83
                                                                                                                      // 84
+function ($) { "use strict";                                                                                         // 85
                                                                                                                      // 86
  // ALERT CLASS DEFINITION                                                                                           // 87
  // ======================                                                                                           // 88
                                                                                                                      // 89
  var dismiss = '[data-dismiss="alert"]'                                                                              // 90
  var Alert   = function (el) {                                                                                       // 91
    $(el).on('click', dismiss, this.close)                                                                            // 92
  }                                                                                                                   // 93
                                                                                                                      // 94
  Alert.prototype.close = function (e) {                                                                              // 95
    var $this    = $(this)                                                                                            // 96
    var selector = $this.attr('data-target')                                                                          // 97
                                                                                                                      // 98
    if (!selector) {                                                                                                  // 99
      selector = $this.attr('href')                                                                                   // 100
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7                                  // 101
    }                                                                                                                 // 102
                                                                                                                      // 103
    var $parent = $(selector)                                                                                         // 104
                                                                                                                      // 105
    if (e) e.preventDefault()                                                                                         // 106
                                                                                                                      // 107
    if (!$parent.length) {                                                                                            // 108
      $parent = $this.hasClass('alert') ? $this : $this.parent()                                                      // 109
    }                                                                                                                 // 110
                                                                                                                      // 111
    $parent.trigger(e = $.Event('close.bs.alert'))                                                                    // 112
                                                                                                                      // 113
    if (e.isDefaultPrevented()) return                                                                                // 114
                                                                                                                      // 115
    $parent.removeClass('in')                                                                                         // 116
                                                                                                                      // 117
    function removeElement() {                                                                                        // 118
      $parent.trigger('closed.bs.alert').remove()                                                                     // 119
    }                                                                                                                 // 120
                                                                                                                      // 121
    $.support.transition && $parent.hasClass('fade') ?                                                                // 122
      $parent                                                                                                         // 123
        .one($.support.transition.end, removeElement)                                                                 // 124
        .emulateTransitionEnd(150) :                                                                                  // 125
      removeElement()                                                                                                 // 126
  }                                                                                                                   // 127
                                                                                                                      // 128
                                                                                                                      // 129
  // ALERT PLUGIN DEFINITION                                                                                          // 130
  // =======================                                                                                          // 131
                                                                                                                      // 132
  var old = $.fn.alert                                                                                                // 133
                                                                                                                      // 134
  $.fn.alert = function (option) {                                                                                    // 135
    return this.each(function () {                                                                                    // 136
      var $this = $(this)                                                                                             // 137
      var data  = $this.data('bs.alert')                                                                              // 138
                                                                                                                      // 139
      if (!data) $this.data('bs.alert', (data = new Alert(this)))                                                     // 140
      if (typeof option == 'string') data[option].call($this)                                                         // 141
    })                                                                                                                // 142
  }                                                                                                                   // 143
                                                                                                                      // 144
  $.fn.alert.Constructor = Alert                                                                                      // 145
                                                                                                                      // 146
                                                                                                                      // 147
  // ALERT NO CONFLICT                                                                                                // 148
  // =================                                                                                                // 149
                                                                                                                      // 150
  $.fn.alert.noConflict = function () {                                                                               // 151
    $.fn.alert = old                                                                                                  // 152
    return this                                                                                                       // 153
  }                                                                                                                   // 154
                                                                                                                      // 155
                                                                                                                      // 156
  // ALERT DATA-API                                                                                                   // 157
  // ==============                                                                                                   // 158
                                                                                                                      // 159
  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)                                           // 160
                                                                                                                      // 161
}(window.jQuery);                                                                                                     // 162
                                                                                                                      // 163
/* ========================================================================                                           // 164
 * Bootstrap: button.js v3.0.0                                                                                        // 165
 * http://twbs.github.com/bootstrap/javascript.html#buttons                                                           // 166
 * ========================================================================                                           // 167
 * Copyright 2013 Twitter, Inc.                                                                                       // 168
 *                                                                                                                    // 169
 * Licensed under the Apache License, Version 2.0 (the "License");                                                    // 170
 * you may not use this file except in compliance with the License.                                                   // 171
 * You may obtain a copy of the License at                                                                            // 172
 *                                                                                                                    // 173
 * http://www.apache.org/licenses/LICENSE-2.0                                                                         // 174
 *                                                                                                                    // 175
 * Unless required by applicable law or agreed to in writing, software                                                // 176
 * distributed under the License is distributed on an "AS IS" BASIS,                                                  // 177
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.                                           // 178
 * See the License for the specific language governing permissions and                                                // 179
 * limitations under the License.                                                                                     // 180
 * ======================================================================== */                                        // 181
                                                                                                                      // 182
                                                                                                                      // 183
+function ($) { "use strict";                                                                                         // 184
                                                                                                                      // 185
  // BUTTON PUBLIC CLASS DEFINITION                                                                                   // 186
  // ==============================                                                                                   // 187
                                                                                                                      // 188
  var Button = function (element, options) {                                                                          // 189
    this.$element = $(element)                                                                                        // 190
    this.options  = $.extend({}, Button.DEFAULTS, options)                                                            // 191
  }                                                                                                                   // 192
                                                                                                                      // 193
  Button.DEFAULTS = {                                                                                                 // 194
    loadingText: 'loading...'                                                                                         // 195
  }                                                                                                                   // 196
                                                                                                                      // 197
  Button.prototype.setState = function (state) {                                                                      // 198
    var d    = 'disabled'                                                                                             // 199
    var $el  = this.$element                                                                                          // 200
    var val  = $el.is('input') ? 'val' : 'html'                                                                       // 201
    var data = $el.data()                                                                                             // 202
                                                                                                                      // 203
    state = state + 'Text'                                                                                            // 204
                                                                                                                      // 205
    if (!data.resetText) $el.data('resetText', $el[val]())                                                            // 206
                                                                                                                      // 207
    $el[val](data[state] || this.options[state])                                                                      // 208
                                                                                                                      // 209
    // push to event loop to allow forms to submit                                                                    // 210
    setTimeout(function () {                                                                                          // 211
      state == 'loadingText' ?                                                                                        // 212
        $el.addClass(d).attr(d, d) :                                                                                  // 213
        $el.removeClass(d).removeAttr(d);                                                                             // 214
    }, 0)                                                                                                             // 215
  }                                                                                                                   // 216
                                                                                                                      // 217
  Button.prototype.toggle = function () {                                                                             // 218
    var $parent = this.$element.closest('[data-toggle="buttons"]')                                                    // 219
                                                                                                                      // 220
    if ($parent.length) {                                                                                             // 221
      var $input = this.$element.find('input')                                                                        // 222
        .prop('checked', !this.$element.hasClass('active'))                                                           // 223
        .trigger('change')                                                                                            // 224
      if ($input.prop('type') === 'radio') $parent.find('.active').removeClass('active')                              // 225
    }                                                                                                                 // 226
                                                                                                                      // 227
    this.$element.toggleClass('active')                                                                               // 228
  }                                                                                                                   // 229
                                                                                                                      // 230
                                                                                                                      // 231
  // BUTTON PLUGIN DEFINITION                                                                                         // 232
  // ========================                                                                                         // 233
                                                                                                                      // 234
  var old = $.fn.button                                                                                               // 235
                                                                                                                      // 236
  $.fn.button = function (option) {                                                                                   // 237
    return this.each(function () {                                                                                    // 238
      var $this   = $(this)                                                                                           // 239
      var data    = $this.data('bs.button')                                                                           // 240
      var options = typeof option == 'object' && option                                                               // 241
                                                                                                                      // 242
      if (!data) $this.data('bs.button', (data = new Button(this, options)))                                          // 243
                                                                                                                      // 244
      if (option == 'toggle') data.toggle()                                                                           // 245
      else if (option) data.setState(option)                                                                          // 246
    })                                                                                                                // 247
  }                                                                                                                   // 248
                                                                                                                      // 249
  $.fn.button.Constructor = Button                                                                                    // 250
                                                                                                                      // 251
                                                                                                                      // 252
  // BUTTON NO CONFLICT                                                                                               // 253
  // ==================                                                                                               // 254
                                                                                                                      // 255
  $.fn.button.noConflict = function () {                                                                              // 256
    $.fn.button = old                                                                                                 // 257
    return this                                                                                                       // 258
  }                                                                                                                   // 259
                                                                                                                      // 260
                                                                                                                      // 261
  // BUTTON DATA-API                                                                                                  // 262
  // ===============                                                                                                  // 263
                                                                                                                      // 264
  $(document).on('click.bs.button.data-api', '[data-toggle^=button]', function (e) {                                  // 265
    var $btn = $(e.target)                                                                                            // 266
    if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')                                                            // 267
    $btn.button('toggle')                                                                                             // 268
    e.preventDefault()                                                                                                // 269
  })                                                                                                                  // 270
                                                                                                                      // 271
}(window.jQuery);                                                                                                     // 272
                                                                                                                      // 273
/* ========================================================================                                           // 274
 * Bootstrap: carousel.js v3.0.0                                                                                      // 275
 * http://twbs.github.com/bootstrap/javascript.html#carousel                                                          // 276
 * ========================================================================                                           // 277
 * Copyright 2012 Twitter, Inc.                                                                                       // 278
 *                                                                                                                    // 279
 * Licensed under the Apache License, Version 2.0 (the "License");                                                    // 280
 * you may not use this file except in compliance with the License.                                                   // 281
 * You may obtain a copy of the License at                                                                            // 282
 *                                                                                                                    // 283
 * http://www.apache.org/licenses/LICENSE-2.0                                                                         // 284
 *                                                                                                                    // 285
 * Unless required by applicable law or agreed to in writing, software                                                // 286
 * distributed under the License is distributed on an "AS IS" BASIS,                                                  // 287
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.                                           // 288
 * See the License for the specific language governing permissions and                                                // 289
 * limitations under the License.                                                                                     // 290
 * ======================================================================== */                                        // 291
                                                                                                                      // 292
                                                                                                                      // 293
+function ($) { "use strict";                                                                                         // 294
                                                                                                                      // 295
  // CAROUSEL CLASS DEFINITION                                                                                        // 296
  // =========================                                                                                        // 297
                                                                                                                      // 298
  var Carousel = function (element, options) {                                                                        // 299
    this.$element    = $(element)                                                                                     // 300
    this.$indicators = this.$element.find('.carousel-indicators')                                                     // 301
    this.options     = options                                                                                        // 302
    this.paused      =                                                                                                // 303
    this.sliding     =                                                                                                // 304
    this.interval    =                                                                                                // 305
    this.$active     =                                                                                                // 306
    this.$items      = null                                                                                           // 307
                                                                                                                      // 308
    this.options.pause == 'hover' && this.$element                                                                    // 309
      .on('mouseenter', $.proxy(this.pause, this))                                                                    // 310
      .on('mouseleave', $.proxy(this.cycle, this))                                                                    // 311
  }                                                                                                                   // 312
                                                                                                                      // 313
  Carousel.DEFAULTS = {                                                                                               // 314
    interval: 5000                                                                                                    // 315
  , pause: 'hover'                                                                                                    // 316
  , wrap: true                                                                                                        // 317
  }                                                                                                                   // 318
                                                                                                                      // 319
  Carousel.prototype.cycle =  function (e) {                                                                          // 320
    e || (this.paused = false)                                                                                        // 321
                                                                                                                      // 322
    this.interval && clearInterval(this.interval)                                                                     // 323
                                                                                                                      // 324
    this.options.interval                                                                                             // 325
      && !this.paused                                                                                                 // 326
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))                               // 327
                                                                                                                      // 328
    return this                                                                                                       // 329
  }                                                                                                                   // 330
                                                                                                                      // 331
  Carousel.prototype.getActiveIndex = function () {                                                                   // 332
    this.$active = this.$element.find('.item.active')                                                                 // 333
    this.$items  = this.$active.parent().children()                                                                   // 334
                                                                                                                      // 335
    return this.$items.index(this.$active)                                                                            // 336
  }                                                                                                                   // 337
                                                                                                                      // 338
  Carousel.prototype.to = function (pos) {                                                                            // 339
    var that        = this                                                                                            // 340
    var activeIndex = this.getActiveIndex()                                                                           // 341
                                                                                                                      // 342
    if (pos > (this.$items.length - 1) || pos < 0) return                                                             // 343
                                                                                                                      // 344
    if (this.sliding)       return this.$element.one('slid', function () { that.to(pos) })                            // 345
    if (activeIndex == pos) return this.pause().cycle()                                                               // 346
                                                                                                                      // 347
    return this.slide(pos > activeIndex ? 'next' : 'prev', $(this.$items[pos]))                                       // 348
  }                                                                                                                   // 349
                                                                                                                      // 350
  Carousel.prototype.pause = function (e) {                                                                           // 351
    e || (this.paused = true)                                                                                         // 352
                                                                                                                      // 353
    if (this.$element.find('.next, .prev').length && $.support.transition.end) {                                      // 354
      this.$element.trigger($.support.transition.end)                                                                 // 355
      this.cycle(true)                                                                                                // 356
    }                                                                                                                 // 357
                                                                                                                      // 358
    this.interval = clearInterval(this.interval)                                                                      // 359
                                                                                                                      // 360
    return this                                                                                                       // 361
  }                                                                                                                   // 362
                                                                                                                      // 363
  Carousel.prototype.next = function () {                                                                             // 364
    if (this.sliding) return                                                                                          // 365
    return this.slide('next')                                                                                         // 366
  }                                                                                                                   // 367
                                                                                                                      // 368
  Carousel.prototype.prev = function () {                                                                             // 369
    if (this.sliding) return                                                                                          // 370
    return this.slide('prev')                                                                                         // 371
  }                                                                                                                   // 372
                                                                                                                      // 373
  Carousel.prototype.slide = function (type, next) {                                                                  // 374
    var $active   = this.$element.find('.item.active')                                                                // 375
    var $next     = next || $active[type]()                                                                           // 376
    var isCycling = this.interval                                                                                     // 377
    var direction = type == 'next' ? 'left' : 'right'                                                                 // 378
    var fallback  = type == 'next' ? 'first' : 'last'                                                                 // 379
    var that      = this                                                                                              // 380
                                                                                                                      // 381
    if (!$next.length) {                                                                                              // 382
      if (!this.options.wrap) return                                                                                  // 383
      $next = this.$element.find('.item')[fallback]()                                                                 // 384
    }                                                                                                                 // 385
                                                                                                                      // 386
    this.sliding = true                                                                                               // 387
                                                                                                                      // 388
    isCycling && this.pause()                                                                                         // 389
                                                                                                                      // 390
    var e = $.Event('slide.bs.carousel', { relatedTarget: $next[0], direction: direction })                           // 391
                                                                                                                      // 392
    if ($next.hasClass('active')) return                                                                              // 393
                                                                                                                      // 394
    if (this.$indicators.length) {                                                                                    // 395
      this.$indicators.find('.active').removeClass('active')                                                          // 396
      this.$element.one('slid', function () {                                                                         // 397
        var $nextIndicator = $(that.$indicators.children()[that.getActiveIndex()])                                    // 398
        $nextIndicator && $nextIndicator.addClass('active')                                                           // 399
      })                                                                                                              // 400
    }                                                                                                                 // 401
                                                                                                                      // 402
    if ($.support.transition && this.$element.hasClass('slide')) {                                                    // 403
      this.$element.trigger(e)                                                                                        // 404
      if (e.isDefaultPrevented()) return                                                                              // 405
      $next.addClass(type)                                                                                            // 406
      $next[0].offsetWidth // force reflow                                                                            // 407
      $active.addClass(direction)                                                                                     // 408
      $next.addClass(direction)                                                                                       // 409
      $active                                                                                                         // 410
        .one($.support.transition.end, function () {                                                                  // 411
          $next.removeClass([type, direction].join(' ')).addClass('active')                                           // 412
          $active.removeClass(['active', direction].join(' '))                                                        // 413
          that.sliding = false                                                                                        // 414
          setTimeout(function () { that.$element.trigger('slid') }, 0)                                                // 415
        })                                                                                                            // 416
        .emulateTransitionEnd(600)                                                                                    // 417
    } else {                                                                                                          // 418
      this.$element.trigger(e)                                                                                        // 419
      if (e.isDefaultPrevented()) return                                                                              // 420
      $active.removeClass('active')                                                                                   // 421
      $next.addClass('active')                                                                                        // 422
      this.sliding = false                                                                                            // 423
      this.$element.trigger('slid')                                                                                   // 424
    }                                                                                                                 // 425
                                                                                                                      // 426
    isCycling && this.cycle()                                                                                         // 427
                                                                                                                      // 428
    return this                                                                                                       // 429
  }                                                                                                                   // 430
                                                                                                                      // 431
                                                                                                                      // 432
  // CAROUSEL PLUGIN DEFINITION                                                                                       // 433
  // ==========================                                                                                       // 434
                                                                                                                      // 435
  var old = $.fn.carousel                                                                                             // 436
                                                                                                                      // 437
  $.fn.carousel = function (option) {                                                                                 // 438
    return this.each(function () {                                                                                    // 439
      var $this   = $(this)                                                                                           // 440
      var data    = $this.data('bs.carousel')                                                                         // 441
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)                // 442
      var action  = typeof option == 'string' ? option : options.slide                                                // 443
                                                                                                                      // 444
      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))                                      // 445
      if (typeof option == 'number') data.to(option)                                                                  // 446
      else if (action) data[action]()                                                                                 // 447
      else if (options.interval) data.pause().cycle()                                                                 // 448
    })                                                                                                                // 449
  }                                                                                                                   // 450
                                                                                                                      // 451
  $.fn.carousel.Constructor = Carousel                                                                                // 452
                                                                                                                      // 453
                                                                                                                      // 454
  // CAROUSEL NO CONFLICT                                                                                             // 455
  // ====================                                                                                             // 456
                                                                                                                      // 457
  $.fn.carousel.noConflict = function () {                                                                            // 458
    $.fn.carousel = old                                                                                               // 459
    return this                                                                                                       // 460
  }                                                                                                                   // 461
                                                                                                                      // 462
                                                                                                                      // 463
  // CAROUSEL DATA-API                                                                                                // 464
  // =================                                                                                                // 465
                                                                                                                      // 466
  $(document).on('click.bs.carousel.data-api', '[data-slide], [data-slide-to]', function (e) {                        // 467
    var $this   = $(this), href                                                                                       // 468
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
    var options = $.extend({}, $target.data(), $this.data())                                                          // 470
    var slideIndex = $this.attr('data-slide-to')                                                                      // 471
    if (slideIndex) options.interval = false                                                                          // 472
                                                                                                                      // 473
    $target.carousel(options)                                                                                         // 474
                                                                                                                      // 475
    if (slideIndex = $this.attr('data-slide-to')) {                                                                   // 476
      $target.data('bs.carousel').to(slideIndex)                                                                      // 477
    }                                                                                                                 // 478
                                                                                                                      // 479
    e.preventDefault()                                                                                                // 480
  })                                                                                                                  // 481
                                                                                                                      // 482
  $(window).on('load', function () {                                                                                  // 483
    $('[data-ride="carousel"]').each(function () {                                                                    // 484
      var $carousel = $(this)                                                                                         // 485
      $carousel.carousel($carousel.data())                                                                            // 486
    })                                                                                                                // 487
  })                                                                                                                  // 488
                                                                                                                      // 489
}(window.jQuery);                                                                                                     // 490
                                                                                                                      // 491
/* ========================================================================                                           // 492
 * Bootstrap: collapse.js v3.0.0                                                                                      // 493
 * http://twbs.github.com/bootstrap/javascript.html#collapse                                                          // 494
 * ========================================================================                                           // 495
 * Copyright 2012 Twitter, Inc.                                                                                       // 496
 *                                                                                                                    // 497
 * Licensed under the Apache License, Version 2.0 (the "License");                                                    // 498
 * you may not use this file except in compliance with the License.                                                   // 499
 * You may obtain a copy of the License at                                                                            // 500
 *                                                                                                                    // 501
 * http://www.apache.org/licenses/LICENSE-2.0                                                                         // 502
 *                                                                                                                    // 503
 * Unless required by applicable law or agreed to in writing, software                                                // 504
 * distributed under the License is distributed on an "AS IS" BASIS,                                                  // 505
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.                                           // 506
 * See the License for the specific language governing permissions and                                                // 507
 * limitations under the License.                                                                                     // 508
 * ======================================================================== */                                        // 509
                                                                                                                      // 510
                                                                                                                      // 511
+function ($) { "use strict";                                                                                         // 512
                                                                                                                      // 513
  // COLLAPSE PUBLIC CLASS DEFINITION                                                                                 // 514
  // ================================                                                                                 // 515
                                                                                                                      // 516
  var Collapse = function (element, options) {                                                                        // 517
    this.$element      = $(element)                                                                                   // 518
    this.options       = $.extend({}, Collapse.DEFAULTS, options)                                                     // 519
    this.transitioning = null                                                                                         // 520
                                                                                                                      // 521
    if (this.options.parent) this.$parent = $(this.options.parent)                                                    // 522
    if (this.options.toggle) this.toggle()                                                                            // 523
  }                                                                                                                   // 524
                                                                                                                      // 525
  Collapse.DEFAULTS = {                                                                                               // 526
    toggle: true                                                                                                      // 527
  }                                                                                                                   // 528
                                                                                                                      // 529
  Collapse.prototype.dimension = function () {                                                                        // 530
    var hasWidth = this.$element.hasClass('width')                                                                    // 531
    return hasWidth ? 'width' : 'height'                                                                              // 532
  }                                                                                                                   // 533
                                                                                                                      // 534
  Collapse.prototype.show = function () {                                                                             // 535
    if (this.transitioning || this.$element.hasClass('in')) return                                                    // 536
                                                                                                                      // 537
    var startEvent = $.Event('show.bs.collapse')                                                                      // 538
    this.$element.trigger(startEvent)                                                                                 // 539
    if (startEvent.isDefaultPrevented()) return                                                                       // 540
                                                                                                                      // 541
    var actives = this.$parent && this.$parent.find('> .panel > .in')                                                 // 542
                                                                                                                      // 543
    if (actives && actives.length) {                                                                                  // 544
      var hasData = actives.data('bs.collapse')                                                                       // 545
      if (hasData && hasData.transitioning) return                                                                    // 546
      actives.collapse('hide')                                                                                        // 547
      hasData || actives.data('bs.collapse', null)                                                                    // 548
    }                                                                                                                 // 549
                                                                                                                      // 550
    var dimension = this.dimension()                                                                                  // 551
                                                                                                                      // 552
    this.$element                                                                                                     // 553
      .removeClass('collapse')                                                                                        // 554
      .addClass('collapsing')                                                                                         // 555
      [dimension](0)                                                                                                  // 556
                                                                                                                      // 557
    this.transitioning = 1                                                                                            // 558
                                                                                                                      // 559
    var complete = function () {                                                                                      // 560
      this.$element                                                                                                   // 561
        .removeClass('collapsing')                                                                                    // 562
        .addClass('in')                                                                                               // 563
        [dimension]('auto')                                                                                           // 564
      this.transitioning = 0                                                                                          // 565
      this.$element.trigger('shown.bs.collapse')                                                                      // 566
    }                                                                                                                 // 567
                                                                                                                      // 568
    if (!$.support.transition) return complete.call(this)                                                             // 569
                                                                                                                      // 570
    var scrollSize = $.camelCase(['scroll', dimension].join('-'))                                                     // 571
                                                                                                                      // 572
    this.$element                                                                                                     // 573
      .one($.support.transition.end, $.proxy(complete, this))                                                         // 574
      .emulateTransitionEnd(350)                                                                                      // 575
      [dimension](this.$element[0][scrollSize])                                                                       // 576
  }                                                                                                                   // 577
                                                                                                                      // 578
  Collapse.prototype.hide = function () {                                                                             // 579
    if (this.transitioning || !this.$element.hasClass('in')) return                                                   // 580
                                                                                                                      // 581
    var startEvent = $.Event('hide.bs.collapse')                                                                      // 582
    this.$element.trigger(startEvent)                                                                                 // 583
    if (startEvent.isDefaultPrevented()) return                                                                       // 584
                                                                                                                      // 585
    var dimension = this.dimension()                                                                                  // 586
                                                                                                                      // 587
    this.$element                                                                                                     // 588
      [dimension](this.$element[dimension]())                                                                         // 589
      [0].offsetHeight                                                                                                // 590
                                                                                                                      // 591
    this.$element                                                                                                     // 592
      .addClass('collapsing')                                                                                         // 593
      .removeClass('collapse')                                                                                        // 594
      .removeClass('in')                                                                                              // 595
                                                                                                                      // 596
    this.transitioning = 1                                                                                            // 597
                                                                                                                      // 598
    var complete = function () {                                                                                      // 599
      this.transitioning = 0                                                                                          // 600
      this.$element                                                                                                   // 601
        .trigger('hidden.bs.collapse')                                                                                // 602
        .removeClass('collapsing')                                                                                    // 603
        .addClass('collapse')                                                                                         // 604
    }                                                                                                                 // 605
                                                                                                                      // 606
    if (!$.support.transition) return complete.call(this)                                                             // 607
                                                                                                                      // 608
    this.$element                                                                                                     // 609
      [dimension](0)                                                                                                  // 610
      .one($.support.transition.end, $.proxy(complete, this))                                                         // 611
      .emulateTransitionEnd(350)                                                                                      // 612
  }                                                                                                                   // 613
                                                                                                                      // 614
  Collapse.prototype.toggle = function () {                                                                           // 615
    this[this.$element.hasClass('in') ? 'hide' : 'show']()                                                            // 616
  }                                                                                                                   // 617
                                                                                                                      // 618
                                                                                                                      // 619
  // COLLAPSE PLUGIN DEFINITION                                                                                       // 620
  // ==========================                                                                                       // 621
                                                                                                                      // 622
  var old = $.fn.collapse                                                                                             // 623
                                                                                                                      // 624
  $.fn.collapse = function (option) {                                                                                 // 625
    return this.each(function () {                                                                                    // 626
      var $this   = $(this)                                                                                           // 627
      var data    = $this.data('bs.collapse')                                                                         // 628
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)                // 629
                                                                                                                      // 630
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))                                      // 631
      if (typeof option == 'string') data[option]()                                                                   // 632
    })                                                                                                                // 633
  }                                                                                                                   // 634
                                                                                                                      // 635
  $.fn.collapse.Constructor = Collapse                                                                                // 636
                                                                                                                      // 637
                                                                                                                      // 638
  // COLLAPSE NO CONFLICT                                                                                             // 639
  // ====================                                                                                             // 640
                                                                                                                      // 641
  $.fn.collapse.noConflict = function () {                                                                            // 642
    $.fn.collapse = old                                                                                               // 643
    return this                                                                                                       // 644
  }                                                                                                                   // 645
                                                                                                                      // 646
                                                                                                                      // 647
  // COLLAPSE DATA-API                                                                                                // 648
  // =================                                                                                                // 649
                                                                                                                      // 650
  $(document).on('click.bs.collapse.data-api', '[data-toggle=collapse]', function (e) {                               // 651
    var $this   = $(this), href                                                                                       // 652
    var target  = $this.attr('data-target')                                                                           // 653
        || e.preventDefault()                                                                                         // 654
        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7                          // 655
    var $target = $(target)                                                                                           // 656
    var data    = $target.data('bs.collapse')                                                                         // 657
    var option  = data ? 'toggle' : $this.data()                                                                      // 658
    var parent  = $this.attr('data-parent')                                                                           // 659
    var $parent = parent && $(parent)                                                                                 // 660
                                                                                                                      // 661
    if (!data || !data.transitioning) {                                                                               // 662
      if ($parent) $parent.find('[data-toggle=collapse][data-parent="' + parent + '"]').not($this).addClass('collapsed')
      $this[$target.hasClass('in') ? 'addClass' : 'removeClass']('collapsed')                                         // 664
    }                                                                                                                 // 665
                                                                                                                      // 666
    $target.collapse(option)                                                                                          // 667
  })                                                                                                                  // 668
                                                                                                                      // 669
}(window.jQuery);                                                                                                     // 670
                                                                                                                      // 671
/* ========================================================================                                           // 672
 * Bootstrap: dropdown.js v3.0.0                                                                                      // 673
 * http://twbs.github.com/bootstrap/javascript.html#dropdowns                                                         // 674
 * ========================================================================                                           // 675
 * Copyright 2012 Twitter, Inc.                                                                                       // 676
 *                                                                                                                    // 677
 * Licensed under the Apache License, Version 2.0 (the "License");                                                    // 678
 * you may not use this file except in compliance with the License.                                                   // 679
 * You may obtain a copy of the License at                                                                            // 680
 *                                                                                                                    // 681
 * http://www.apache.org/licenses/LICENSE-2.0                                                                         // 682
 *                                                                                                                    // 683
 * Unless required by applicable law or agreed to in writing, software                                                // 684
 * distributed under the License is distributed on an "AS IS" BASIS,                                                  // 685
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.                                           // 686
 * See the License for the specific language governing permissions and                                                // 687
 * limitations under the License.                                                                                     // 688
 * ======================================================================== */                                        // 689
                                                                                                                      // 690
                                                                                                                      // 691
+function ($) { "use strict";                                                                                         // 692
                                                                                                                      // 693
  // DROPDOWN CLASS DEFINITION                                                                                        // 694
  // =========================                                                                                        // 695
                                                                                                                      // 696
  var backdrop = '.dropdown-backdrop'                                                                                 // 697
  var toggle   = '[data-toggle=dropdown]'                                                                             // 698
  var Dropdown = function (element) {                                                                                 // 699
    var $el = $(element).on('click.bs.dropdown', this.toggle)                                                         // 700
  }                                                                                                                   // 701
                                                                                                                      // 702
  Dropdown.prototype.toggle = function (e) {                                                                          // 703
    var $this = $(this)                                                                                               // 704
                                                                                                                      // 705
    if ($this.is('.disabled, :disabled')) return                                                                      // 706
                                                                                                                      // 707
    var $parent  = getParent($this)                                                                                   // 708
    var isActive = $parent.hasClass('open')                                                                           // 709
                                                                                                                      // 710
    clearMenus()                                                                                                      // 711
                                                                                                                      // 712
    if (!isActive) {                                                                                                  // 713
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {                     // 714
        // if mobile we we use a backdrop because click events don't delegate                                         // 715
        $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus)                            // 716
      }                                                                                                               // 717
                                                                                                                      // 718
      $parent.trigger(e = $.Event('show.bs.dropdown'))                                                                // 719
                                                                                                                      // 720
      if (e.isDefaultPrevented()) return                                                                              // 721
                                                                                                                      // 722
      $parent                                                                                                         // 723
        .toggleClass('open')                                                                                          // 724
        .trigger('shown.bs.dropdown')                                                                                 // 725
                                                                                                                      // 726
      $this.focus()                                                                                                   // 727
    }                                                                                                                 // 728
                                                                                                                      // 729
    return false                                                                                                      // 730
  }                                                                                                                   // 731
                                                                                                                      // 732
  Dropdown.prototype.keydown = function (e) {                                                                         // 733
    if (!/(38|40|27)/.test(e.keyCode)) return                                                                         // 734
                                                                                                                      // 735
    var $this = $(this)                                                                                               // 736
                                                                                                                      // 737
    e.preventDefault()                                                                                                // 738
    e.stopPropagation()                                                                                               // 739
                                                                                                                      // 740
    if ($this.is('.disabled, :disabled')) return                                                                      // 741
                                                                                                                      // 742
    var $parent  = getParent($this)                                                                                   // 743
    var isActive = $parent.hasClass('open')                                                                           // 744
                                                                                                                      // 745
    if (!isActive || (isActive && e.keyCode == 27)) {                                                                 // 746
      if (e.which == 27) $parent.find(toggle).focus()                                                                 // 747
      return $this.click()                                                                                            // 748
    }                                                                                                                 // 749
                                                                                                                      // 750
    var $items = $('[role=menu] li:not(.divider):visible a', $parent)                                                 // 751
                                                                                                                      // 752
    if (!$items.length) return                                                                                        // 753
                                                                                                                      // 754
    var index = $items.index($items.filter(':focus'))                                                                 // 755
                                                                                                                      // 756
    if (e.keyCode == 38 && index > 0)                 index--                        // up                            // 757
    if (e.keyCode == 40 && index < $items.length - 1) index++                        // down                          // 758
    if (!~index)                                      index=0                                                         // 759
                                                                                                                      // 760
    $items.eq(index).focus()                                                                                          // 761
  }                                                                                                                   // 762
                                                                                                                      // 763
  function clearMenus() {                                                                                             // 764
    $(backdrop).remove()                                                                                              // 765
    $(toggle).each(function (e) {                                                                                     // 766
      var $parent = getParent($(this))                                                                                // 767
      if (!$parent.hasClass('open')) return                                                                           // 768
      $parent.trigger(e = $.Event('hide.bs.dropdown'))                                                                // 769
      if (e.isDefaultPrevented()) return                                                                              // 770
      $parent.removeClass('open').trigger('hidden.bs.dropdown')                                                       // 771
    })                                                                                                                // 772
  }                                                                                                                   // 773
                                                                                                                      // 774
  function getParent($this) {                                                                                         // 775
    var selector = $this.attr('data-target')                                                                          // 776
                                                                                                                      // 777
    if (!selector) {                                                                                                  // 778
      selector = $this.attr('href')                                                                                   // 779
      selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7             // 780
    }                                                                                                                 // 781
                                                                                                                      // 782
    var $parent = selector && $(selector)                                                                             // 783
                                                                                                                      // 784
    return $parent && $parent.length ? $parent : $this.parent()                                                       // 785
  }                                                                                                                   // 786
                                                                                                                      // 787
                                                                                                                      // 788
  // DROPDOWN PLUGIN DEFINITION                                                                                       // 789
  // ==========================                                                                                       // 790
                                                                                                                      // 791
  var old = $.fn.dropdown                                                                                             // 792
                                                                                                                      // 793
  $.fn.dropdown = function (option) {                                                                                 // 794
    return this.each(function () {                                                                                    // 795
      var $this = $(this)                                                                                             // 796
      var data  = $this.data('dropdown')                                                                              // 797
                                                                                                                      // 798
      if (!data) $this.data('dropdown', (data = new Dropdown(this)))                                                  // 799
      if (typeof option == 'string') data[option].call($this)                                                         // 800
    })                                                                                                                // 801
  }                                                                                                                   // 802
                                                                                                                      // 803
  $.fn.dropdown.Constructor = Dropdown                                                                                // 804
                                                                                                                      // 805
                                                                                                                      // 806
  // DROPDOWN NO CONFLICT                                                                                             // 807
  // ====================                                                                                             // 808
                                                                                                                      // 809
  $.fn.dropdown.noConflict = function () {                                                                            // 810
    $.fn.dropdown = old                                                                                               // 811
    return this                                                                                                       // 812
  }                                                                                                                   // 813
                                                                                                                      // 814
                                                                                                                      // 815
  // APPLY TO STANDARD DROPDOWN ELEMENTS                                                                              // 816
  // ===================================                                                                              // 817
                                                                                                                      // 818
  $(document)                                                                                                         // 819
    .on('click.bs.dropdown.data-api', clearMenus)                                                                     // 820
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })                         // 821
    .on('click.bs.dropdown.data-api'  , toggle, Dropdown.prototype.toggle)                                            // 822
    .on('keydown.bs.dropdown.data-api', toggle + ', [role=menu]' , Dropdown.prototype.keydown)                        // 823
                                                                                                                      // 824
}(window.jQuery);                                                                                                     // 825
                                                                                                                      // 826
/* ========================================================================                                           // 827
 * Bootstrap: modal.js v3.0.0                                                                                         // 828
 * http://twbs.github.com/bootstrap/javascript.html#modals                                                            // 829
 * ========================================================================                                           // 830
 * Copyright 2012 Twitter, Inc.                                                                                       // 831
 *                                                                                                                    // 832
 * Licensed under the Apache License, Version 2.0 (the "License");                                                    // 833
 * you may not use this file except in compliance with the License.                                                   // 834
 * You may obtain a copy of the License at                                                                            // 835
 *                                                                                                                    // 836
 * http://www.apache.org/licenses/LICENSE-2.0                                                                         // 837
 *                                                                                                                    // 838
 * Unless required by applicable law or agreed to in writing, software                                                // 839
 * distributed under the License is distributed on an "AS IS" BASIS,                                                  // 840
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.                                           // 841
 * See the License for the specific language governing permissions and                                                // 842
 * limitations under the License.                                                                                     // 843
 * ======================================================================== */                                        // 844
                                                                                                                      // 845
                                                                                                                      // 846
+function ($) { "use strict";                                                                                         // 847
                                                                                                                      // 848
  // MODAL CLASS DEFINITION                                                                                           // 849
  // ======================                                                                                           // 850
                                                                                                                      // 851
  var Modal = function (element, options) {                                                                           // 852
    this.options   = options                                                                                          // 853
    this.$element  = $(element)                                                                                       // 854
    this.$backdrop =                                                                                                  // 855
    this.isShown   = null                                                                                             // 856
                                                                                                                      // 857
    if (this.options.remote) this.$element.load(this.options.remote)                                                  // 858
  }                                                                                                                   // 859
                                                                                                                      // 860
  Modal.DEFAULTS = {                                                                                                  // 861
      backdrop: true                                                                                                  // 862
    , keyboard: true                                                                                                  // 863
    , show: true                                                                                                      // 864
  }                                                                                                                   // 865
                                                                                                                      // 866
  Modal.prototype.toggle = function (_relatedTarget) {                                                                // 867
    return this[!this.isShown ? 'show' : 'hide'](_relatedTarget)                                                      // 868
  }                                                                                                                   // 869
                                                                                                                      // 870
  Modal.prototype.show = function (_relatedTarget) {                                                                  // 871
    var that = this                                                                                                   // 872
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })                                            // 873
                                                                                                                      // 874
    this.$element.trigger(e)                                                                                          // 875
                                                                                                                      // 876
    if (this.isShown || e.isDefaultPrevented()) return                                                                // 877
                                                                                                                      // 878
    this.isShown = true                                                                                               // 879
                                                                                                                      // 880
    this.escape()                                                                                                     // 881
                                                                                                                      // 882
    this.$element.on('click.dismiss.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))                       // 883
                                                                                                                      // 884
    this.backdrop(function () {                                                                                       // 885
      var transition = $.support.transition && that.$element.hasClass('fade')                                         // 886
                                                                                                                      // 887
      if (!that.$element.parent().length) {                                                                           // 888
        that.$element.appendTo(document.body) // don't move modals dom position                                       // 889
      }                                                                                                               // 890
                                                                                                                      // 891
      that.$element.show()                                                                                            // 892
                                                                                                                      // 893
      if (transition) {                                                                                               // 894
        that.$element[0].offsetWidth // force reflow                                                                  // 895
      }                                                                                                               // 896
                                                                                                                      // 897
      that.$element                                                                                                   // 898
        .addClass('in')                                                                                               // 899
        .attr('aria-hidden', false)                                                                                   // 900
                                                                                                                      // 901
      that.enforceFocus()                                                                                             // 902
                                                                                                                      // 903
      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })                                            // 904
                                                                                                                      // 905
      transition ?                                                                                                    // 906
        that.$element.find('.modal-dialog') // wait for modal to slide in                                             // 907
          .one($.support.transition.end, function () {                                                                // 908
            that.$element.focus().trigger(e)                                                                          // 909
          })                                                                                                          // 910
          .emulateTransitionEnd(300) :                                                                                // 911
        that.$element.focus().trigger(e)                                                                              // 912
    })                                                                                                                // 913
  }                                                                                                                   // 914
                                                                                                                      // 915
  Modal.prototype.hide = function (e) {                                                                               // 916
    if (e) e.preventDefault()                                                                                         // 917
                                                                                                                      // 918
    e = $.Event('hide.bs.modal')                                                                                      // 919
                                                                                                                      // 920
    this.$element.trigger(e)                                                                                          // 921
                                                                                                                      // 922
    if (!this.isShown || e.isDefaultPrevented()) return                                                               // 923
                                                                                                                      // 924
    this.isShown = false                                                                                              // 925
                                                                                                                      // 926
    this.escape()                                                                                                     // 927
                                                                                                                      // 928
    $(document).off('focusin.bs.modal')                                                                               // 929
                                                                                                                      // 930
    this.$element                                                                                                     // 931
      .removeClass('in')                                                                                              // 932
      .attr('aria-hidden', true)                                                                                      // 933
      .off('click.dismiss.modal')                                                                                     // 934
                                                                                                                      // 935
    $.support.transition && this.$element.hasClass('fade') ?                                                          // 936
      this.$element                                                                                                   // 937
        .one($.support.transition.end, $.proxy(this.hideModal, this))                                                 // 938
        .emulateTransitionEnd(300) :                                                                                  // 939
      this.hideModal()                                                                                                // 940
  }                                                                                                                   // 941
                                                                                                                      // 942
  Modal.prototype.enforceFocus = function () {                                                                        // 943
    $(document)                                                                                                       // 944
      .off('focusin.bs.modal') // guard against infinite focus loop                                                   // 945
      .on('focusin.bs.modal', $.proxy(function (e) {                                                                  // 946
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {                                   // 947
          this.$element.focus()                                                                                       // 948
        }                                                                                                             // 949
      }, this))                                                                                                       // 950
  }                                                                                                                   // 951
                                                                                                                      // 952
  Modal.prototype.escape = function () {                                                                              // 953
    if (this.isShown && this.options.keyboard) {                                                                      // 954
      this.$element.on('keyup.dismiss.bs.modal', $.proxy(function (e) {                                               // 955
        e.which == 27 && this.hide()                                                                                  // 956
      }, this))                                                                                                       // 957
    } else if (!this.isShown) {                                                                                       // 958
      this.$element.off('keyup.dismiss.bs.modal')                                                                     // 959
    }                                                                                                                 // 960
  }                                                                                                                   // 961
                                                                                                                      // 962
  Modal.prototype.hideModal = function () {                                                                           // 963
    var that = this                                                                                                   // 964
    this.$element.hide()                                                                                              // 965
    this.backdrop(function () {                                                                                       // 966
      that.removeBackdrop()                                                                                           // 967
      that.$element.trigger('hidden.bs.modal')                                                                        // 968
    })                                                                                                                // 969
  }                                                                                                                   // 970
                                                                                                                      // 971
  Modal.prototype.removeBackdrop = function () {                                                                      // 972
    this.$backdrop && this.$backdrop.remove()                                                                         // 973
    this.$backdrop = null                                                                                             // 974
  }                                                                                                                   // 975
                                                                                                                      // 976
  Modal.prototype.backdrop = function (callback) {                                                                    // 977
    var that    = this                                                                                                // 978
    var animate = this.$element.hasClass('fade') ? 'fade' : ''                                                        // 979
                                                                                                                      // 980
    if (this.isShown && this.options.backdrop) {                                                                      // 981
      var doAnimate = $.support.transition && animate                                                                 // 982
                                                                                                                      // 983
      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')                                            // 984
        .appendTo(document.body)                                                                                      // 985
                                                                                                                      // 986
      this.$element.on('click.dismiss.modal', $.proxy(function (e) {                                                  // 987
        if (e.target !== e.currentTarget) return                                                                      // 988
        this.options.backdrop == 'static'                                                                             // 989
          ? this.$element[0].focus.call(this.$element[0])                                                             // 990
          : this.hide.call(this)                                                                                      // 991
      }, this))                                                                                                       // 992
                                                                                                                      // 993
      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow                                                    // 994
                                                                                                                      // 995
      this.$backdrop.addClass('in')                                                                                   // 996
                                                                                                                      // 997
      if (!callback) return                                                                                           // 998
                                                                                                                      // 999
      doAnimate ?                                                                                                     // 1000
        this.$backdrop                                                                                                // 1001
          .one($.support.transition.end, callback)                                                                    // 1002
          .emulateTransitionEnd(150) :                                                                                // 1003
        callback()                                                                                                    // 1004
                                                                                                                      // 1005
    } else if (!this.isShown && this.$backdrop) {                                                                     // 1006
      this.$backdrop.removeClass('in')                                                                                // 1007
                                                                                                                      // 1008
      $.support.transition && this.$element.hasClass('fade')?                                                         // 1009
        this.$backdrop                                                                                                // 1010
          .one($.support.transition.end, callback)                                                                    // 1011
          .emulateTransitionEnd(150) :                                                                                // 1012
        callback()                                                                                                    // 1013
                                                                                                                      // 1014
    } else if (callback) {                                                                                            // 1015
      callback()                                                                                                      // 1016
    }                                                                                                                 // 1017
  }                                                                                                                   // 1018
                                                                                                                      // 1019
                                                                                                                      // 1020
  // MODAL PLUGIN DEFINITION                                                                                          // 1021
  // =======================                                                                                          // 1022
                                                                                                                      // 1023
  var old = $.fn.modal                                                                                                // 1024
                                                                                                                      // 1025
  $.fn.modal = function (option, _relatedTarget) {                                                                    // 1026
    return this.each(function () {                                                                                    // 1027
      var $this   = $(this)                                                                                           // 1028
      var data    = $this.data('bs.modal')                                                                            // 1029
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)                   // 1030
                                                                                                                      // 1031
      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))                                            // 1032
      if (typeof option == 'string') data[option](_relatedTarget)                                                     // 1033
      else if (options.show) data.show(_relatedTarget)                                                                // 1034
    })                                                                                                                // 1035
  }                                                                                                                   // 1036
                                                                                                                      // 1037
  $.fn.modal.Constructor = Modal                                                                                      // 1038
                                                                                                                      // 1039
                                                                                                                      // 1040
  // MODAL NO CONFLICT                                                                                                // 1041
  // =================                                                                                                // 1042
                                                                                                                      // 1043
  $.fn.modal.noConflict = function () {                                                                               // 1044
    $.fn.modal = old                                                                                                  // 1045
    return this                                                                                                       // 1046
  }                                                                                                                   // 1047
                                                                                                                      // 1048
                                                                                                                      // 1049
  // MODAL DATA-API                                                                                                   // 1050
  // ==============                                                                                                   // 1051
                                                                                                                      // 1052
  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {                                   // 1053
    var $this   = $(this)                                                                                             // 1054
    var href    = $this.attr('href')                                                                                  // 1055
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) //strip for ie7        // 1056
    var option  = $target.data('modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())
                                                                                                                      // 1058
    e.preventDefault()                                                                                                // 1059
                                                                                                                      // 1060
    $target                                                                                                           // 1061
      .modal(option, this)                                                                                            // 1062
      .one('hide', function () {                                                                                      // 1063
        $this.is(':visible') && $this.focus()                                                                         // 1064
      })                                                                                                              // 1065
  })                                                                                                                  // 1066
                                                                                                                      // 1067
  $(document)                                                                                                         // 1068
    .on('show.bs.modal',  '.modal', function () { $(document.body).addClass('modal-open') })                          // 1069
    .on('hidden.bs.modal', '.modal', function () { $(document.body).removeClass('modal-open') })                      // 1070
                                                                                                                      // 1071
}(window.jQuery);                                                                                                     // 1072
                                                                                                                      // 1073
/* ========================================================================                                           // 1074
 * Bootstrap: tooltip.js v3.0.0                                                                                       // 1075
 * http://twbs.github.com/bootstrap/javascript.html#tooltip                                                           // 1076
 * Inspired by the original jQuery.tipsy by Jason Frame                                                               // 1077
 * ========================================================================                                           // 1078
 * Copyright 2012 Twitter, Inc.                                                                                       // 1079
 *                                                                                                                    // 1080
 * Licensed under the Apache License, Version 2.0 (the "License");                                                    // 1081
 * you may not use this file except in compliance with the License.                                                   // 1082
 * You may obtain a copy of the License at                                                                            // 1083
 *                                                                                                                    // 1084
 * http://www.apache.org/licenses/LICENSE-2.0                                                                         // 1085
 *                                                                                                                    // 1086
 * Unless required by applicable law or agreed to in writing, software                                                // 1087
 * distributed under the License is distributed on an "AS IS" BASIS,                                                  // 1088
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.                                           // 1089
 * See the License for the specific language governing permissions and                                                // 1090
 * limitations under the License.                                                                                     // 1091
 * ======================================================================== */                                        // 1092
                                                                                                                      // 1093
                                                                                                                      // 1094
+function ($) { "use strict";                                                                                         // 1095
                                                                                                                      // 1096
  // TOOLTIP PUBLIC CLASS DEFINITION                                                                                  // 1097
  // ===============================                                                                                  // 1098
                                                                                                                      // 1099
  var Tooltip = function (element, options) {                                                                         // 1100
    this.type       =                                                                                                 // 1101
    this.options    =                                                                                                 // 1102
    this.enabled    =                                                                                                 // 1103
    this.timeout    =                                                                                                 // 1104
    this.hoverState =                                                                                                 // 1105
    this.$element   = null                                                                                            // 1106
                                                                                                                      // 1107
    this.init('tooltip', element, options)                                                                            // 1108
  }                                                                                                                   // 1109
                                                                                                                      // 1110
  Tooltip.DEFAULTS = {                                                                                                // 1111
    animation: true                                                                                                   // 1112
  , placement: 'top'                                                                                                  // 1113
  , selector: false                                                                                                   // 1114
  , template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'         // 1115
  , trigger: 'hover focus'                                                                                            // 1116
  , title: ''                                                                                                         // 1117
  , delay: 0                                                                                                          // 1118
  , html: false                                                                                                       // 1119
  , container: false                                                                                                  // 1120
  }                                                                                                                   // 1121
                                                                                                                      // 1122
  Tooltip.prototype.init = function (type, element, options) {                                                        // 1123
    this.enabled  = true                                                                                              // 1124
    this.type     = type                                                                                              // 1125
    this.$element = $(element)                                                                                        // 1126
    this.options  = this.getOptions(options)                                                                          // 1127
                                                                                                                      // 1128
    var triggers = this.options.trigger.split(' ')                                                                    // 1129
                                                                                                                      // 1130
    for (var i = triggers.length; i--;) {                                                                             // 1131
      var trigger = triggers[i]                                                                                       // 1132
                                                                                                                      // 1133
      if (trigger == 'click') {                                                                                       // 1134
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))                     // 1135
      } else if (trigger != 'manual') {                                                                               // 1136
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focus'                                                    // 1137
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'blur'                                                     // 1138
                                                                                                                      // 1139
        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))                // 1140
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))                // 1141
      }                                                                                                               // 1142
    }                                                                                                                 // 1143
                                                                                                                      // 1144
    this.options.selector ?                                                                                           // 1145
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :                             // 1146
      this.fixTitle()                                                                                                 // 1147
  }                                                                                                                   // 1148
                                                                                                                      // 1149
  Tooltip.prototype.getDefaults = function () {                                                                       // 1150
    return Tooltip.DEFAULTS                                                                                           // 1151
  }                                                                                                                   // 1152
                                                                                                                      // 1153
  Tooltip.prototype.getOptions = function (options) {                                                                 // 1154
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)                                         // 1155
                                                                                                                      // 1156
    if (options.delay && typeof options.delay == 'number') {                                                          // 1157
      options.delay = {                                                                                               // 1158
        show: options.delay                                                                                           // 1159
      , hide: options.delay                                                                                           // 1160
      }                                                                                                               // 1161
    }                                                                                                                 // 1162
                                                                                                                      // 1163
    return options                                                                                                    // 1164
  }                                                                                                                   // 1165
                                                                                                                      // 1166
  Tooltip.prototype.getDelegateOptions = function () {                                                                // 1167
    var options  = {}                                                                                                 // 1168
    var defaults = this.getDefaults()                                                                                 // 1169
                                                                                                                      // 1170
    this._options && $.each(this._options, function (key, value) {                                                    // 1171
      if (defaults[key] != value) options[key] = value                                                                // 1172
    })                                                                                                                // 1173
                                                                                                                      // 1174
    return options                                                                                                    // 1175
  }                                                                                                                   // 1176
                                                                                                                      // 1177
  Tooltip.prototype.enter = function (obj) {                                                                          // 1178
    var self = obj instanceof this.constructor ?                                                                      // 1179
      obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)                        // 1180
                                                                                                                      // 1181
    clearTimeout(self.timeout)                                                                                        // 1182
                                                                                                                      // 1183
    self.hoverState = 'in'                                                                                            // 1184
                                                                                                                      // 1185
    if (!self.options.delay || !self.options.delay.show) return self.show()                                           // 1186
                                                                                                                      // 1187
    self.timeout = setTimeout(function () {                                                                           // 1188
      if (self.hoverState == 'in') self.show()                                                                        // 1189
    }, self.options.delay.show)                                                                                       // 1190
  }                                                                                                                   // 1191
                                                                                                                      // 1192
  Tooltip.prototype.leave = function (obj) {                                                                          // 1193
    var self = obj instanceof this.constructor ?                                                                      // 1194
      obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)                        // 1195
                                                                                                                      // 1196
    clearTimeout(self.timeout)                                                                                        // 1197
                                                                                                                      // 1198
    self.hoverState = 'out'                                                                                           // 1199
                                                                                                                      // 1200
    if (!self.options.delay || !self.options.delay.hide) return self.hide()                                           // 1201
                                                                                                                      // 1202
    self.timeout = setTimeout(function () {                                                                           // 1203
      if (self.hoverState == 'out') self.hide()                                                                       // 1204
    }, self.options.delay.hide)                                                                                       // 1205
  }                                                                                                                   // 1206
                                                                                                                      // 1207
  Tooltip.prototype.show = function () {                                                                              // 1208
    var e = $.Event('show.bs.'+ this.type)                                                                            // 1209
                                                                                                                      // 1210
    if (this.hasContent() && this.enabled) {                                                                          // 1211
      this.$element.trigger(e)                                                                                        // 1212
                                                                                                                      // 1213
      if (e.isDefaultPrevented()) return                                                                              // 1214
                                                                                                                      // 1215
      var $tip = this.tip()                                                                                           // 1216
                                                                                                                      // 1217
      this.setContent()                                                                                               // 1218
                                                                                                                      // 1219
      if (this.options.animation) $tip.addClass('fade')                                                               // 1220
                                                                                                                      // 1221
      var placement = typeof this.options.placement == 'function' ?                                                   // 1222
        this.options.placement.call(this, $tip[0], this.$element[0]) :                                                // 1223
        this.options.placement                                                                                        // 1224
                                                                                                                      // 1225
      var autoToken = /\s?auto?\s?/i                                                                                  // 1226
      var autoPlace = autoToken.test(placement)                                                                       // 1227
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'                                            // 1228
                                                                                                                      // 1229
      $tip                                                                                                            // 1230
        .detach()                                                                                                     // 1231
        .css({ top: 0, left: 0, display: 'block' })                                                                   // 1232
        .addClass(placement)                                                                                          // 1233
                                                                                                                      // 1234
      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)                // 1235
                                                                                                                      // 1236
      var pos          = this.getPosition()                                                                           // 1237
      var actualWidth  = $tip[0].offsetWidth                                                                          // 1238
      var actualHeight = $tip[0].offsetHeight                                                                         // 1239
                                                                                                                      // 1240
      if (autoPlace) {                                                                                                // 1241
        var $parent = this.$element.parent()                                                                          // 1242
                                                                                                                      // 1243
        var orgPlacement = placement                                                                                  // 1244
        var docScroll    = document.documentElement.scrollTop || document.body.scrollTop                              // 1245
        var parentWidth  = this.options.container == 'body' ? window.innerWidth  : $parent.outerWidth()               // 1246
        var parentHeight = this.options.container == 'body' ? window.innerHeight : $parent.outerHeight()              // 1247
        var parentLeft   = this.options.container == 'body' ? 0 : $parent.offset().left                               // 1248
                                                                                                                      // 1249
        placement = placement == 'bottom' && pos.top   + pos.height  + actualHeight - docScroll > parentHeight  ? 'top'    :
                    placement == 'top'    && pos.top   - docScroll   - actualHeight < 0                         ? 'bottom' :
                    placement == 'right'  && pos.right + actualWidth > parentWidth                              ? 'left'   :
                    placement == 'left'   && pos.left  - actualWidth < parentLeft                               ? 'right'  :
                    placement                                                                                         // 1254
                                                                                                                      // 1255
        $tip                                                                                                          // 1256
          .removeClass(orgPlacement)                                                                                  // 1257
          .addClass(placement)                                                                                        // 1258
      }                                                                                                               // 1259
                                                                                                                      // 1260
      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)                      // 1261
                                                                                                                      // 1262
      this.applyPlacement(calculatedOffset, placement)                                                                // 1263
      this.$element.trigger('shown.bs.' + this.type)                                                                  // 1264
    }                                                                                                                 // 1265
  }                                                                                                                   // 1266
                                                                                                                      // 1267
  Tooltip.prototype.applyPlacement = function(offset, placement) {                                                    // 1268
    var replace                                                                                                       // 1269
    var $tip   = this.tip()                                                                                           // 1270
    var width  = $tip[0].offsetWidth                                                                                  // 1271
    var height = $tip[0].offsetHeight                                                                                 // 1272
                                                                                                                      // 1273
    // manually read margins because getBoundingClientRect includes difference                                        // 1274
    var marginTop = parseInt($tip.css('margin-top'), 10)                                                              // 1275
    var marginLeft = parseInt($tip.css('margin-left'), 10)                                                            // 1276
                                                                                                                      // 1277
    // we must check for NaN for ie 8/9                                                                               // 1278
    if (isNaN(marginTop))  marginTop  = 0                                                                             // 1279
    if (isNaN(marginLeft)) marginLeft = 0                                                                             // 1280
                                                                                                                      // 1281
    offset.top  = offset.top  + marginTop                                                                             // 1282
    offset.left = offset.left + marginLeft                                                                            // 1283
                                                                                                                      // 1284
    $tip                                                                                                              // 1285
      .offset(offset)                                                                                                 // 1286
      .addClass('in')                                                                                                 // 1287
                                                                                                                      // 1288
    // check to see if placing tip in new offset caused the tip to resize itself                                      // 1289
    var actualWidth  = $tip[0].offsetWidth                                                                            // 1290
    var actualHeight = $tip[0].offsetHeight                                                                           // 1291
                                                                                                                      // 1292
    if (placement == 'top' && actualHeight != height) {                                                               // 1293
      replace = true                                                                                                  // 1294
      offset.top = offset.top + height - actualHeight                                                                 // 1295
    }                                                                                                                 // 1296
                                                                                                                      // 1297
    if (/bottom|top/.test(placement)) {                                                                               // 1298
      var delta = 0                                                                                                   // 1299
                                                                                                                      // 1300
      if (offset.left < 0) {                                                                                          // 1301
        delta       = offset.left * -2                                                                                // 1302
        offset.left = 0                                                                                               // 1303
                                                                                                                      // 1304
        $tip.offset(offset)                                                                                           // 1305
                                                                                                                      // 1306
        actualWidth  = $tip[0].offsetWidth                                                                            // 1307
        actualHeight = $tip[0].offsetHeight                                                                           // 1308
      }                                                                                                               // 1309
                                                                                                                      // 1310
      this.replaceArrow(delta - width + actualWidth, actualWidth, 'left')                                             // 1311
    } else {                                                                                                          // 1312
      this.replaceArrow(actualHeight - height, actualHeight, 'top')                                                   // 1313
    }                                                                                                                 // 1314
                                                                                                                      // 1315
    if (replace) $tip.offset(offset)                                                                                  // 1316
  }                                                                                                                   // 1317
                                                                                                                      // 1318
  Tooltip.prototype.replaceArrow = function(delta, dimension, position) {                                             // 1319
    this.arrow().css(position, delta ? (50 * (1 - delta / dimension) + "%") : '')                                     // 1320
  }                                                                                                                   // 1321
                                                                                                                      // 1322
  Tooltip.prototype.setContent = function () {                                                                        // 1323
    var $tip  = this.tip()                                                                                            // 1324
    var title = this.getTitle()                                                                                       // 1325
                                                                                                                      // 1326
    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)                                           // 1327
    $tip.removeClass('fade in top bottom left right')                                                                 // 1328
  }                                                                                                                   // 1329
                                                                                                                      // 1330
  Tooltip.prototype.hide = function () {                                                                              // 1331
    var that = this                                                                                                   // 1332
    var $tip = this.tip()                                                                                             // 1333
    var e    = $.Event('hide.bs.' + this.type)                                                                        // 1334
                                                                                                                      // 1335
    function complete() {                                                                                             // 1336
      if (that.hoverState != 'in') $tip.detach()                                                                      // 1337
    }                                                                                                                 // 1338
                                                                                                                      // 1339
    this.$element.trigger(e)                                                                                          // 1340
                                                                                                                      // 1341
    if (e.isDefaultPrevented()) return                                                                                // 1342
                                                                                                                      // 1343
    $tip.removeClass('in')                                                                                            // 1344
                                                                                                                      // 1345
    $.support.transition && this.$tip.hasClass('fade') ?                                                              // 1346
      $tip                                                                                                            // 1347
        .one($.support.transition.end, complete)                                                                      // 1348
        .emulateTransitionEnd(150) :                                                                                  // 1349
      complete()                                                                                                      // 1350
                                                                                                                      // 1351
    this.$element.trigger('hidden.bs.' + this.type)                                                                   // 1352
                                                                                                                      // 1353
    return this                                                                                                       // 1354
  }                                                                                                                   // 1355
                                                                                                                      // 1356
  Tooltip.prototype.fixTitle = function () {                                                                          // 1357
    var $e = this.$element                                                                                            // 1358
    if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') {                                     // 1359
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')                                        // 1360
    }                                                                                                                 // 1361
  }                                                                                                                   // 1362
                                                                                                                      // 1363
  Tooltip.prototype.hasContent = function () {                                                                        // 1364
    return this.getTitle()                                                                                            // 1365
  }                                                                                                                   // 1366
                                                                                                                      // 1367
  Tooltip.prototype.getPosition = function () {                                                                       // 1368
    var el = this.$element[0]                                                                                         // 1369
    return $.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : {              // 1370
      width: el.offsetWidth                                                                                           // 1371
    , height: el.offsetHeight                                                                                         // 1372
    }, this.$element.offset())                                                                                        // 1373
  }                                                                                                                   // 1374
                                                                                                                      // 1375
  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {                      // 1376
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width   } // 1380
  }                                                                                                                   // 1381
                                                                                                                      // 1382
  Tooltip.prototype.getTitle = function () {                                                                          // 1383
    var title                                                                                                         // 1384
    var $e = this.$element                                                                                            // 1385
    var o  = this.options                                                                                             // 1386
                                                                                                                      // 1387
    title = $e.attr('data-original-title')                                                                            // 1388
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)                                              // 1389
                                                                                                                      // 1390
    return title                                                                                                      // 1391
  }                                                                                                                   // 1392
                                                                                                                      // 1393
  Tooltip.prototype.tip = function () {                                                                               // 1394
    return this.$tip = this.$tip || $(this.options.template)                                                          // 1395
  }                                                                                                                   // 1396
                                                                                                                      // 1397
  Tooltip.prototype.arrow = function () {                                                                             // 1398
    return this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow')                                             // 1399
  }                                                                                                                   // 1400
                                                                                                                      // 1401
  Tooltip.prototype.validate = function () {                                                                          // 1402
    if (!this.$element[0].parentNode) {                                                                               // 1403
      this.hide()                                                                                                     // 1404
      this.$element = null                                                                                            // 1405
      this.options  = null                                                                                            // 1406
    }                                                                                                                 // 1407
  }                                                                                                                   // 1408
                                                                                                                      // 1409
  Tooltip.prototype.enable = function () {                                                                            // 1410
    this.enabled = true                                                                                               // 1411
  }                                                                                                                   // 1412
                                                                                                                      // 1413
  Tooltip.prototype.disable = function () {                                                                           // 1414
    this.enabled = false                                                                                              // 1415
  }                                                                                                                   // 1416
                                                                                                                      // 1417
  Tooltip.prototype.toggleEnabled = function () {                                                                     // 1418
    this.enabled = !this.enabled                                                                                      // 1419
  }                                                                                                                   // 1420
                                                                                                                      // 1421
  Tooltip.prototype.toggle = function (e) {                                                                           // 1422
    var self = e ? $(e.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type) : this            // 1423
    self.tip().hasClass('in') ? self.leave(self) : self.enter(self)                                                   // 1424
  }                                                                                                                   // 1425
                                                                                                                      // 1426
  Tooltip.prototype.destroy = function () {                                                                           // 1427
    this.hide().$element.off('.' + this.type).removeData('bs.' + this.type)                                           // 1428
  }                                                                                                                   // 1429
                                                                                                                      // 1430
                                                                                                                      // 1431
  // TOOLTIP PLUGIN DEFINITION                                                                                        // 1432
  // =========================                                                                                        // 1433
                                                                                                                      // 1434
  var old = $.fn.tooltip                                                                                              // 1435
                                                                                                                      // 1436
  $.fn.tooltip = function (option) {                                                                                  // 1437
    return this.each(function () {                                                                                    // 1438
      var $this   = $(this)                                                                                           // 1439
      var data    = $this.data('bs.tooltip')                                                                          // 1440
      var options = typeof option == 'object' && option                                                               // 1441
                                                                                                                      // 1442
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))                                        // 1443
      if (typeof option == 'string') data[option]()                                                                   // 1444
    })                                                                                                                // 1445
  }                                                                                                                   // 1446
                                                                                                                      // 1447
  $.fn.tooltip.Constructor = Tooltip                                                                                  // 1448
                                                                                                                      // 1449
                                                                                                                      // 1450
  // TOOLTIP NO CONFLICT                                                                                              // 1451
  // ===================                                                                                              // 1452
                                                                                                                      // 1453
  $.fn.tooltip.noConflict = function () {                                                                             // 1454
    $.fn.tooltip = old                                                                                                // 1455
    return this                                                                                                       // 1456
  }                                                                                                                   // 1457
                                                                                                                      // 1458
}(window.jQuery);                                                                                                     // 1459
                                                                                                                      // 1460
/* ========================================================================                                           // 1461
 * Bootstrap: popover.js v3.0.0                                                                                       // 1462
 * http://twbs.github.com/bootstrap/javascript.html#popovers                                                          // 1463
 * ========================================================================                                           // 1464
 * Copyright 2012 Twitter, Inc.                                                                                       // 1465
 *                                                                                                                    // 1466
 * Licensed under the Apache License, Version 2.0 (the "License");                                                    // 1467
 * you may not use this file except in compliance with the License.                                                   // 1468
 * You may obtain a copy of the License at                                                                            // 1469
 *                                                                                                                    // 1470
 * http://www.apache.org/licenses/LICENSE-2.0                                                                         // 1471
 *                                                                                                                    // 1472
 * Unless required by applicable law or agreed to in writing, software                                                // 1473
 * distributed under the License is distributed on an "AS IS" BASIS,                                                  // 1474
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.                                           // 1475
 * See the License for the specific language governing permissions and                                                // 1476
 * limitations under the License.                                                                                     // 1477
 * ======================================================================== */                                        // 1478
                                                                                                                      // 1479
                                                                                                                      // 1480
+function ($) { "use strict";                                                                                         // 1481
                                                                                                                      // 1482
  // POPOVER PUBLIC CLASS DEFINITION                                                                                  // 1483
  // ===============================                                                                                  // 1484
                                                                                                                      // 1485
  var Popover = function (element, options) {                                                                         // 1486
    this.init('popover', element, options)                                                                            // 1487
  }                                                                                                                   // 1488
                                                                                                                      // 1489
  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')                                                   // 1490
                                                                                                                      // 1491
  Popover.DEFAULTS = $.extend({} , $.fn.tooltip.Constructor.DEFAULTS, {                                               // 1492
    placement: 'right'                                                                                                // 1493
  , trigger: 'click'                                                                                                  // 1494
  , content: ''                                                                                                       // 1495
  , template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })                                                                                                                  // 1497
                                                                                                                      // 1498
                                                                                                                      // 1499
  // NOTE: POPOVER EXTENDS tooltip.js                                                                                 // 1500
  // ================================                                                                                 // 1501
                                                                                                                      // 1502
  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)                                                // 1503
                                                                                                                      // 1504
  Popover.prototype.constructor = Popover                                                                             // 1505
                                                                                                                      // 1506
  Popover.prototype.getDefaults = function () {                                                                       // 1507
    return Popover.DEFAULTS                                                                                           // 1508
  }                                                                                                                   // 1509
                                                                                                                      // 1510
  Popover.prototype.setContent = function () {                                                                        // 1511
    var $tip    = this.tip()                                                                                          // 1512
    var title   = this.getTitle()                                                                                     // 1513
    var content = this.getContent()                                                                                   // 1514
                                                                                                                      // 1515
    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)                                           // 1516
    $tip.find('.popover-content')[this.options.html ? 'html' : 'text'](content)                                       // 1517
                                                                                                                      // 1518
    $tip.removeClass('fade top bottom left right in')                                                                 // 1519
                                                                                                                      // 1520
    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do                                      // 1521
    // this manually by checking the contents.                                                                        // 1522
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()                                       // 1523
  }                                                                                                                   // 1524
                                                                                                                      // 1525
  Popover.prototype.hasContent = function () {                                                                        // 1526
    return this.getTitle() || this.getContent()                                                                       // 1527
  }                                                                                                                   // 1528
                                                                                                                      // 1529
  Popover.prototype.getContent = function () {                                                                        // 1530
    var $e = this.$element                                                                                            // 1531
    var o  = this.options                                                                                             // 1532
                                                                                                                      // 1533
    return $e.attr('data-content')                                                                                    // 1534
      || (typeof o.content == 'function' ?                                                                            // 1535
            o.content.call($e[0]) :                                                                                   // 1536
            o.content)                                                                                                // 1537
  }                                                                                                                   // 1538
                                                                                                                      // 1539
  Popover.prototype.arrow = function () {                                                                             // 1540
    return this.$arrow = this.$arrow || this.tip().find('.arrow')                                                     // 1541
  }                                                                                                                   // 1542
                                                                                                                      // 1543
  Popover.prototype.tip = function () {                                                                               // 1544
    if (!this.$tip) this.$tip = $(this.options.template)                                                              // 1545
    return this.$tip                                                                                                  // 1546
  }                                                                                                                   // 1547
                                                                                                                      // 1548
                                                                                                                      // 1549
  // POPOVER PLUGIN DEFINITION                                                                                        // 1550
  // =========================                                                                                        // 1551
                                                                                                                      // 1552
  var old = $.fn.popover                                                                                              // 1553
                                                                                                                      // 1554
  $.fn.popover = function (option) {                                                                                  // 1555
    return this.each(function () {                                                                                    // 1556
      var $this   = $(this)                                                                                           // 1557
      var data    = $this.data('bs.popover')                                                                          // 1558
      var options = typeof option == 'object' && option                                                               // 1559
                                                                                                                      // 1560
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))                                        // 1561
      if (typeof option == 'string') data[option]()                                                                   // 1562
    })                                                                                                                // 1563
  }                                                                                                                   // 1564
                                                                                                                      // 1565
  $.fn.popover.Constructor = Popover                                                                                  // 1566
                                                                                                                      // 1567
                                                                                                                      // 1568
  // POPOVER NO CONFLICT                                                                                              // 1569
  // ===================                                                                                              // 1570
                                                                                                                      // 1571
  $.fn.popover.noConflict = function () {                                                                             // 1572
    $.fn.popover = old                                                                                                // 1573
    return this                                                                                                       // 1574
  }                                                                                                                   // 1575
                                                                                                                      // 1576
}(window.jQuery);                                                                                                     // 1577
                                                                                                                      // 1578
/* ========================================================================                                           // 1579
 * Bootstrap: scrollspy.js v3.0.0                                                                                     // 1580
 * http://twbs.github.com/bootstrap/javascript.html#scrollspy                                                         // 1581
 * ========================================================================                                           // 1582
 * Copyright 2012 Twitter, Inc.                                                                                       // 1583
 *                                                                                                                    // 1584
 * Licensed under the Apache License, Version 2.0 (the "License");                                                    // 1585
 * you may not use this file except in compliance with the License.                                                   // 1586
 * You may obtain a copy of the License at                                                                            // 1587
 *                                                                                                                    // 1588
 * http://www.apache.org/licenses/LICENSE-2.0                                                                         // 1589
 *                                                                                                                    // 1590
 * Unless required by applicable law or agreed to in writing, software                                                // 1591
 * distributed under the License is distributed on an "AS IS" BASIS,                                                  // 1592
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.                                           // 1593
 * See the License for the specific language governing permissions and                                                // 1594
 * limitations under the License.                                                                                     // 1595
 * ======================================================================== */                                        // 1596
                                                                                                                      // 1597
                                                                                                                      // 1598
+function ($) { "use strict";                                                                                         // 1599
                                                                                                                      // 1600
  // SCROLLSPY CLASS DEFINITION                                                                                       // 1601
  // ==========================                                                                                       // 1602
                                                                                                                      // 1603
  function ScrollSpy(element, options) {                                                                              // 1604
    var href                                                                                                          // 1605
    var process  = $.proxy(this.process, this)                                                                        // 1606
                                                                                                                      // 1607
    this.$element       = $(element).is('body') ? $(window) : $(element)                                              // 1608
    this.$body          = $('body')                                                                                   // 1609
    this.$scrollElement = this.$element.on('scroll.bs.scroll-spy.data-api', process)                                  // 1610
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)                                                   // 1611
    this.selector       = (this.options.target                                                                        // 1612
      || ((href = $(element).attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7                     // 1613
      || '') + ' .nav li > a'                                                                                         // 1614
    this.offsets        = $([])                                                                                       // 1615
    this.targets        = $([])                                                                                       // 1616
    this.activeTarget   = null                                                                                        // 1617
                                                                                                                      // 1618
    this.refresh()                                                                                                    // 1619
    this.process()                                                                                                    // 1620
  }                                                                                                                   // 1621
                                                                                                                      // 1622
  ScrollSpy.DEFAULTS = {                                                                                              // 1623
    offset: 10                                                                                                        // 1624
  }                                                                                                                   // 1625
                                                                                                                      // 1626
  ScrollSpy.prototype.refresh = function () {                                                                         // 1627
    var offsetMethod = this.$element[0] == window ? 'offset' : 'position'                                             // 1628
                                                                                                                      // 1629
    this.offsets = $([])                                                                                              // 1630
    this.targets = $([])                                                                                              // 1631
                                                                                                                      // 1632
    var self     = this                                                                                               // 1633
    var $targets = this.$body                                                                                         // 1634
      .find(this.selector)                                                                                            // 1635
      .map(function () {                                                                                              // 1636
        var $el   = $(this)                                                                                           // 1637
        var href  = $el.data('target') || $el.attr('href')                                                            // 1638
        var $href = /^#\w/.test(href) && $(href)                                                                      // 1639
                                                                                                                      // 1640
        return ($href                                                                                                 // 1641
          && $href.length                                                                                             // 1642
          && [[ $href[offsetMethod]().top + (!$.isWindow(self.$scrollElement.get(0)) && self.$scrollElement.scrollTop()), href ]]) || null
      })                                                                                                              // 1644
      .sort(function (a, b) { return a[0] - b[0] })                                                                   // 1645
      .each(function () {                                                                                             // 1646
        self.offsets.push(this[0])                                                                                    // 1647
        self.targets.push(this[1])                                                                                    // 1648
      })                                                                                                              // 1649
  }                                                                                                                   // 1650
                                                                                                                      // 1651
  ScrollSpy.prototype.process = function () {                                                                         // 1652
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset                                          // 1653
    var scrollHeight = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight                              // 1654
    var maxScroll    = scrollHeight - this.$scrollElement.height()                                                    // 1655
    var offsets      = this.offsets                                                                                   // 1656
    var targets      = this.targets                                                                                   // 1657
    var activeTarget = this.activeTarget                                                                              // 1658
    var i                                                                                                             // 1659
                                                                                                                      // 1660
    if (scrollTop >= maxScroll) {                                                                                     // 1661
      return activeTarget != (i = targets.last()[0]) && this.activate(i)                                              // 1662
    }                                                                                                                 // 1663
                                                                                                                      // 1664
    for (i = offsets.length; i--;) {                                                                                  // 1665
      activeTarget != targets[i]                                                                                      // 1666
        && scrollTop >= offsets[i]                                                                                    // 1667
        && (!offsets[i + 1] || scrollTop <= offsets[i + 1])                                                           // 1668
        && this.activate( targets[i] )                                                                                // 1669
    }                                                                                                                 // 1670
  }                                                                                                                   // 1671
                                                                                                                      // 1672
  ScrollSpy.prototype.activate = function (target) {                                                                  // 1673
    this.activeTarget = target                                                                                        // 1674
                                                                                                                      // 1675
    $(this.selector)                                                                                                  // 1676
      .parents('.active')                                                                                             // 1677
      .removeClass('active')                                                                                          // 1678
                                                                                                                      // 1679
    var selector = this.selector                                                                                      // 1680
      + '[data-target="' + target + '"],'                                                                             // 1681
      + this.selector + '[href="' + target + '"]'                                                                     // 1682
                                                                                                                      // 1683
    var active = $(selector)                                                                                          // 1684
      .parents('li')                                                                                                  // 1685
      .addClass('active')                                                                                             // 1686
                                                                                                                      // 1687
    if (active.parent('.dropdown-menu').length)  {                                                                    // 1688
      active = active                                                                                                 // 1689
        .closest('li.dropdown')                                                                                       // 1690
        .addClass('active')                                                                                           // 1691
    }                                                                                                                 // 1692
                                                                                                                      // 1693
    active.trigger('activate')                                                                                        // 1694
  }                                                                                                                   // 1695
                                                                                                                      // 1696
                                                                                                                      // 1697
  // SCROLLSPY PLUGIN DEFINITION                                                                                      // 1698
  // ===========================                                                                                      // 1699
                                                                                                                      // 1700
  var old = $.fn.scrollspy                                                                                            // 1701
                                                                                                                      // 1702
  $.fn.scrollspy = function (option) {                                                                                // 1703
    return this.each(function () {                                                                                    // 1704
      var $this   = $(this)                                                                                           // 1705
      var data    = $this.data('bs.scrollspy')                                                                        // 1706
      var options = typeof option == 'object' && option                                                               // 1707
                                                                                                                      // 1708
      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))                                    // 1709
      if (typeof option == 'string') data[option]()                                                                   // 1710
    })                                                                                                                // 1711
  }                                                                                                                   // 1712
                                                                                                                      // 1713
  $.fn.scrollspy.Constructor = ScrollSpy                                                                              // 1714
                                                                                                                      // 1715
                                                                                                                      // 1716
  // SCROLLSPY NO CONFLICT                                                                                            // 1717
  // =====================                                                                                            // 1718
                                                                                                                      // 1719
  $.fn.scrollspy.noConflict = function () {                                                                           // 1720
    $.fn.scrollspy = old                                                                                              // 1721
    return this                                                                                                       // 1722
  }                                                                                                                   // 1723
                                                                                                                      // 1724
                                                                                                                      // 1725
  // SCROLLSPY DATA-API                                                                                               // 1726
  // ==================                                                                                               // 1727
                                                                                                                      // 1728
  $(window).on('load', function () {                                                                                  // 1729
    $('[data-spy="scroll"]').each(function () {                                                                       // 1730
      var $spy = $(this)                                                                                              // 1731
      $spy.scrollspy($spy.data())                                                                                     // 1732
    })                                                                                                                // 1733
  })                                                                                                                  // 1734
                                                                                                                      // 1735
}(window.jQuery);                                                                                                     // 1736
                                                                                                                      // 1737
/* ========================================================================                                           // 1738
 * Bootstrap: tab.js v3.0.0                                                                                           // 1739
 * http://twbs.github.com/bootstrap/javascript.html#tabs                                                              // 1740
 * ========================================================================                                           // 1741
 * Copyright 2012 Twitter, Inc.                                                                                       // 1742
 *                                                                                                                    // 1743
 * Licensed under the Apache License, Version 2.0 (the "License");                                                    // 1744
 * you may not use this file except in compliance with the License.                                                   // 1745
 * You may obtain a copy of the License at                                                                            // 1746
 *                                                                                                                    // 1747
 * http://www.apache.org/licenses/LICENSE-2.0                                                                         // 1748
 *                                                                                                                    // 1749
 * Unless required by applicable law or agreed to in writing, software                                                // 1750
 * distributed under the License is distributed on an "AS IS" BASIS,                                                  // 1751
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.                                           // 1752
 * See the License for the specific language governing permissions and                                                // 1753
 * limitations under the License.                                                                                     // 1754
 * ======================================================================== */                                        // 1755
                                                                                                                      // 1756
                                                                                                                      // 1757
+function ($) { "use strict";                                                                                         // 1758
                                                                                                                      // 1759
  // TAB CLASS DEFINITION                                                                                             // 1760
  // ====================                                                                                             // 1761
                                                                                                                      // 1762
  var Tab = function (element) {                                                                                      // 1763
    this.element = $(element)                                                                                         // 1764
  }                                                                                                                   // 1765
                                                                                                                      // 1766
  Tab.prototype.show = function () {                                                                                  // 1767
    var $this    = this.element                                                                                       // 1768
    var $ul      = $this.closest('ul:not(.dropdown-menu)')                                                            // 1769
    var selector = $this.attr('data-target')                                                                          // 1770
                                                                                                                      // 1771
    if (!selector) {                                                                                                  // 1772
      selector = $this.attr('href')                                                                                   // 1773
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7                                   // 1774
    }                                                                                                                 // 1775
                                                                                                                      // 1776
    if ($this.parent('li').hasClass('active')) return                                                                 // 1777
                                                                                                                      // 1778
    var previous = $ul.find('.active:last a')[0]                                                                      // 1779
    var e        = $.Event('show.bs.tab', {                                                                           // 1780
      relatedTarget: previous                                                                                         // 1781
    })                                                                                                                // 1782
                                                                                                                      // 1783
    $this.trigger(e)                                                                                                  // 1784
                                                                                                                      // 1785
    if (e.isDefaultPrevented()) return                                                                                // 1786
                                                                                                                      // 1787
    var $target = $(selector)                                                                                         // 1788
                                                                                                                      // 1789
    this.activate($this.parent('li'), $ul)                                                                            // 1790
    this.activate($target, $target.parent(), function () {                                                            // 1791
      $this.trigger({                                                                                                 // 1792
        type: 'shown.bs.tab'                                                                                          // 1793
      , relatedTarget: previous                                                                                       // 1794
      })                                                                                                              // 1795
    })                                                                                                                // 1796
  }                                                                                                                   // 1797
                                                                                                                      // 1798
  Tab.prototype.activate = function (element, container, callback) {                                                  // 1799
    var $active    = container.find('> .active')                                                                      // 1800
    var transition = callback                                                                                         // 1801
      && $.support.transition                                                                                         // 1802
      && $active.hasClass('fade')                                                                                     // 1803
                                                                                                                      // 1804
    function next() {                                                                                                 // 1805
      $active                                                                                                         // 1806
        .removeClass('active')                                                                                        // 1807
        .find('> .dropdown-menu > .active')                                                                           // 1808
        .removeClass('active')                                                                                        // 1809
                                                                                                                      // 1810
      element.addClass('active')                                                                                      // 1811
                                                                                                                      // 1812
      if (transition) {                                                                                               // 1813
        element[0].offsetWidth // reflow for transition                                                               // 1814
        element.addClass('in')                                                                                        // 1815
      } else {                                                                                                        // 1816
        element.removeClass('fade')                                                                                   // 1817
      }                                                                                                               // 1818
                                                                                                                      // 1819
      if (element.parent('.dropdown-menu')) {                                                                         // 1820
        element.closest('li.dropdown').addClass('active')                                                             // 1821
      }                                                                                                               // 1822
                                                                                                                      // 1823
      callback && callback()                                                                                          // 1824
    }                                                                                                                 // 1825
                                                                                                                      // 1826
    transition ?                                                                                                      // 1827
      $active                                                                                                         // 1828
        .one($.support.transition.end, next)                                                                          // 1829
        .emulateTransitionEnd(150) :                                                                                  // 1830
      next()                                                                                                          // 1831
                                                                                                                      // 1832
    $active.removeClass('in')                                                                                         // 1833
  }                                                                                                                   // 1834
                                                                                                                      // 1835
                                                                                                                      // 1836
  // TAB PLUGIN DEFINITION                                                                                            // 1837
  // =====================                                                                                            // 1838
                                                                                                                      // 1839
  var old = $.fn.tab                                                                                                  // 1840
                                                                                                                      // 1841
  $.fn.tab = function ( option ) {                                                                                    // 1842
    return this.each(function () {                                                                                    // 1843
      var $this = $(this)                                                                                             // 1844
      var data  = $this.data('bs.tab')                                                                                // 1845
                                                                                                                      // 1846
      if (!data) $this.data('bs.tab', (data = new Tab(this)))                                                         // 1847
      if (typeof option == 'string') data[option]()                                                                   // 1848
    })                                                                                                                // 1849
  }                                                                                                                   // 1850
                                                                                                                      // 1851
  $.fn.tab.Constructor = Tab                                                                                          // 1852
                                                                                                                      // 1853
                                                                                                                      // 1854
  // TAB NO CONFLICT                                                                                                  // 1855
  // ===============                                                                                                  // 1856
                                                                                                                      // 1857
  $.fn.tab.noConflict = function () {                                                                                 // 1858
    $.fn.tab = old                                                                                                    // 1859
    return this                                                                                                       // 1860
  }                                                                                                                   // 1861
                                                                                                                      // 1862
                                                                                                                      // 1863
  // TAB DATA-API                                                                                                     // 1864
  // ============                                                                                                     // 1865
                                                                                                                      // 1866
  $(document).on('click.bs.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {                 // 1867
    e.preventDefault()                                                                                                // 1868
    $(this).tab('show')                                                                                               // 1869
  })                                                                                                                  // 1870
                                                                                                                      // 1871
}(window.jQuery);                                                                                                     // 1872
                                                                                                                      // 1873
/* ========================================================================                                           // 1874
 * Bootstrap: affix.js v3.0.0                                                                                         // 1875
 * http://twbs.github.com/bootstrap/javascript.html#affix                                                             // 1876
 * ========================================================================                                           // 1877
 * Copyright 2012 Twitter, Inc.                                                                                       // 1878
 *                                                                                                                    // 1879
 * Licensed under the Apache License, Version 2.0 (the "License");                                                    // 1880
 * you may not use this file except in compliance with the License.                                                   // 1881
 * You may obtain a copy of the License at                                                                            // 1882
 *                                                                                                                    // 1883
 * http://www.apache.org/licenses/LICENSE-2.0                                                                         // 1884
 *                                                                                                                    // 1885
 * Unless required by applicable law or agreed to in writing, software                                                // 1886
 * distributed under the License is distributed on an "AS IS" BASIS,                                                  // 1887
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.                                           // 1888
 * See the License for the specific language governing permissions and                                                // 1889
 * limitations under the License.                                                                                     // 1890
 * ======================================================================== */                                        // 1891
                                                                                                                      // 1892
                                                                                                                      // 1893
+function ($) { "use strict";                                                                                         // 1894
                                                                                                                      // 1895
  // AFFIX CLASS DEFINITION                                                                                           // 1896
  // ======================                                                                                           // 1897
                                                                                                                      // 1898
  var Affix = function (element, options) {                                                                           // 1899
    this.options = $.extend({}, Affix.DEFAULTS, options)                                                              // 1900
    this.$window = $(window)                                                                                          // 1901
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))                                              // 1902
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))                                 // 1903
                                                                                                                      // 1904
    this.$element = $(element)                                                                                        // 1905
    this.affixed  =                                                                                                   // 1906
    this.unpin    = null                                                                                              // 1907
                                                                                                                      // 1908
    this.checkPosition()                                                                                              // 1909
  }                                                                                                                   // 1910
                                                                                                                      // 1911
  Affix.RESET = 'affix affix-top affix-bottom'                                                                        // 1912
                                                                                                                      // 1913
  Affix.DEFAULTS = {                                                                                                  // 1914
    offset: 0                                                                                                         // 1915
  }                                                                                                                   // 1916
                                                                                                                      // 1917
  Affix.prototype.checkPositionWithEventLoop = function () {                                                          // 1918
    setTimeout($.proxy(this.checkPosition, this), 1)                                                                  // 1919
  }                                                                                                                   // 1920
                                                                                                                      // 1921
  Affix.prototype.checkPosition = function () {                                                                       // 1922
    if (!this.$element.is(':visible')) return                                                                         // 1923
                                                                                                                      // 1924
    var scrollHeight = $(document).height()                                                                           // 1925
    var scrollTop    = this.$window.scrollTop()                                                                       // 1926
    var position     = this.$element.offset()                                                                         // 1927
    var offset       = this.options.offset                                                                            // 1928
    var offsetTop    = offset.top                                                                                     // 1929
    var offsetBottom = offset.bottom                                                                                  // 1930
                                                                                                                      // 1931
    if (typeof offset != 'object')         offsetBottom = offsetTop = offset                                          // 1932
    if (typeof offsetTop == 'function')    offsetTop    = offset.top()                                                // 1933
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom()                                             // 1934
                                                                                                                      // 1935
    var affix = this.unpin   != null && (scrollTop + this.unpin <= position.top) ? false :                            // 1936
                offsetBottom != null && (position.top + this.$element.height() >= scrollHeight - offsetBottom) ? 'bottom' :
                offsetTop    != null && (scrollTop <= offsetTop) ? 'top' : false                                      // 1938
                                                                                                                      // 1939
    if (this.affixed === affix) return                                                                                // 1940
    if (this.unpin) this.$element.css('top', '')                                                                      // 1941
                                                                                                                      // 1942
    this.affixed = affix                                                                                              // 1943
    this.unpin   = affix == 'bottom' ? position.top - scrollTop : null                                                // 1944
                                                                                                                      // 1945
    this.$element.removeClass(Affix.RESET).addClass('affix' + (affix ? '-' + affix : ''))                             // 1946
                                                                                                                      // 1947
    if (affix == 'bottom') {                                                                                          // 1948
      this.$element.offset({ top: document.body.offsetHeight - offsetBottom - this.$element.height() })               // 1949
    }                                                                                                                 // 1950
  }                                                                                                                   // 1951
                                                                                                                      // 1952
                                                                                                                      // 1953
  // AFFIX PLUGIN DEFINITION                                                                                          // 1954
  // =======================                                                                                          // 1955
                                                                                                                      // 1956
  var old = $.fn.affix                                                                                                // 1957
                                                                                                                      // 1958
  $.fn.affix = function (option) {                                                                                    // 1959
    return this.each(function () {                                                                                    // 1960
      var $this   = $(this)                                                                                           // 1961
      var data    = $this.data('bs.affix')                                                                            // 1962
      var options = typeof option == 'object' && option                                                               // 1963
                                                                                                                      // 1964
      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))                                            // 1965
      if (typeof option == 'string') data[option]()                                                                   // 1966
    })                                                                                                                // 1967
  }                                                                                                                   // 1968
                                                                                                                      // 1969
  $.fn.affix.Constructor = Affix                                                                                      // 1970
                                                                                                                      // 1971
                                                                                                                      // 1972
  // AFFIX NO CONFLICT                                                                                                // 1973
  // =================                                                                                                // 1974
                                                                                                                      // 1975
  $.fn.affix.noConflict = function () {                                                                               // 1976
    $.fn.affix = old                                                                                                  // 1977
    return this                                                                                                       // 1978
  }                                                                                                                   // 1979
                                                                                                                      // 1980
                                                                                                                      // 1981
  // AFFIX DATA-API                                                                                                   // 1982
  // ==============                                                                                                   // 1983
                                                                                                                      // 1984
  $(window).on('load', function () {                                                                                  // 1985
    $('[data-spy="affix"]').each(function () {                                                                        // 1986
      var $spy = $(this)                                                                                              // 1987
      var data = $spy.data()                                                                                          // 1988
                                                                                                                      // 1989
      data.offset = data.offset || {}                                                                                 // 1990
                                                                                                                      // 1991
      if (data.offsetBottom) data.offset.bottom = data.offsetBottom                                                   // 1992
      if (data.offsetTop)    data.offset.top    = data.offsetTop                                                      // 1993
                                                                                                                      // 1994
      $spy.affix(data)                                                                                                // 1995
    })                                                                                                                // 1996
  })                                                                                                                  // 1997
                                                                                                                      // 1998
}(window.jQuery);                                                                                                     // 1999
                                                                                                                      // 2000
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['bootstrap-3'] = {};

})();

//# sourceMappingURL=617cd1a602aa29de9ea1ef12f80e366b18bbc755.map
