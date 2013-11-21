(function(){Template.partnership.rendered = function(){
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
		 
/*
		 Meteor.Sendgrid.send({
		    to: 'cabornay.lito@gmail.com',
		    from: 'no-reply@where-ever.com',
		    subject: 'I really like sending emails with Sendgrid!',
		    text: 'Sendgrid is totally awesome for sending emails!'
  		});*/

		



					
	$(document).on('click', '.first-step', function(){
		var daily_views = $("#yt_daily_views2").attr("value");
		var total_views = $("#yt_total_views2").attr("value");
		var subscribers = $("#yt_subscribers2").attr("value");
		var copyright = $("#cr_status").attr("value");
		$("#next-tab-btn2").hide();
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
			},4000);
			setTimeout(function(){
				$('div.progress-bar').width('50%');
			},2000);
			setTimeout(function(){
				$('div.progress-bar').width('60%');
			},3000);
			setTimeout(function(){
				$('div.progress-bar').width('70%');
			},2000);
			setTimeout(function(){
				$('div.progress-bar').width('80%');
			},3000);
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
				if(!$("#paypal").val()){
					$("#paypal").focus();
				}
				else{


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
												var month = parseInt($("#birth-month").val());
												var day = parseInt($("#birth-day").val());
												var year = parseInt($("#birth-year").val());
												var bdate = year + '-' + month + '-' + day;
												var Bdate   = new Date(bdate.split("-").reverse().join('-'));
	    										var	age     = parseInt( ( (new Date() - Bdate) / 1000 / (60 * 60 * 24) ) / 365.25 ) || 0;
	    										//var	age     = Math.floor( ( (new Date() - Bdate) / 1000 / (60 * 60 * 24) ) / 365.25 ) || 0;
	    										
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
	    											$('#page2, #page3, #page4, #page5, #page6, #page7').hide();
	    											$(".minor").addClass('hidden-div-container');
	    											$(".step-tab-container").children().eq(2).removeClass("step-tab-active");
											    	$(".step-tab-container").children().eq(3).addClass("step-tab-active");
											    	$("#next-tab-btn").removeClass('second-step');
													$("#next-tab-btn").addClass('third-step');
													$("#next-tab-btn").text("I agree and Download Contract");
													$("#close-modal").hide();
													$("#next-tab-btn2").show();
													$('.container-personal-info').addClass('hidden-div-container');
													$('.contract-agreement ').removeClass('hidden-div-container');
													$("#fullname").attr("value", $("#firstname").val() + ' ' + $("#lastname").val());
													$('#paypal-contract').attr("value", $("#paypal").val());
													$("#yt_email2").attr("value", Meteor.user().services.google.email);
													$("#email").attr("value", Meteor.user().services.google.email);
													$("#yt_channel_name3").attr("value", $("#yt_channel_name2").val());
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
		}		

    	
		
	

	})



	$(document).on('click', '#tb-scam', function(){
		Meteor.logout();	
   		$('#application-modal-form').modal('hide');
	    	
	});

	$(document).on('click', '#next-tab-btn2', function(){

	   		$('#application-modal-form').modal('hide');
	    	
	});

	$(document).on('click', '.third-step', function(){

    	$(".step-tab-container").children().eq(3).removeClass("step-tab-active");
    	$(".step-tab-container").children().eq(0).addClass("step-tab-active");
    	$("#next-tab-btn").removeClass('third-step');
		$("#next-tab-btn").addClass('first-step');
    	$("#application-modal-form").modal('hide');


		var doc =  Meteor.jsPDF();
		var agree = 'I hereby agree to the terms and conditions stated below and certify that I have the authority';	
		var agree2 = 'to enter into this Agreement.';
		var under ='Signature (if 18 years old or older) or Signature of parent/legal guardian (if under 18 years old):';
		// page 1
		doc.setFontSize(40);	
		doc.text(75, 20, 'ArkonDigital');
		doc.setFontSize(15);	
		doc.text(10, 25, '________________________________________________________________');
		doc.setFontSize(20);	
		doc.text(60, 40, 'Content Provider Agreement');
		doc.setFontSize(12);
		doc.text(90, 50, 'Confidential');
		doc.setFontSize(12);
		doc.text(20, 60, agree);
		doc.setFontSize(12);
		doc.text(20, 65, agree2);
		doc.setFontSize(12);
		doc.text(20, 75, under);
		doc.setFontSize(12);
		doc.text(30, 105, 'Full Name: ');
		doc.setFontSize(12);
		doc.text(70, 105, '   ' + $("#firstname").val() + " " + $("#lastname").val());
		doc.setFontSize(14);
		doc.text(70, 106, '_________________________________');
		doc.setFontSize(12);
		doc.text(30, 125, 'Email: ');
		doc.setFontSize(12);
		doc.text(70, 125, '   ' + $("#yt_email").val() );
		doc.setFontSize(14);
		doc.text(70, 126, '_________________________________');
		doc.setFontSize(12);
		doc.text(30, 145, 'Paypal: ');
		doc.setFontSize(12);
		doc.text(70, 145, '   ' + $("#paypal").val() );
		doc.setFontSize(14);
		doc.text(70, 146, '_________________________________');
		doc.setFontSize(12);
		doc.text(30, 165, 'Youtube Email: ');
		doc.setFontSize(12);
		doc.text(70, 165, '   ' + $("#yt_email2").val() );
		doc.setFontSize(14);
		doc.text(70, 166, '_________________________________');
		doc.setFontSize(12);
		doc.text(30, 185, 'Youtube Channel: ');
		doc.setFontSize(12);
		doc.text(70, 185, '   ' + $("#yt_channel_name3").val() );
		doc.setFontSize(14);
		doc.text(70, 186, '_________________________________');

		doc.setFontSize(15);	
		doc.text(10, 270, '________________________________________________________________');
		doc.setFontSize(12);	
		doc.text(20, 280, 'ArkonDigital Content Provider Agreement');
		doc.setFontSize(12);	
		doc.text(170, 280, 'Page 1 of 7');
		
		// page 2
		doc.addPage();
		doc.setFontSize(40);	
		doc.text(75, 20, 'ArkonDigital');
		doc.setFontSize(15);	
		doc.text(10, 25, '________________________________________________________________');
		doc.setFontSize(12);	
		doc.text(20, 35, 'THIS CONTENT PROVIDER AGREEMENT (this Agreement Titles) explains the contractual');
		doc.setFontSize(12);	
		doc.text(20, 40, 'agreement between ArkonDigital, Corp. A Company duly incorporated under the laws of');
		doc.setFontSize(12);	
		doc.text(20, 45, 'the Province of Ontario , with a principal place of business at #38 700 Exeter Rd,');
		doc.setFontSize(12);	
		doc.text(20, 50, 'London, Ontario, Canada  N6E 1L2 (ArkonDigital) and you (Provider).');
		doc.setFontSize(15);	
		doc.text(75, 65, 'RECITALS and DEFINITIONS');
		doc.setFontSize(12);	
		doc.text(20, 75, 'This Agreement sets forth the rights, obligations, terms and conditions for Providers delivery');
		doc.setFontSize(12);	
		doc.text(20, 80, 'of video content to ArkonDigital and its network of video over IP (Internet Protocol)');
		doc.setFontSize(12);	
		doc.text(20, 85, 'network operators/broadcasters, and/or wireless network operators and/or digital cable ');
		doc.setFontSize(12);	
		doc.text(20, 90, 'broadcasters including Provider s use of and access to any of our web or software applications,');
		doc.setFontSize(12);	
		doc.text(20, 95, 'text, scripts, graphics, photos, sounds, music, videos, audiovisual combinations, interactive');
		doc.setFontSize(12);	
		doc.text(20, 100, 'features, downloads, services, and any other materials you may view on, access through, or ');
		doc.setFontSize(12);	
		doc.text(20, 105, 'contribute to the service (collectively, the Services).');
		doc.setFontSize(12);	
		doc.text(20, 115, 'A. Provider s Role in the Network. Provider will supply certain video content through');
		doc.setFontSize(12);	
		doc.text(20, 120, 'the Services located on the ArkonDigital Network or by other delivery method approved ');
		doc.setFontSize(12);	
		doc.text(20, 125, 'by ArkonDigital for streaming and/or download and distribution on the ArkonDigital Network,');
		doc.setFontSize(12);	
		doc.text(20, 130, 'subject to the terms of this Agreement.');
		doc.setFontSize(12);	
		doc.text(20, 140, 'B. Titles means all audiovisual content including Live Event Content, Archived Content,');
		doc.setFontSize(12);	
		doc.text(20, 145, 'and all audiovisual recordings submitted henceforth to ArkonDigital by Provider during');
		doc.setFontSize(12);	
		doc.text(20, 150, 'the Term.');
		doc.setFontSize(12);	
		doc.text(20, 160, 'C. Broadcast Media means advertisements provided by Broadcast Media and/or its partners ');
		doc.setFontSize(12);	
		doc.text(20, 165, 'and affiliates for inclusion in Broadcast Media Network related Sites and Services.');
		doc.setFontSize(12);	
		doc.text(20, 175, 'D. Promotional Materials means any production artwork, movie stills,trailers and the names,');
		doc.setFontSize(12);	
		doc.text(20, 180, ' likenesses and biographical material of Talent featured in,the Titles, as well as the Provider(s)');
		doc.setFontSize(12);	
		doc.text(20, 185, 'brand name and trademarked logos and images, in connection with exploitation and promotion');
		doc.setFontSize(12);	
		doc.text(20, 190, 'thereof. As used herein, Talent shall mean actors, irectors, producers, writers,musical');
		doc.setFontSize(12);	
		doc.text(20, 195, 'performing artists and other performers, songwriters, crew and other persons, below the line');
		doc.setFontSize(12);	
		doc.text(20, 200, 'and above the line, who performed or participated in the making of the Titles.');
		doc.setFontSize(12);	
		doc.text(20, 210, 'E. End User means the person(s) accessing the Provider Content via the ArkonDigital Network.');
		doc.setFontSize(12);	
		doc.text(20, 220, 'F. Territory means worldwide.');
		doc.setFontSize(12);	
		doc.text(20, 230, 'G. Effective Date means the date that the Provider accepts the Terms of this Agreement');
		doc.setFontSize(12);	
		doc.text(20, 235, 'through the Services on the ArkonDigital Network.');
		doc.setFontSize(12);
		doc.text(20, 245, 'H. Provider Channels means that page of the YouTube Website dedicated to Provider Titles');
		doc.setFontSize(12);
		doc.text(20, 250, 'that is part of ArkonDigital Network.');
		doc.setFontSize(12);
		doc.text(20, 260, 'I. Claim means to enforce Provider copyrights to Provider Video and/or Titles across ');
		doc.setFontSize(12);	
		doc.text(20, 265, 'ArkonDigital based on guidelines set forth in Exhibit A.');
		doc.setFontSize(15);	
		doc.text(10, 270, '________________________________________________________________');
		doc.setFontSize(12);	
		doc.text(20, 280, 'ArkonDigital Content Provider Agreement');
		doc.setFontSize(12);	
		doc.text(170, 280, 'Page 2 of 7');
		// page 3
		doc.addPage();
		doc.setFontSize(40);	
		doc.text(75, 20, 'ArkonDigital');
		doc.setFontSize(15);	
		doc.text(10, 25, '________________________________________________________________');
		doc.setFontSize(20);	
		doc.text(60, 40, 'Content Provider Agreement');
		doc.setFontSize(12);
		doc.text(90, 50, 'Confidential');
		doc.setFontSize(12);
		doc.text(10, 60, agree);
		doc.setFontSize(12);
		doc.text(10, 65, agree2);
		doc.setFontSize(12);
		doc.text(10, 75, under);
		doc.setFontSize(12);
		doc.text(10, 85, 'This belongs to: ' + $("#firstname").val() + " " + $("#lastname").val());
		doc.setFontSize(15);	
		doc.text(10, 270, '________________________________________________________________');
		doc.setFontSize(12);	
		doc.text(10, 280, 'ArkonDigital Content Provider Agreement');
		doc.setFontSize(12);	
		doc.text(170, 280, 'Page 3 of 7');
		// page 4
		doc.addPage();
		doc.setFontSize(40);	
		doc.text(75, 20, 'ArkonDigital');
		doc.setFontSize(15);	
		doc.text(10, 25, '________________________________________________________________');
		doc.setFontSize(20);	
		doc.text(60, 40, 'Content Provider Agreement');
		doc.setFontSize(12);
		doc.text(90, 50, 'Confidential');
		doc.setFontSize(12);
		doc.text(10, 60, agree);
		doc.setFontSize(12);
		doc.text(10, 65, agree2);
		doc.setFontSize(12);
		doc.text(10, 75, under);
		doc.setFontSize(12);
		doc.text(10, 85, 'This belongs to: ' + $("#firstname").val() + " " + $("#lastname").val());
		doc.setFontSize(15);	
		doc.text(10, 270, '________________________________________________________________');
		doc.setFontSize(12);	
		doc.text(10, 280, 'ArkonDigital Content Provider Agreement');
		doc.setFontSize(12);	
		doc.text(170, 280, 'Page 4 of 7');
		// page 5
		doc.addPage();
		doc.setFontSize(40);	
		doc.text(75, 20, 'ArkonDigital');
		doc.setFontSize(15);	
		doc.text(10, 25, '________________________________________________________________');
		doc.setFontSize(20);	
		doc.text(60, 40, 'Content Provider Agreement');
		doc.setFontSize(12);
		doc.text(90, 50, 'Confidential');
		doc.setFontSize(12);
		doc.text(10, 60, agree);
		doc.setFontSize(12);
		doc.text(10, 65, agree2);
		doc.setFontSize(12);
		doc.text(10, 75, under);
		doc.setFontSize(12);
		doc.text(10, 85, 'This belongs to: ' + $("#firstname").val() + " " + $("#lastname").val());
		doc.setFontSize(15);	
		doc.text(10, 270, '________________________________________________________________');
		doc.setFontSize(12);	
		doc.text(10, 280, 'ArkonDigital Content Provider Agreement');
		doc.setFontSize(12);	
		doc.text(170, 280, 'Page 5 of 7');
		// page 6
		doc.addPage();
		doc.setFontSize(40);	
		doc.text(75, 20, 'ArkonDigital');
		doc.setFontSize(15);	
		doc.text(10, 25, '________________________________________________________________');
		doc.setFontSize(20);	
		doc.text(60, 40, 'Content Provider Agreement');
		doc.setFontSize(12);
		doc.text(90, 50, 'Confidential');
		doc.setFontSize(12);
		doc.text(10, 60, agree);
		doc.setFontSize(12);
		doc.text(10, 65, agree2);
		doc.setFontSize(12);
		doc.text(10, 75, under);
		doc.setFontSize(12);
		doc.text(10, 85, 'This belongs to: ' + $("#firstname").val() + " " + $("#lastname").val());
		doc.setFontSize(15);	
		doc.text(10, 270, '________________________________________________________________');
		doc.setFontSize(12);	
		doc.text(10, 280, 'ArkonDigital Content Provider Agreement');
		doc.setFontSize(12);	
		doc.text(170, 280, 'Page 6 of 7');
		// page 7
		doc.addPage();
		doc.setFontSize(40);	
		doc.text(75, 20, 'ArkonDigital');
		doc.setFontSize(15);	
		doc.text(10, 25, '________________________________________________________________');
		doc.setFontSize(20);	
		doc.text(60, 40, 'Content Provider Agreement');
		doc.setFontSize(12);
		doc.text(90, 50, 'Confidential');
		doc.setFontSize(12);
		doc.text(10, 60, agree);
		doc.setFontSize(12);
		doc.text(10, 65, agree2);
		doc.setFontSize(12);
		doc.text(10, 75, under);
		doc.setFontSize(12);
		doc.text(10, 85, 'This belongs to: ' + $("#firstname").val() + " " + $("#lastname").val());
		doc.setFontSize(15);	
		doc.text(10, 270, '________________________________________________________________');
		doc.setFontSize(12);	
		doc.text(10, 280, 'ArkonDigital Content Provider Agreement');
		doc.setFontSize(12);	
		doc.text(170, 280, 'Page 7 of 7');


		doc.output('datauri');

    	Meteor.logout();
	});


	
	$(document).on('click', '#next-contract-page', function(){
		var curr = $("div.page:visible");
        var next = curr.next("div.page");
        next.show();
        curr.hide();
        if (!next.next(".page").length) {
            $('#next-contract-page').attr('disabled', 'disabled');
            $('#prev-contract-page').removeAttr('disabled');
        }
    	
	});


	$(document).on('click', '#prev-contract-page', function(){
		var curr1 = $("div.page:visible");
        var prev = curr1.prev("div.page");
        prev.show();
        curr1.hide();
        if (!prev.prev(".page").length) {
            $('#prev-contract-page').attr('disabled', 'disabled');
             $('#next-contract-page').removeAttr('disabled');
        }
    	
	});
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

})();
