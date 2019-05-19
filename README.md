<img src="https://atomjump.com/images/logo80.png">

# AtomJump Messaging Front-end 
**(sometimes called the 'loop' project)**

This tool provides a 'WhatsApp-like' group discussion forum from a popup on your website. It is good for feedback, but can also be used as a live discussion tool, or a CRM.  We actually run our entire operation off one page with several of these popups on it.

The client software is entirely Javascript and CSS, but it refers to an AtomJump Messaging server to store messages (this is optionally available as a separate project at http://github.com/atomjump/loop-server, or by default you can use the AtomJump.com server).  Supported client platforms: IE8 upwards, Edge, Chrome, Firefox, Safari, Android Native, Android Chrome, Android Firefox, iPad, iPhone, Opera. There may be other supported platforms we haven't tested on.

See the demo at <a href="http://atomjump.org">AtomJump</a>

You are most welcome to adjust the styling by making changes to the CSS file for your project.




## Client Installation

With [bower](http://bower.io) from within the root of your project path:

**`bower install atomjump`**

(Or without bower, unpack into your project, edit index.html, and replace bootstrap css and javascript paths as mentioned)

Run atomjump/index.html in your browser.  You should see a 'Click me for comments' link. Click this to see the pop-up. For Wordpress instructions, see below.




## Client Setup

Look carefully at the index.html example.

The code between
`<!-- AtomJump Feedback Starts -->`
 
 and
 `<!-- AtomJump Feedback Ends -->`
 
 should be put into your page's `<head>` section.

Links can be added to the comments with
`<a class="comment-open" href="javascript:">Click me for comments</a>`

The code 
`<div id="comment-holder"></div>`
must be placed anywhere in the `<body>` section.
	 
Note: jQuery ver 1.9.1 is used.  Other jQuery versions will likely work also.

1. Adjust 'uniqueFeedbackId' value to a unique value to suit your forum's name.  This can be unique per page or the same throughout the whole site.

2. For messaging usage, refer to the Messaging guide at 
  http://atomjump.org/wp/user-guide/


## To have more than one messaging forum on a single page

You can do this three different ways. The simplest is to set the link's href to '"#comment-open-' followed by the forum name:
```<a href="#comment-open-my_different_forum_name">Open special forum</a>```

Or, you can add the 'comment-open' class to a link with an 'id' referring to the forum name:
```<a class="comment-open" id="my_different_forum_name" href="javascript:">Open special forum</a>```

Or, for further control over the owner of the forum, you can add the following data tags, and enter your own names/ips:
```<a class="comment-open" data-uniquefeedbackid="my_different_forum_name" data-mymachineuser="10.12.13.14:2" href="javascript:">Open special forum</a>```



## To open a Shortmail enabled forum

You can add the 'shortmail' data tag e.g.

```<a class="comment-open" data-uniquefeedbackid="my_different_forum_name" data-mymachineuser="10.12.13.14:2" data-shortmail="true" href="javascript:">Open special email forum</a>```

Or, you can use an href "#shortmail-open-" class:
```<a href="#email-open-my_shortmail_forum_name">Open shortmail forum</a>```



## To change the theme

Add 

"cssBootstrap":"relative/url"

and

"cssFeedback":"relative/url/to/your/css"

to the ajFeedback object.

Note: your css file must be on an https server, if your server is using https.


## To download a forum's messages programmatically

**Endpoint**
http://yourserver.com/download.php

or for atomjump.com's web-service:

https://atomjump.com/api/download.php

**Parameters**

1. **email**
   Your AtomJump Loop email address from the standard interface
2. **pass**  
   Your AtomJump Loop password
3. **uniqueFeedbackId**  
   The particular forum to view. Note: include 'ajps_' at the start of this string for x.atomjump.com forums.
4. **from_id**  
   There is a limit of 2000 records per request. To download more, include the 'id' of the last record, from the previous download request, in this field.


Which returns a JSON object. Included for reporting is a 'sentiment' field which measures how positive the comment is (< 0 negative, 0= neutral, > 0 positive).

## Getting a live sentiment

Include the following parameters along with 1,2, and 3 above.

4. **format**

   Set to 'avg'
   
5. **duration**
 
   Period over which to average in seconds.
   
The response will be an average over the last period of all the message sentiment values.
This will be expressed as a single number eg. 5.324.
Note: it can take up to 1 minute before any new message's sentiment will be calculated.



## Wordpress Setup


1. Install the 'Header and Footer' plugin.
   https://wordpress.org/plugins/insert-headers-and-footers/
2. Install AtomJump using 'bower' as described above in your Wordpress folder. 
3. Go into 'Settings->Header and Footer', and enter the two sections below (adjusting any paths required to fit your installation)
4. Any link's address (i.e. the 'href') on the page can now start with '#comment-open-', followed by the forum name and it will open a popup.

* Copy into the '<HEAD> SECTION INJECTION' section:

```
<!-- AtomJump Feedback Starts -->
		   <!-- Bootstrap core CSS. Ver 3.3.1 sits in css/bootstrap.min.css -->
			  <link rel="StyleSheet" href="/bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
			
			<!-- AtomJump Feedback CSS -->
			<link rel="StyleSheet" href="/bower_components/atomjump/css/comments-0.9.1.css?ver=1">
			
			<!-- Bootstrap HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
			<!--[if lt IE 9]>
			  <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
			  <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
			<![endif]-->
			
			<script>
				//Add your configuration here for AtomJump Messaging
				var ajFeedback = {
					"uniqueFeedbackId" : "test_feedback",		//This can be anything globally unique to your company/page	
					"myMachineUser" : "92.27.10.17:8",	/* Obtain this value from
							1. Settings
							2. Entering an email, click 'more', and then a password
							3. Click 'Login'
							4. Settings
							5. Clicking: 'Advanced'
							6. Copy the myMachineUser value into here.
							*/
					"server":  "https://atomjump.com/api"
				}
			</script>
			<script type="text/javascript" src="/bower_components/atomjump/js/chat.js"></script>
<!-- AtomJump Feedback Ends -->
```

* Copy into the 'BEFORE THE </BODY> CLOSING TAG (FOOTER)' section:

```
<!-- Any link on the page can start with '#comment-open-', followed by the forum name and it will open a popup -->
<div id="comment-holder"></div><!-- holds the popup comments. Can be anywhere between the <body> tags -->
```





For more details see
http://atomjump.org



