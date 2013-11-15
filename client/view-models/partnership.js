Template.partnership.rendered = function(){
	Session.set('page', 'partnership');
	var page = Session.get('page');
	console.log(page);
	$('.menu-li').removeClass('active');
	$('#'+page).addClass("active");

	
	$("#yt_age").change(function(){
		var applicant_age = $("#yt_age").attr("value");
		if(applicant_age < 18){
			$('#form-parents-container').removeClass('hidden-div-container');
		}else{
			$('#form-parents-container').addClass('hidden-div-container');
		}
	});

	$("#personal-btn").click(function(){


		var daily_views = $("#yt_daily_views2").text();
		var total_views = $("#yt_total_views2").text();
		var subscribers = $("#yt_subscribers2").text();
		var copyright = $("#cr_status").attr("value");

		if(daily_views >= 100 && total_views >= 100 && subscribers >= 1 && copyright)
		{
			
			$(".container-youtube-stats").addClass('hidden-div-container');
			$(".container-personal-info").removeClass('hidden-div-container');	
					
		}
		else
		{
			$(".container-youtube-stats").addClass('hidden-div-container');
			$(".container-denied").removeClass('hidden-div-container');								
		}
	
	})

	$('#agree-check').click(function () {
   	 var x = $(this).attr("checked");
   	 	if(x == 'checked')
   	 	{
   	 		$('.btn-ok').removeClass('hidden-div-container');
   	 	}else{
   	 		$('.btn-ok').addClass('hidden-div-container');
   	 	}
	});

	$("#confirm-btn").click(function(){
		alert("Thank you for applying to be our partner. Our staff will contact you soon!");
		Meteor.logout();
		window.location.replace("http://arkondigital.meteor.com/");

	})

	$("#personal-btn2").click(function(){
		
		var channel = $("#yt_channel_name2").text();
		var daily_views = $("#yt_daily_views2").text();
		var total_views = $("#yt_total_views2").text();
		var subscribers = $("#yt_subscribers2").text();
		var profile = $("#profile-google").text();
		var age = $("#yt_age").attr("value");
		var residence = $("#countries").attr("value");
		var firstname = $("#parent_firstname").attr("value");
		var lastname = $("#parent_lastname").attr("value");
		var phone = $("#parent_phone").attr("value");
		var copyright = $("#cr_status").attr("value");
		var paypal = $("#paypal").attr("value");
		

		if(!$("#yt_age").val())
		{
			$("#yt_age").focus();
		}else
		{

			if(age < 18)
			{
				if($("#yt_country").val())
				{

				if($("#paypal").val()){
					if(!$("#countries").val())
					{
						$("#countries").focus();	
					}
					else
					{
						
						if(!$("#parent_firstname").val())
						{
							$("#parent_firstname").focus();
						}
						else
						{
							if(!$("#parent_lastname").val())
							{
								$("#parent_lastname").focus();
							}
							else
							{
								if(!$("#parent_phone").val())
								{
									$("#parent_phone").focus();
								}
								else
								{
									$(".container-personal-info").addClass('hidden-div-container');
									$('.container-accepted ').removeClass('hidden-div-container');
									$("#fname").attr("value",channel);
									$("#fmail").attr("value",profile);
									$("#fpaypal").attr("value",paypal);
									$("#fyt").attr("value",profile);
									$("#fytc").attr("value", channel);
								}
							}
						}
					}
				}else{
					$("#paypal").focus();
				}
			}
			else
			{
				if(!$("#paypal").val()){
					$("#paypal").focus();
				}else{
					if(!$("#countries").val())
					{
						$("#countries").focus();
					}
					else
					{
						$(".container-personal-info").addClass('hidden-div-container');
						$('.container-accepted ').removeClass('hidden-div-container');
							$("#fname").attr("value", channel);
							$("#fmail").attr("value",profile);
							$("#fpaypal").attr("value",paypal);
							$("#fyt").attr("value",profile);
							$("#fytc").attr("value",channel);
					}
				}
			}
			
		}
		}
	})

	$(function(){
	    $(".copyright-file").hover(function(){
	      $(this).find(".hover-step").fadeIn();
	    }
	    ,function(){
	        $(this).find(".hover-step").fadeOut();
	    });        
	});

	if(Meteor.user()){
		var channel_id;
		Meteor.call("checkYT2", Meteor.user().services.google.accessToken, function(error,results){
			var jsondecoded = json_decode(results.content);
			console.log(jsondecoded);
			channel_id = jsondecoded.items[0].id;
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
		});
		
	}
}

