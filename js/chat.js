//(C)2015 AtomJump. MIT license.
//This file should be included in your javascript directory
//Contact: peter AT atomjump.com

function myTrim(x)
{
	return x.replace(/^\s+|\s+$/gm,'');
}

function getCookie(cname)
{
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++)
	{
		var c = myTrim(ca[i]);// ie8 didn't support .trim();
		if (c.indexOf(name)==0) return c.substring(name.length,c.length);
	}
	return "";
}
var commentLayer="comments";
var ssshoutFreq = 5000;
var ssshoutHasFocusOuter = true;
var myLoopTimeout;
var whisperOften = "1.1.1.1:2"; //defaults to admin user's ip and id
var cs = 2438974;
if(window.location.hostname.match('staging')){			//added window.
	var ssshoutServer = "https://staging.atomjump.com";
} else {
	var ssshoutServer = "https://atomjump.com";
}
var myUrl = window.location.href;
var emailCheck;



function initAtomJumpFeedback(params)
{
	commentLayer = params.uniqueFeedbackId;
	whisperOften = params.myMachineUser;
	

}


function updateEmail()
{

	//Run a refresh on the server side	
	 $.ajax({
		url: ssshoutServer + "/mail-cron.php?callback=?", 
		data: "refresh=" + commentLayer,
		crossDomain: true,
		dataType: "jsonp"
	}).done(function(response) {
		//alert('refreshed');
	});

}

//Run automatically
if(typeof ajFeedback !== 'undefined') {
	initAtomJumpFeedback(ajFeedback);
}





$(document).ready(function() {
			var screenWidth = $(window).width();
			var screenHeight = $(window).height();
			
			
			
			//If IE10 or above, or any other browser
			if(window.atob) {
				var uploadStr = '&nbsp;&nbsp;<span class="comment-settings" style=""><a id="comment-upload-popup" style="padding: 3px;" href="javascript:"><img title="Upload images or video." src="' + ssshoutServer + '/images/upload.png"></a></span>';
			} else {
				var uploadStr = '&nbsp;&nbsp;<span class="comment-settings" style=""><a style="padding: 3px;" href="javascript:"><img title="Sorry image uploads are only supported on IE10+, or any other browser." src="' + ssshoutServer + '/images/noupload.png"></a></span>';
			}
			
			$("#comment-holder").html('<div id="comment-popup-container" style="width:'+screenWidth+'px; height: '+screenHeight+'px" >\
				<div id="comment-popup" class="comment-popup-style">\
			 	  <div class="comment-padding">\
			 	  \
			 		 <div id="comment-close-popup-container">\
			 		 	<a id="comment-close-popup" href="javascript:"><img src="' + ssshoutServer + '/images/multiply.png"></a>\
			 		 	<div style="clear: both;"></div>\
			 		 </div>\
			 		 <div id="comment-popup-inner">\
			 		 	<div class="comment-padding-allow-space">\
			 		 		<div id="comment-popup-text-container">\
			 		  			<div class="comment-padding">\
			 		  				<div id="comment-loading"><img src="' + ssshoutServer + '/images/ajax-loader.gif" /></div>\
			 		  				<div id="comment-in-here"></div>\
			 					</div>\
			 				</div>\
			 		 	</div>\
				 		 <div id="comment-key">\
				 			 <span class="comment-settings" style=""><a id="comment-options-popup" style="padding: 3px;" href="javascript:"><img src="' + ssshoutServer + '/images/settings.png">&nbsp;Settings</a></span>' + uploadStr + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="comment-private-key">Private Message</span>\
				 		</div>\
					</div>\
			 </div>\
			</div>');
			
			
				
				
				
				$('.comment-open').click(function() {
					//Dynamically readjust window to current screen height
					
					if($(this).data('uniquefeedbackid')) {
						//If we have a unique feedback id for this link in the data properties, rest the globals.
						commentLayer = $(this).data('uniquefeedbackid');
						whisperOften = $(this).data('mymachineuser');
						
						if($(this).data('mailrefresh')) {
							updateEmail();
							
							emailCheck = setInterval("updateEmail();", 60000);
							
							
						}
						
					}
					
					var screenWidth = $(window).width();
					var screenHeight = $(window).height();
					$('#comment-popup-container').width(Math.floor(screenWidth) + "px");
					$('#comment-popup-container').height(Math.floor(screenHeight) + "px");
					
					
					
					$("#comment-in-here").html('');
					
					
					$('#comment-popup-container').fadeIn(400,function(){
						
						
						
						var wid = ($("#comment-in-here").width() - 5);		//5 is to ensure scroll bar always accounted for
						var hei = ($("#comment-popup-text-container").height() - 10);
						
						$("#comment-in-here").html('<iframe id="comment-iframe" src="' + ssshoutServer + '/search-secure.php?width=' + wid + '&height=' + hei + '&uniqueFeedbackId=' + commentLayer + '&myMachineUser=' + whisperOften + '&clientremoteurl=' + encodeURIComponent(myUrl) + '" frameBorder="0" scrolling="no" width="' + wid + '" height="' + hei + '" onload="$(\'#comment-loading\').hide();" allowfullscreen></iframe>');
						
					
					});
					
				});
				
				$('#comment-close-popup').click(function() {
					$('#comment-iframe').attr('src','');		//blank out the iframe, kicking in the onbeforeupdate event
					
					if(emailCheck) {			//if we have a timer on the email
						clearTimeout(emailCheck);	
					
					}
					
					$("#comment-popup-container").fadeOut(400, function() {
						
						
						//Tell iframe to stop searching
						var ifr = document.getElementById('comment-iframe');
						if(ifr) {
							var receiver =  ifr.contentWindow;
							if(receiver) {
								receiver.postMessage('stop', ssshoutServer);
							}
						}
						
						$("#comment-in-here").html('');
						
						$("#comment-popup-container").hide();
						$('#comment-holder').focus();
						$('#comment-loading').show(); 
					}); 
					ssshoutHasFocusOuter = false;	//stop seekin new search terms;
					window.focus();
					
					
				
				});
				
				
				
				$('#comment-options-popup').click(function() {
					//Tell iframe to switch content
					var receiver =  document.getElementById('comment-iframe').contentWindow;
					receiver.postMessage('toggle', ssshoutServer);
				

				
				});
				
				$('#comment-upload-popup').click(function() {
					//Tell iframe to switch content
					var receiver =  document.getElementById('comment-iframe').contentWindow;
					receiver.postMessage('upload', ssshoutServer);
				

				
				});
				
				
				
				$('#chat-input-block').append('<input' + ' type="hidden" ' + 'name="cs" ' + ' value="'+ cs + '">');
				
				
		
		});



function whisper(whisper_to, targetName)
{
	whisperOften = whisper_to;		//set global
	$('#private-button').html("Send to " + targetName);

}


cs += 9585328;

cs += 124856;
			
cs += 9484320;
			

