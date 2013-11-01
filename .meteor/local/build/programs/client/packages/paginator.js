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
var _ = Package.underscore._;
var Template = Package.templating.Template;
var Spark = Package.spark.Spark;

/* Package-scope variables */
var p;

(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// packages/paginator/lib/client/meteor.paginator.js                                                        //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
Meteor.Paginator = function(_opts) {                                                                        // 1
                                                                                                            // 2
	var opts = {                                                                                               // 3
		templates: {                                                                                              // 4
	        content: null                                                                                      // 5
		}                                                                                                         // 6
		, pagination: {                                                                                           // 7
			currentPage: 0                                                                                           // 8
			, resultsPerPage: 5                                                                                      // 9
			, totalRecords: 0                                                                                        // 10
			, totalPages: 0                                                                                          // 11
		}                                                                                                         // 12
		, callbacks: {                                                                                            // 13
			onPagingCompleted: null                                                                                  // 14
			, getDependentSubscriptionsHandles: null                                                                 // 15
			, getTotalRecords: null                                                                                  // 16
			, onDataLoading: null                                                                                    // 17
			, onTemplateRendered: null                                                                               // 18
			, onTemplateCreated: null                                                                                // 19
			, onTemplateDestroyed: null                                                                              // 20
			, onResultsPerPageChanged: null                                                                          // 21
		}                                                                                                         // 22
	};                                                                                                         // 23
                                                                                                            // 24
	_.extend(opts, _opts);                                                                                     // 25
                                                                                                            // 26
	var _self = this                                                                                           // 27
		, _instance = Random.id()                                                                                 // 28
		, _sessionMultiplePages = opts.templates.content+'__hasMultiplePages'                                     // 29
		, _sessionButtons = opts.templates.content+"__sessionButtons"                                             // 30
		, _sessionRPP = opts.templates.content+"__resultsPerPage";                                                // 31
                                                                                                            // 32
	var _setPaging = function(ele) {                                                                           // 33
		var _scheduledPage = opts.pagination.currentPage;                                                         // 34
		$(".pageButton[data-instance-id='" + ele.attr("data-instance-id") + "']").each(function() { $(this).parent().removeClass("active").removeClass("disabled"); });
		switch (ele.attr("data-page")) {                                                                          // 36
			case "next":                                                                                             // 37
				_scheduledPage++;                                                                                       // 38
				break;                                                                                                  // 39
			case "back":                                                                                             // 40
				_scheduledPage--;                                                                                       // 41
				break;                                                                                                  // 42
			case "first":                                                                                            // 43
				_scheduledPage = 0;                                                                                     // 44
				break;                                                                                                  // 45
			case "last":                                                                                             // 46
				_scheduledPage = opts.pagination.totalPages - 1;                                                        // 47
				break;                                                                                                  // 48
			default:                                                                                                 // 49
				_scheduledPage = parseInt(ele.attr("data-page")) || 0; //zero if pagination is missing                  // 50
				break;                                                                                                  // 51
		}                                                                                                         // 52
		                                                                                                          // 53
		if (opts.pagination.currentPage !== _scheduledPage) {                                                     // 54
    		opts.pagination.currentPage = _scheduledPage;                                                         // 55
    		var skip = _scheduledPage * opts.pagination.resultsPerPage, limit = opts.pagination.resultsPerPage;   // 56
    		opts.callbacks.onPagingCompleted && opts.callbacks.onPagingCompleted(skip, limit);                    // 57
			_setPagination();                                                                                        // 58
			_setBtnStyles();                                                                                         // 59
		}                                                                                                         // 60
	};                                                                                                         // 61
                                                                                                            // 62
	var _setPagination = function() {                                                                          // 63
		opts.pagination.totalPages = Math.ceil(opts.pagination.totalRecords/opts.pagination.resultsPerPage);      // 64
		var _btns = [], _max = Math.min(parseInt($(window).width()/140), 10);                                     // 65
                                                                                                            // 66
		while (_max % 2 !== 0 && _max < opts.pagination.totalPages)                                               // 67
			_max++;                                                                                                  // 68
                                                                                                            // 69
		if (opts.pagination.totalPages > _max) {                                                                  // 70
			var _start = opts.pagination.currentPage > _max/2 ? opts.pagination.currentPage - _max/2 : 0;            // 71
			if (_start > opts.pagination.totalPages - _max) _start = opts.pagination.totalPages - _max;              // 72
			for(p = _start; p < _start + _max; p++) {                                                                // 73
	    		_btns.push({r: p, p: p + 1});                                                                        // 74
	    	}                                                                                                     // 75
		} else {                                                                                                  // 76
	    	for(p = 0; p < opts.pagination.totalPages; p++) {                                                     // 77
	    		_btns.push({r: p, p: p + 1});                                                                        // 78
	    	}                                                                                                     // 79
    	}                                                                                                      // 80
		                                                                                                          // 81
    	Session.set(_sessionMultiplePages, opts.pagination.totalPages);                                        // 82
    	Session.set(_sessionButtons, _btns);                                                                   // 83
	};                                                                                                         // 84
                                                                                                            // 85
	var _resizer;                                                                                              // 86
	var _init = function() {                                                                                   // 87
		opts.callbacks.getTotalRecords(function(tot) {                                                            // 88
			opts.pagination.totalRecords = tot;                                                                      // 89
			_setPagination();                                                                                        // 90
		});                                                                                                       // 91
	};                                                                                                         // 92
                                                                                                            // 93
	_self.refreshPagination = function(rpp) {                                                                  // 94
		opts.pagination.currentPage = 0;                                                                          // 95
		if (rpp) opts.pagination.resultsPerPage = rpp;                                                            // 96
		opts.callbacks.getTotalRecords(function(tot) {                                                            // 97
			opts.pagination.totalRecords = tot;                                                                      // 98
			_setPagination();                                                                                        // 99
			opts.callbacks.onPagingCompleted && opts.callbacks.onPagingCompleted(0, opts.pagination.resultsPerPage); // 100
		});                                                                                                       // 101
	};                                                                                                         // 102
                                                                                                            // 103
	var _subWatchers = [];                                                                                     // 104
	Template[opts.templates.content].created = function() {                                                    // 105
    	var _autorun = window.setInterval(function() {                                                         // 106
			var _dependentSubscriptions = opts.callbacks.getDependentSubscriptionsHandles();                         // 107
    		var _allReady = _.every(_dependentSubscriptions, function(s) { return s.ready() === true; });         // 108
	    	if (_allReady) {                                                                                      // 109
    			window.clearInterval(_autorun);                                                                      // 110
				opts.callbacks.onTemplateCreated && opts.callbacks.onTemplateCreated();                                 // 111
	    		_init();                                                                                             // 112
	    	}                                                                                                     // 113
	    }, 250);                                                                                               // 114
	};                                                                                                         // 115
                                                                                                            // 116
	Template[opts.templates.content].paginationButtons = function() {                                          // 117
		return Template.pagination_buttons({ instance: _instance, hasMultiplePages: Session.get(_sessionMultiplePages) > 1, pageButton: Session.get(_sessionButtons) });
	};                                                                                                         // 119
                                                                                                            // 120
	Template[opts.templates.content].selectPerPage = function() {                                              // 121
		return Template.select_per_page({ instance: _instance });                                                 // 122
	};                                                                                                         // 123
                                                                                                            // 124
	Template[opts.templates.content].destroyed = function() {                                                  // 125
		opts.callbacks.onTemplateDestroyed && opts.callbacks.onTemplateDestroyed();                               // 126
		setTimeout(function() {	                                                                                  // 127
			delete Session.keys[_sessionMultiplePages];                                                              // 128
			delete Session.keys[_sessionButtons];                                                                    // 129
			delete _self;                                                                                            // 130
		}, 0); //self destruct                                                                                    // 131
	};                                                                                                         // 132
                                                                                                            // 133
	var _doneRendering;                                                                                        // 134
	Template[opts.templates.content].rendered = function() {                                                   // 135
                                                                                                            // 136
		window.clearTimeout(_doneRendering);                                                                      // 137
		var s = this;                                                                                             // 138
                                                                                                            // 139
		opts.callbacks.onDataLoading &&  opts.callbacks.onDataLoading(s);                                         // 140
                                                                                                            // 141
		_doneRendering = window.setTimeout(function() {                                                           // 142
                                                                                                            // 143
			//do all the event binding                                                                               // 144
			$("#selectPerPage[data-instance-id='" + _instance + "']").unbind();                                      // 145
			$("#selectPerPage[data-instance-id='" + _instance + "']").change(function() {                            // 146
				var _rpp = parseInt($(this).val());                                                                     // 147
				console.log("changing rpp ", _rpp);                                                                     // 148
				opts.callbacks.onResultsPerPageChanged && opts.callbacks.onResultsPerPageChanged(_rpp);                 // 149
				_self.refreshPagination(_rpp);                                                                          // 150
			});                                                                                                      // 151
                                                                                                            // 152
			$(".pageButton[data-instance-id='" + _instance + "']").unbind();                                         // 153
			$(".pageButton[data-instance-id='" + _instance + "']").click(function() {                                // 154
				if (!$(this).parent().hasClass("disabled") && !$(this).parent().hasClass("active")) {                   // 155
					console.log("changing page ", $(this));                                                                // 156
					_setPaging($(this));                                                                                   // 157
				}                                                                                                       // 158
			});                                                                                                      // 159
			                                                                                                         // 160
			_setBtnStyles();                                                                                         // 161
                                                                                                            // 162
			$("#selectPerPage[data-instance-id='" + _instance + "']").val(opts.pagination.resultsPerPage + "");      // 163
                                                                                                            // 164
			opts.callbacks.onTemplateRendered &&  opts.callbacks.onTemplateRendered(s);                              // 165
                                                                                                            // 166
		}, 250);                                                                                                  // 167
	};                                                                                                         // 168
                                                                                                            // 169
	function _setBtnStyles() {                                                                                 // 170
		if (typeof opts.pagination.currentPage === 'undefined') opts.pagination.currentPage = 0;                  // 171
		var _base = ".pageButton[data-instance-id='" + _instance + "']";                                          // 172
		if (opts.pagination.currentPage === (opts.pagination.totalPages - 1)) {                                   // 173
			$(_base + "[data-page='next']").parent().addClass("disabled");                                           // 174
			$(_base + "[data-page='last']").parent().addClass("disabled");                                           // 175
		} else if (opts.pagination.currentPage === 0) {                                                           // 176
			$(_base + "[data-page='back']").parent().addClass("disabled");                                           // 177
			$(_base + "[data-page='first']").parent().addClass("disabled");                                          // 178
		}                                                                                                         // 179
		$(_base + "[data-page='" + opts.pagination.currentPage + "']").parent().addClass("active");               // 180
	};                                                                                                         // 181
                                                                                                            // 182
	var _resetPagination;                                                                                      // 183
	$(window).bind("resize", function(e) {                                                                     // 184
		window.clearTimeout(_resetPagination);                                                                    // 185
		_resetPagination = window.setTimeout(function() {                                                         // 186
			_setPagination();                                                                                        // 187
		}, 250);                                                                                                  // 188
	});                                                                                                        // 189
                                                                                                            // 190
	return _self;                                                                                              // 191
};                                                                                                          // 192
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// packages/paginator/lib/client/template.paginationTemplates.js                                            //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
Template.__define__("pagination_buttons",Package.handlebars.Handlebars.json_ast_to_func([["#",[[0,"if"],[0,"hasMultiplePages"]],["\r\n\t\t<div class=\"pagination pagination-button-container\">\r\n\t\t\t<ul>\r\n\t\t\t\t<li><a href=\"javascript:\" data-page=\"first\" class=\"pageButton\" data-instance-id=\"",["{",[[0,"instance"]]],"\">&laquo;&laquo;</a></li>\r\n\t\t\t\t<li><a href=\"javascript:\" data-page=\"back\" class=\"pageButton\" data-instance-id=\"",["{",[[0,"instance"]]],"\">&laquo;</a></li>\r\n\t\t\t\t",["#",[[0,"each"],[0,"pageButton"]],["\r\n\t\t\t\t\t<li><a href=\"javascript:\" data-page=\"",["{",[[0,"r"]]],"\" class=\"pageButton\" data-instance-id=\"",["{",[[1,"instance"]]],"\">",["{",[[0,"p"]]],"</a></li>\r\n\t\t\t\t"]],"\r\n\t\t\t\t<li><a href=\"javascript:\" data-page=\"next\" class=\"pageButton\" data-instance-id=\"",["{",[[0,"instance"]]],"\">&raquo;</a></li>\r\n\t\t\t\t<li><a href=\"javascript:\" data-page=\"last\" class=\"pageButton\" data-instance-id=\"",["{",[[0,"instance"]]],"\">&raquo;&raquo;</a></li>\r\n\t\t\t</ul>\r\n\t\t</div>\r\n\t"]]]));
Template.__define__("select_per_page",Package.handlebars.Handlebars.json_ast_to_func(["<select id=\"selectPerPage\" class=\"input-mini\" style='font-size:10pt;' data-instance-id=\"",["{",[[0,"instance"]]],"\">\r\n   \t\t<option value=\"5\">5</option>\r\n   \t\t<option value=\"10\">10</option>\r\n   \t\t<option value=\"20\">20</option>\r\n   \t\t<option value=\"30\">30</option>\r\n\t</select>"]));
                                                                                                            // 3
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package.paginator = {};

})();

//# sourceMappingURL=dab49e4d7af9c0c38a7da58a79e1fc41fe5e7fb1.map
