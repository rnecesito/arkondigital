(function(){Template.application_form.rendered = function(){
	$(function(){
	    $(".copyright-file").hover(function(){
	      $(this).find(".hover-step").fadeIn();
	    }
	    ,function(){
	        $(this).find(".hover-step").fadeOut();
	    });        
	});
	if(Meteor.user()){
		Meteor.call("checkYT2", Meteor.user().services.google.accessToken, function(error,results){
			var jsondecoded = json_decode(results.content);
			console.log(jsondecoded);
			$('#channel_id').val(jsondecoded.items[0].id);
			$('#yt_channel_name').val(jsondecoded.items[0].snippet.title);
			$('#yt_channel_name2').html(jsondecoded.items[0].snippet.title);
	    	$('#yt_daily_views').val(jsondecoded.items[0].statistics.viewCount);
	    	$('#yt_daily_views2').html(jsondecoded.items[0].statistics.viewCount);
	    	$('#yt_total_views').val(jsondecoded.items[0].statistics.viewCount);
	    	$('#yt_total_views2').html(jsondecoded.items[0].statistics.viewCount);
	    	$('#yt_subscribers').val(jsondecoded.items[0].statistics.subscriberCount);
	    	$('#yt_subscribers2').html(jsondecoded.items[0].statistics.subscriberCount);
	    	$('#cr_status').val(jsondecoded.items[0].auditDetails.overallGoodStanding);
	    	// if(jsondecoded.items[0].auditDetails.overallGoodStanding === true){
	    	// 	$('.cr-status').val("In Good Standing");
	    	// }else{
	    	// 	$('.cr-status').val("Not In Good Standing");
	    	// }
		});
		Meteor.call("getInfo", Meteor.user().services.google.id, Meteor.user().services.google.accessToken, function(error,results){
			var jsondecoded = json_decode(results.content);
			console.log(jsondecoded);
		})
	}
}

// Template.application_form.events({
Template.partnership.events({
	'click #gplusconnect': function(e,t){
		Meteor.loginWithGoogle({
			requestPermissions: ['profile', 'email', 'https://www.googleapis.com/auth/yt-analytics.readonly', 'https://www.googleapis.com/auth/youtube', 'https://www.googleapis.com/auth/youtube.readonly' , 'https://www.googleapis.com/auth/youtubepartner', 'https://www.googleapis.com/auth/youtubepartner-channel-audit', 'https://www.googleapis.com/auth/plus.me', 'https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email','https://www.googleapis.com/auth/plus.login']
		});

	},
	'click .logoutButton': function(e,t){
		Meteor.logout(function(err){
			if(err){

			}else{

			}
		});
	},
	'click .getYouTubeData':function(e,t){
		Meteor.call("checkYT2", Meteor.user().services.google.accessToken, function(error,results){
			var jsondecoded = json_decode(results.content);
			console.log(jsondecoded);
		});
	},
	'click .submitbutton': function(e,t){
		form = {};

		if(!$('#yt_age').val()){
			console.log("NO VALUE for age");
		}else if(!$('#yt_country').val()){
			console.log("NO VALUE cty");
		}else if(!$('#skype_email').val()){
			console.log("NO VALUE skype");
		}else if(!$('#paypal_email').val()){
			console.log("NO VALUE paypal_email");
		}else if(!$('#copyright_status_link').val()){
			console.log("NO VALUE copyright_status_link");
		}else if(!$('#music_permissions').val()){
			console.log("NO VALUE music_permissions");
		}else if($('#yt_age').val()&&$('#yt_country').val()&&$('#paypal_email').val()&&$('#skype_email').val()&&$('#copyright_status_link').val()&&$('#music_permissions').val()){
			$.each( $("#app_form1").serializeArray(),function(){
				form[this.name] = this.value;
			});
			form['status'] = "Applied";

			applications.insert( form, function(err){
				if(err){
					if(err.error === 403){
						
					}else{
						alert("Something went wrong. Please try again.");
						console.log(err);
					}

				}
				else{
					$('#app_form1')[0].reset();
					alert("Congratulations! You have successfully applied!");
					// Meteor.logout();
					// Router.go('index');
				}
			});
		}
	}
});

Template.application_form.helpers({
	youtubeUser: function(){
		if(Meteor.users.findOne() != null){
			return Meteor.users.findOne()
		}
	},
	youtubeInfo: function(email){

	}
});

Template.index.events({
	'click .YT-button': function(e,t){
		alert("Bogo");
		Meteor.loginWithGoogle({
			requestPermissions: ['profile', 'email', 'https://www.googleapis.com/auth/yt-analytics.readonly', 'https://www.googleapis.com/auth/youtube', 'https://www.googleapis.com/auth/youtube.readonly' , 'https://www.googleapis.com/auth/youtubepartner', 'https://www.googleapis.com/auth/youtubepartner-channel-audit', 'https://www.googleapis.com/auth/plus.me','https://www.googleapis.com/auth/plus.login']
		}, function(err){

			
		});
		if (Meteor.user()) {
		
		};

			$('#application-modal-form').modal('show');
	},



	


});

Template.index.rendered = function(){

}

Template.navbarmain.events({
	'click #partnership-nav': function(e,t){
		Meteor.loginWithGoogle({
			requestPermissions: ['profile', 'email', 'https://www.googleapis.com/auth/yt-analytics.readonly', 'https://www.googleapis.com/auth/youtube', 'https://www.googleapis.com/auth/youtube.readonly' , 'https://www.googleapis.com/auth/youtubepartner', 'https://www.googleapis.com/auth/youtubepartner-channel-audit', 'https://www.googleapis.com/auth/plus.me','https://www.googleapis.com/auth/plus.login']
		}, function(status){
			console.log(status);

				if(Meteor.user()){
					Meteor.call("checkYT2", Meteor.user().services.google.accessToken, function(error,results){
						var jsondecoded = json_decode(results.content);
						console.log(jsondecoded);
						$('#yt_channel_id').val(jsondecoded.items[0].id);
						$('#yt_channel_name').val(jsondecoded.items[0].snippet.title);
						$('#yt_channel_name2').html(jsondecoded.items[0].snippet.title);
				    	$('#yt_channel_daily_views').val(jsondecoded.items[0].statistics.viewCount);
				    	$('#yt_daily_views2').html(jsondecoded.items[0].statistics.viewCount);
				    	$('#yt_channel_total_views').val(jsondecoded.items[0].statistics.viewCount);
				    	$('#yt_total_views2').html(jsondecoded.items[0].statistics.viewCount);
				    	$('#yt_channel_subscribers').val(jsondecoded.items[0].statistics.subscriberCount);
				    	$('#yt_subscribers2').html(jsondecoded.items[0].statistics.subscriberCount);
				    	$('#cr_status').val(jsondecoded.items[0].auditDetails.overallGoodStanding);
				    	$('#youtube_btn_container').addClass('hidden-div-container');
				    	$(".container-youtube-stats").removeClass('hidden-div-container');
				    	// if(jsondecoded.items[0].auditDetails.overallGoodStanding === true){
				    	// 	$('.cr-status').val("In Good Standing");
				    	// }else{
				    	// 	$('.cr-status').val("Not In Good Standing");
				    	// }
					});
					Meteor.call("getInfo", Meteor.user().services.google.id, Meteor.user().services.google.accessToken, function(error,results){
						var jsondecoded = json_decode(results.content);
						console.log(jsondecoded);
					})
				}	
				if(status)
				{
					alert("dawd");
					$('#application-modal-form').modal('show');
				
				}
				else
				{	
					alert("Hide");
					$('#application-modal-form').modal('hide');
				}
			
		});
	}
});

Template.partnership.events({
	'click #YTconnect-apply': function(e,t){
		Meteor.loginWithGoogle({
			requestPermissions: ['profile', 'email', 'https://www.googleapis.com/auth/yt-analytics.readonly', 'https://www.googleapis.com/auth/youtube', 'https://www.googleapis.com/auth/youtube.readonly' , 'https://www.googleapis.com/auth/youtubepartner', 'https://www.googleapis.com/auth/youtubepartner-channel-audit', 'https://www.googleapis.com/auth/plus.me','https://www.googleapis.com/auth/plus.login']
		});
		if (Meteor.user()) {

		};
	}
});

function json_decode (str_json) {	
	var json = this.window.JSON;
	if (typeof json === 'object' && typeof json.parse === 'function') {
		try {
			return json.parse(str_json);
		} catch (err) {
			if (!(err instanceof SyntaxError)) {
				throw new Error('Unexpected error type in json_decode()');
			}
		this.php_js = this.php_js || {};
		this.php_js.last_error_json = 4; // usable by json_last_error()
		return null;
		}
	}

	var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
	var j;
	var text = str_json;

	cx.lastIndex = 0;
	if (cx.test(text)) {
		text = text.replace(cx, function (a) {
		return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
		});
	}

	if ((/^[\],:{}\s]*$/).
		test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').
		replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
		replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

		j = eval('(' + text + ')');

		return j;
	}

	this.php_js = this.php_js || {};
		this.php_jslast_error_json = 4; // usable by json_last_error()
		return null;
}

})();
