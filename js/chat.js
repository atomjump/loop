//Language & messages configuration
//Note: also see /config/messages.json for further messages configuration
var lsmsg = {
    "defaultLanguage" : "en",
    "msgs": {
        "en":{
              privateMessage: 'Private',
              settings: 'Settings',
              uploadImagesTitle: 'Upload images or video.',
              uploadImagesTitleSorry: 'Sorry image uploads are only supported on IE10+, or any other browser.',
              sendTo: 'Send to',
              emoticonsTitle: 'Emoticons'
        },
        "es":{
              privateMessage: 'Privado',
              settings: 'Settings',
              uploadImagesTitle: 'Sube imágenes o vídeo.',
              uploadImagesTitleSorry: 'La subida de imágenes Lo siento, sólo se admiten en IE10+, o cualquier otro navegador.',
              sendTo: 'Enviar a',
              emoticonsTitle: 'Emoticonos'
        }      
    }
}
var lang = lsmsg.defaultLanguage; 



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

function cookieOffset()
{
  //Should output: Thu,31-Dec-2020 00:00:00 GMT
  var cdate = new Date;
  var expirydate=new Date();
  expirydate.setTime(expirydate.getTime()+(365*3*60*60*24*1000))
  var write = expirydate.toGMTString();
  
  return write;
}

function isMacintosh() {
  return navigator.platform.indexOf('Mac') > -1;
}


var commentLayer="comments";
var ssshoutFreq = 5000;
var ssshoutHasFocusOuter = true;
var myLoopTimeout;
var whisperOften = "1.1.1.1:2"; //defaults to admin user's ip and id
var cs = 2438974;
var ssshoutServer = "https://atomjump.com/api";  //https://atomjump.com/api  normally
var emailPlugin = "/plugins/shortmail/index.php";
var myUrl = window.location.href;
var emailCheck;
var cssFeedback = "";
var cssStrap = "";



function initAtomJumpFeedback(params)
{
	commentLayer = params.uniqueFeedbackId;
	whisperOften = params.myMachineUser;
	if(params.server){
	  ssshoutServer = params.server;
 }
 if(params.cssFeedback) {
   cssFeedback = params.cssFeedback;
 }
 if(params.cssBootstrap) {
   cssStrap = params.cssBootstrap;
 }


}


function updateEmail()
{
	//Check if any custom user/passwords which have been entered in this session
	var custom = "";
	if((typeof customUser !== 'undefined') && (typeof customPass !== 'undefined')) {
		custom = "&u=" + encodeURIComponent(customUser) + "&p=" + encodeURIComponent(customPass) + "&w=" + encodeURIComponent(customWhisper) + "&fe=" + encodeURIComponent(customFeed) + "&fr=" + customFreq + "&mail_id=" + customMailId;
	}

	//Run a refresh on the server side	
	 $.ajax({
		url: ssshoutServer + emailPlugin + "?callback=?", 
		data: "refresh=" + commentLayer + custom,
		crossDomain: true,
		dataType: "jsonp"
	}).done(function(response) {
		//Refreshed
	});

}

//Run automatically
if(typeof ajFeedback !== 'undefined') {
	initAtomJumpFeedback(ajFeedback);
}





$(document).ready(function() {
			var screenWidth = $(window).width();
			var screenHeight = $(window).height();
			var setLang = getCookie("lang");
			if(setLang) {
			    lang = setLang;			
			}
			
			
			//If IE10 or above, or any other browser
			if(window.atob) {
				var uploadStr = '&nbsp;&nbsp;<span class="comment-settings" style=""><a id="comment-upload-popup" style="padding: 3px;" href="javascript:"><img title="' + lsmsg.msgs[lang].uploadImagesTitle + '" src="' + ssshoutServer + '/images/upload.png"></a></span>';
			} else {
				var uploadStr = '&nbsp;&nbsp;<span class="comment-settings" style=""><a style="padding: 3px;" href="javascript:"><img title="' + lsmsg.msgs[lang].uploadImagesTitleSorry + '" src="' + ssshoutServer + '/images/noupload.png"></a></span>';
			}
			
			var emoticonsStr = '&nbsp;&nbsp;<span class="comment-settings" style=""><a  id="comment-emoji-popup" style="padding: 3px;" href="javascript:"><img title="' + lsmsg.msgs[lang].emoticonsTitle + '" src="' + ssshoutServer + '/images/emoticons.png"></a></span>';
			
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
				 			 <span class="comment-settings" style=""><a id="comment-options-popup" style="padding: 3px;" href="javascript:"><img src="' + ssshoutServer + '/images/settings.png">&nbsp;' + lsmsg.msgs[lang].settings + '</a></span>' + uploadStr + emoticonsStr + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="comment-private-key">' + lsmsg.msgs[lang].privateMessage + '</span>\
				 		</div>\
					</div>\
			 </div>\
			</div>');
			
			
				
				
				
				$('.comment-open').click(function() {
					//Dynamically readjust window to current screen height
					
					
					//Bring up a popup window (if Safari desktop only)
					//to ensure that we have the security permissions to set the session
					//from within the iframe. But only do this the first time (and
					//save this knowledge in a local cookie)
					//From then onwards, we just open all the way				
					if(isMacintosh()) {
						var is_safari = navigator.userAgent.indexOf("Safari") > -1;
						if(is_safari) {
							var firstView = getCookie("safari-first-view");
							if(!firstView) {
									var myWindow = window.open(ssshoutServer + "/init-sessions.php", "", "width=1,height=1");
									document.cookie = 'safari-first-view=false; path=/; expires=' + cookieOffset() + ';';
							}
						}
					}					
					
					
					
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
						
								
						$("#comment-in-here").html('<iframe id="comment-iframe" src="' + ssshoutServer + '/search-secure.php?width=' + wid + '&height=' + hei + '&uniqueFeedbackId=' + commentLayer + '&myMachineUser=' + whisperOften + '&cssFeedback=' + encodeURIComponent(cssFeedback) + '&cssBootstrap=' + encodeURIComponent(cssStrap) + '&server=' + encodeURIComponent(ssshoutServer) + '&clientremoteurl=' + encodeURIComponent(myUrl) + '" frameBorder="0" scrolling="no" width="' + wid + '" height="' + hei + '" onload="$(\'#comment-loading\').hide();" allowfullscreen></iframe>');
						
					
					});
					
				});
				
				$('#comment-close-popup').click(function() {
					//blank out the iframe, kicking in the onbeforeupdate event
					var iframe = document.getElementById('comment-iframe');
					iframe.parentNode.removeChild(iframe);
					
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
				
				$('#comment-emoji-popup').click(function() {
					//Tell iframe to switch content
					var receiver =  document.getElementById('comment-iframe').contentWindow;
					receiver.postMessage('emojis', ssshoutServer);
				

				
				});
				
				
				
				$('#chat-input-block').append('<input' + ' type="hidden" ' + 'name="cs" ' + ' value="'+ cs + '">');
				
				
		
		});



function whisper(whisper_to, targetName)
{
	whisperOften = whisper_to;		//set global
	$('#private-button').html(lsmsg.msgs[lang].sendTo + " " + targetName);

}


cs += 9585328;

cs += 124856;
			
cs += 9484320;
			

