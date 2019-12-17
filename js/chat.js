//Language & messages configuration
//Note: also see /config/messages.json for further messages configuration
var lsmsg = {
    "defaultLanguage" : "en",
    "msgs": {
        "en":{
              privateMessage: 'Private',
              settings: 'Settings',
              uploadImagesTitle: 'Upload images.',
              uploadImagesTitleSorry: 'Sorry image uploads are only supported on IE10+, or any other browser.',
              sendTo: 'Send to',
              emoticonsTitle: 'Emoticons',
              helpURL: 'https://atomjump.com/wp/user-guide/',
              helpTitle: 'Help'
        },
        "es":{
              privateMessage: 'Privado',
              settings: 'Ajustes',
              uploadImagesTitle: 'Sube imágenes.',
              uploadImagesTitleSorry: 'La subida de imágenes Lo siento, sólo se admiten en IE10+, o cualquier otro navegador.',
              sendTo: 'Enviar a',
              emoticonsTitle: 'Emoticonos',
              helpURL: 'https://atomjump.com/wp/user-guide/',
              helpTitle: 'Ayuda'
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
var sameDomain = "atomjump.com";		//string in url to signify this is the same domain (for Safari cross-domain check)
var emailPlugin = "/plugins/shortmail/index.php";
var myUrl = window.location.href;
var emailCheck;
var cssFeedback = "";
var cssStrap = "";
var oldScreenWidth = null;




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
	if(params.domain) {
		sameDomain = params.domain;
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
	 jQuery.ajax({
		url: ssshoutServer + emailPlugin + "?callback=?", 
		data: "refresh=" + commentLayer + custom,
		crossDomain: true,
		dataType: "jsonp"
	}).done(function(response) {
		//Refreshed
	});

}

// Message event handler (e is event object) 
function handleMessage(e) {
    // Reference to title element for data display
    var el = document.getElementById('comment-title'); 
    // Check origin
    if(sameDomain) {
		if (e.origin.indexOf(sameDomain) != -1) {
			// Retrieve data sent in postMessage
			el.innerHTML = e.data.title;
			// Send reply to source of message
			e.source.postMessage('title', e.origin);
		}
	} else {
			// Retrieve data sent in postMessage
			el.innerHTML = e.data.title;
			// Send reply to source of message
			e.source.postMessage('title', e.origin);	
	}
}




var currentWindow = {
	"_this": null,
	"forumId": null,
	"emailRefreshFlag": null 

}


function openPopup(_this, forumId, emailRefreshFlag)
{
		//Save status for a screen resize	
		currentWindow._this = _this;
		currentWindow.forumId = forumId;
		currentWindow.emailRefreshFlag = emailRefreshFlag;
		
		
		jQuery('#comment-title').html("");		//Blank out any old title

		
		//Bring up a popup window (if Safari desktop only)
		//to ensure that we have the security permissions to set the session
		//from within the iframe. But only do this the first time (and
		//save this knowledge in a local cookie)
		//From then onwards, we just open all the way
		var isMacLike = navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i) ? true:false;				
		var is_safari = navigator.userAgent.indexOf("Safari") > -1;
		if(myUrl.indexOf(sameDomain) == -1) { 
			if((is_safari) && (isMacLike == true)) {
				var firstView = getCookie("safari-first-view");
				if(!firstView) {
						var myWindow = window.open(ssshoutServer + "/init-sessions.php", "", "width=1,height=1");
						document.cookie = 'safari-first-view=false; path=/; expires=' + cookieOffset() + ';';
				}
			}
		}
		
		
		
		
		if(forumId) {
			//This is 1st option - we had it passed into the function
			commentLayer = forumId;
		
		} else {
			if(jQuery(_this).data('useid')) {
				//Use the ID option
				if(jQuery(_this).attr('id')) {
					//2nd option base the forum name on an id
					commentLayer = jQuery(_this).attr('id');
				}
			}
		
		}
		
		if(jQuery(_this).data('notifyurl')) {
			myUrl = jQuery(_this).data('notifyurl');		//Allow for user-created
															//URLs for the current page. Used by e.g. sites behind password protection, so that notification 'open forum' links can be sent to a lead-up page which allows a login.
		}
		
		if(jQuery(_this).data('uniquefeedbackid')) {
			//If we have a unique feedback id for this link in the data properties, rest the globals.
			commentLayer = jQuery(_this).data('uniquefeedbackid');
			whisperOften = jQuery(_this).data('mymachineuser');
			
			if(jQuery(_this).data('shortmail')) {
				updateEmail();
				
				emailCheck = setInterval("updateEmail();", 60000);
				
				
			}
			
		}
		
		if(emailRefreshFlag) {
			if(emailRefreshFlag == true) {
				//If we are mail refreshing
				updateEmail();
				emailCheck = setInterval("updateEmail();", 60000);
			}
		
		}
		
		//Dynamically readjust window to current screen height
		var screenWidth = jQuery(window).width();
		var screenHeight = jQuery(window).height();
		jQuery('#comment-popup-container').width(Math.floor(screenWidth) + "px");
		jQuery('#comment-popup-container').height(Math.floor(screenHeight) + "px");	

		jQuery("#comment-in-here").html('');
		
		
		jQuery('#comment-popup-container').fadeIn(400,function(){
			
			
			
			var wid = (jQuery("#comment-in-here").width() - 5);		//5 is to ensure scroll bar always accounted for
			var hei = (jQuery("#comment-popup-text-container").height() - 10);
			
					
			jQuery("#comment-in-here").html('<iframe id="comment-iframe" src="' + ssshoutServer + '/search-secure.php?width=' + wid + '&height=' + hei + '&uniqueFeedbackId=' + commentLayer + '&myMachineUser=' + whisperOften + '&cssFeedback=' + encodeURIComponent(cssFeedback) + '&cssBootstrap=' + encodeURIComponent(cssStrap) + '&server=' + encodeURIComponent(ssshoutServer) + '&clientremoteurl=' + encodeURIComponent(myUrl) + '" frameBorder="0" scrolling="no" width="' + wid + '" height="' + hei + '" onload="jQuery(\'#comment-loading\').hide();" allowfullscreen></iframe>');
			
			// Assign handler to message event
			if ( window.addEventListener ) {
				window.addEventListener('message', handleMessage, false);
			} else if ( window.attachEvent ) { // ie8
				window.attachEvent('onmessage', handleMessage);
			}
			
			
		
		});


}



function writeCommentHolder(screenWidth, screenHeight, ssshoutServer, settings, uploadStr, emoticonsStr, privateMessage, helpStr) {


	jQuery("#comment-holder").html('<div id="comment-popup-container" style="width:'+screenWidth+'px; height: '+screenHeight+'px" >\
				<div id="comment-popup" class="comment-popup-style">\
				  <div id="comment-title"></div>\
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
				 			 <span class="comment-settings"><a id="comment-options-popup" href="javascript:"><img src="' + ssshoutServer + '/images/settings.png">&nbsp;' + settings + '</a></span>' + uploadStr + emoticonsStr + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="comment-private-key">' + privateMessage + '</span>' + helpStr + '\
				 		</div>\
					</div>\
			 </div>\
			</div>');
			
			

			
			
				jQuery('a[href^="#comment-open-"]').click(function() {
					//First base the forum name on an href eg. #comment-open-forumname
					openPopup(this, this.href.split('#comment-open-')[1]);
				});
				
				jQuery('a[href^="#shortmail-open-"]').click(function() {
					//First base the forum name on an href eg. #shortmail-open-forumname
					openPopup(this, this.href.split('#shortmail-open-')[1], true);
				});
				
				
				jQuery('.comment-open').click(function() {
					//A more traditional class link click
					openPopup(this, null);
					
					
				});
				
				jQuery('#comment-close-popup').click(function() {
					//blank out the iframe, kicking in the onbeforeupdate event
					var iframe = document.getElementById('comment-iframe');
					iframe.parentNode.removeChild(iframe);
					
					currentWindow = {
						"_this": null,
						"forumId": null,
						"emailRefreshFlag": null 
					}
					
					if(emailCheck) {			//if we have a timer on the email
						clearTimeout(emailCheck);	
					
					}
					
					jQuery("#comment-popup-container").fadeOut(400, function() {
						
						
						//Tell iframe to stop searching
						var ifr = document.getElementById('comment-iframe');
						if(ifr) {
							var receiver =  ifr.contentWindow;
							if(receiver) {
								receiver.postMessage('stop', ssshoutServer);
							}
						}
						
						jQuery("#comment-in-here").html('');
						
						jQuery("#comment-popup-container").hide();
						jQuery('#comment-holder').focus();
						jQuery('#comment-loading').show(); 
					}); 
					ssshoutHasFocusOuter = false;	//stop seekin new search terms;
					window.focus();
					
					
				
				});
				
				
				
				jQuery('#comment-options-popup').click(function() {
					//Tell iframe to switch content
					var receiver =  document.getElementById('comment-iframe').contentWindow;
					receiver.postMessage('toggle', ssshoutServer);
				

				
				});
				
				jQuery('#comment-upload-popup').click(function() {
					//Tell iframe to switch content
					var receiver =  document.getElementById('comment-iframe').contentWindow;
					receiver.postMessage('upload', ssshoutServer);
				

				
				});
				
				jQuery('#comment-emoji-popup').click(function() {
					//Tell iframe to switch content
					var receiver =  document.getElementById('comment-iframe').contentWindow;
					receiver.postMessage('emojis', ssshoutServer);
				

				
				});
				
				
				
				jQuery('#chat-input-block').append('<input' + ' type="hidden" ' + 'name="cs" ' + ' value="'+ cs + '">');
					
			
			
}


//Run automatically
if(typeof ajFeedback !== 'undefined') {
	initAtomJumpFeedback(ajFeedback);
}





jQuery(document).ready(function() {
			var screenWidth = jQuery(window).width();
			var screenHeight = jQuery(window).height();
			
			oldScreenWidth = screenWidth;
			var setLang = getCookie("lang");
			if(setLang) {
			    lang = setLang;			
			}
			
			
			//If IE10 or above, or any other browser
			if(window.atob) {
				var uploadStr = '&nbsp;&nbsp;<span class="comment-settings" style=""><a id="comment-upload-popup" class="comment-button" href="javascript:"><img title="' + lsmsg.msgs[lang].uploadImagesTitle + '" src="' + ssshoutServer + '/images/upload.png"></a></span>';
			} else {
				var uploadStr = '&nbsp;&nbsp;<span class="comment-settings" style=""><a class="comment-button" href="javascript:"><img title="' + lsmsg.msgs[lang].uploadImagesTitleSorry + '" src="' + ssshoutServer + '/images/noupload.png"></a></span>';
			}
			
			var emoticonsStr = '&nbsp;&nbsp;<span class="comment-settings" style=""><a id="comment-emoji-popup" class="comment-button" href="javascript:"><img title="' + lsmsg.msgs[lang].emoticonsTitle + '" src="' + ssshoutServer + '/images/emoticons.png"></a></span>';
			
			if(!lsmsg.msgs[lang].helpURL) {
				var helpURL = "https://atomjump.com/wp/user-guide/";
			} else {
				var helpURL = lsmsg.msgs[lang].helpURL;
			}
			
			if(!lsmsg.msgs[lang].helpTitle) {
				var helpTitle = "Help";
			} else {
				var helpTitle = lsmsg.msgs[lang].helpTitle;
			}
			var helpStr = '&nbsp;&nbsp;<span class="comment-settings" style="float: right; "><a  id="comment-help" style="" target="_blank" href="' + helpURL + '"><img title="' + lsmsg.msgs[lang].helpTitle + '" src="' + ssshoutServer + '/images/help.png"></a></span>';  
			
			
			
			//Write the holder
			writeCommentHolder(screenWidth, screenHeight, ssshoutServer, lsmsg.msgs[lang].settings, uploadStr, emoticonsStr, lsmsg.msgs[lang].privateMessage, helpStr);
			
			
			

				
		
		});



function whisper(whisper_to, targetName)
{
	whisperOften = whisper_to;		//set global
	jQuery('#private-button').html(lsmsg.msgs[lang].sendTo + " " + targetName);

}


cs += 9585328;

cs += 124856;
			
cs += 9484320;
			