Template.partnership.events({
	'click #gplusconnect': function(e,t){
		Meteor.loginWithGoogle({
			requestPermissions: ['profile', 'email', 'https://www.googleapis.com/auth/yt-analytics.readonly', 'https://www.googleapis.com/auth/youtube', 'https://www.googleapis.com/auth/youtube.readonly' , 'https://www.googleapis.com/auth/youtubepartner', 'https://www.googleapis.com/auth/youtubepartner-channel-audit', 'https://www.googleapis.com/auth/plus.me']
		});
	},
	'click .logoutgplus': function(e,t){
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
	'submit': function(e,t){
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
		}else{
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
					Meteor.logout();
				}
			});
		}
	}
});

Template.index.rendered = function(){
/*	$("#partnership").click(function(){
		$('#application-modal-form').modal('show');
	});	*/

	$(document).on('click', '.first-step', function(){
		var daily_views = $("#yt_daily_views2").attr("value");
		var total_views = $("#yt_total_views2").attr("value");
		var subscribers = $("#yt_subscribers2").attr("value");
		var copyright = $("#cr_status").attr("value");
		/*setTimeout('wda',1000);*/
		setTimeout(function(){
			setTimeout(function(){
				$('div.progress-bar').width('10%');
			},2000);
			setTimeout(function(){
				$('div.progress-bar').width('20%');
			},3000);
			setTimeout(function(){
				$('div.progress-bar').width('30%');
			},3000);
			setTimeout(function(){
				$('div.progress-bar').width('40%');
			},1000);
			setTimeout(function(){
				$('div.progress-bar').width('50%');
			},2000);
			setTimeout(function(){
				$('div.progress-bar').width('60%');
			},1000);
			setTimeout(function(){
				$('div.progress-bar').width('70%');
			},2000);
			setTimeout(function(){
				$('div.progress-bar').width('80%');
			},1000);
			setTimeout(function(){
				$('div.progress-bar').width('90%');
			},2000);
			setTimeout(function(){
				$('div.progress-bar').width('100%');
			},3000);
			$(".yt-stats-container").addClass('hidden-div-container');
			$(".loading").removeClass('hidden-div-container');
			
			$(".step-tab-container").children().eq(0).removeClass("step-tab-active");
			$(".step-tab-container").children().eq(1).addClass("step-tab-active");	
		}, 1000);

		setTimeout(function(){

			if(daily_views >= 2 && total_views >= 100 && subscribers >= 1 && copyright)
			{
				$(".loading").addClass('hidden-div-container');
				$(".container-personal-info").removeClass('hidden-div-container');
				$(".step-tab-container").children().eq(1).removeClass("step-tab-active");	
				$(".step-tab-container").children().eq(2).addClass("step-tab-active");	
				$("#next-tab-btn").removeClass('first-step');
				$("#next-tab-btn").addClass('second-step');
			}
			else
			{
					
				$(".container-denied").removeClass('hidden-div-container');
				$(".loading").addClass('hidden-div-container');
				$(".step-tab-container").children().eq(1).addClass("step-tab-active");	
				
				$("#next-tab-btn").removeClass('first-step');
				$("#next-tab-btn").addClass('hidden-div-container');
			}

		},5000);
	

	});
	
	$( "#personal-birthdate" ).datepicker({
      changeMonth: true,
      changeYear: true
    });

	$(document).on('click', '.second-step', function(){

   
		var firstname = $("#firstname").attr("value");

		if(!$("#firstname").val())
		{
			$("#firstname").focus();
		}
		else
		{
			
			if(!$("#lastname").val())
			{
				$("#lastname").focus();
			}
			else
			{
				if(!$("#countries").val()){
					$("#countries").focus();	
				}
				else
				{
					if(!$("#city").val()){
						$("#city").focus();
					}
					else
					{
						if(!$("#province").val()){
							$("#province").focus();
						}
						else
						{
							if(!$("#personal-no").val()){
								$("#personal-no").focus();
							}
							else
							{
								if(!$("#birth-month").val()){
									$("#birth-month").focus();
								}
								else
								{
									if(!$("#birth-day").val())
									{
										$("#birth-day").focus();
									}
									else
									{
										if(!$("#birth-year").val())
										{
											$("#birth-year").focus();
										}
										else
										{
											var month = $("#birth-month").val();
											var day = $("#birth-day").val();
											var year = $("#birth-year").val();
											var bdate = year + '-' + month + '-' + day;
											var Bdate   = new Date(bdate.split("-").reverse().join('-')),
    											age     = parseInt( ( (new Date() - Bdate) / 1000 / (60 * 60 * 24) ) / 365.25 ) || 0;
    										/*	age     = Math.floor( ( (new Date() - Bdate) / 1000 / (60 * 60 * 24) ) / 365.25 );*/
    										
    											console.log(age);
    										if(age < 18)
    										{
    											$(".minor").removeClass('hidden-div-container');
    											if(!$("#parent-firstname").val())
    											{
    												$("#parent-firstname").focus();	
    											}
    											else
    											{
    												if(!$("#parent-lastname").val())
    												{
    													$("#parent-firstname").focus();	
    												}
    												else
    												{
    													if(!$("#parent-email").val())
    													{
    														$("#parent-email").focus();
    													}
    													else
    													{
    														if(!$("#parent-no").val())
    														{
    															$("#parent-no").focus()
    														}
    														else
    														{
    															$(".step-tab-container").children().eq(2).removeClass("step-tab-active");
														    	$(".step-tab-container").children().eq(3).addClass("step-tab-active");
														    	$("#next-tab-btn").removeClass('second-step');
																$("#next-tab-btn").addClass('third-step');
																$('.container-personal-info').addClass('hidden-div-container');
																$('.contract-agreement ').removeClass('hidden-div-container');

    														}
    													}
    												}
    											}
    											
    										}
    										else
    										{
    											
    											$(".minor").addClass('hidden-div-container');
    											$(".step-tab-container").children().eq(2).removeClass("step-tab-active");
										    	$(".step-tab-container").children().eq(3).addClass("step-tab-active");
										    	$("#next-tab-btn").removeClass('second-step');
												$("#next-tab-btn").addClass('third-step');
												$('.container-personal-info').addClass('hidden-div-container');
												$('.contract-agreement ').removeClass('hidden-div-container');
    										}	
										}
									}
									
								}

							}
						}	
					}
				}

			}
		}		

    	
	});


	$(document).on('click', '#tb-scam', function(){

	   		$('#application-modal-form').modal('hide');
	    	
	});

	$(document).on('click', '.third-step', function(){

    	$(".step-tab-container").children().eq(3).removeClass("step-tab-active");
    	$(".step-tab-container").children().eq(0).addClass("step-tab-active");
    	$("#next-tab-btn").removeClass('third-step');
		$("#next-tab-btn").addClass('first-step');
    	$("#application-modal-form").modal('hide');
	});


	/*var startTimeMS = 0;  // EPOCH Time of event count started
	var timerId;          // Current timer handler
	var timerStep=5000;   // Time beetwen calls

			// This function starts the timer
	function startTimer(){
			   startTimeMS = (new Date()).getTime();
			   timerId = setTimeout("eventRaised",timerStep);
			}

	function eventRaised(){

	  alert('WOP EVENT RAISED!');

	  clearTimer(timerId); // clear timer
	  startTimer(); // do again
	}

	function getRemainingTime(){
		return  timerStep - ( (new Date()).getTime() - startTimeMS );
	}*/
}

Template.partnership.helpers({
	youtubeUser: function(){
		if(Meteor.users.findOne() != null){
			return Meteor.users.findOne()
		}
	},
	youtubeInfo: function(email){

	},
	googleImage: function(){
		var url;
		Meteor.call("getImageURL", Meteor.user().services.google.id, function(error,results){
			var jsondecoded = json_decode(results.content);
			url = jsondecoded.image.url;
		});
		return url;
	}
})

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