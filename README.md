<img src="https://atomjump.com/images/logo80.png">

# loop
**Open Messaging**

This tool provides a 'WhatsApp-like' group discussion forum from a popup on your website. It is good for feedback, but can also be used as a live discussion tool, or a CRM.  We actually run our entire operation off one page with several of these popups on it.

The client software is entirely Javascript and CSS, but it refers to an AtomJump server to store messages (this is optionally available as a separate project at http://github.com/atomjump/loop-server, or by default you can use the AtomJump.com server).  Supported platforms: IE8 upwards, Chrome, Firefox, Safari, Android Native, Android Chrome, Android Firefox, iPad, iPhone, Opera. There may be other supported platforms we haven't tested on.

See the demo at <a href="https://atomjump.com">AtomJump</a>

You are most welcome to adjust the styling by making changes to the CSS file for your project.




# Installation Instructions

With [bower](http://bower.io) from within the root of your project path:

**`bower install atomjump`**

(Or without bower, unpack into your project, edit index.html, and replace bootstrap css and javascript paths as mentioned)

Run atomjump/index.html in your browser.  You should see a 'Click me for comments' link. Click this to see the pop-up.




# Setup Instructions

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

1. Adjust 'uniqueFeedbackId' value to a unique value to suit your feedback.  This can be unique per page or the same throughout the whole site.

2. Obtain the 'myMachineUser' value by following the sub-steps below:

	1. Settings
	2. Entering an email/Password
	3. Click save
	4. Settings
	5. Clicking: 'Your password', then 'Advanced'
	6. Copy the myMachineUser into the myMachineUser value in your html file.

  This ensures only you as a logged in user will receive feedback from your site.
  
3. If you wish to, you can enter your mobile phone number under Settings to receive SMS messages when there is any feedback
(at a cost of 16c per message. Messages within 5 minutes of each other do not trigger an SMS).  If you want to 
include an sms modify the myMachineUser string on your page to include the 3rd term 'sms'
e.g. "123.456.123.32:1200:sms".  If you don't include an 'sms', you won't receive sms messages.

If you wish to send SMS messages, we will keep track of messages sent, and charge independently based on usage, on a monthly basis.


# To have more than one feedback forum on a single page

Add the following data tags, and enter your own names/ips:
```<a class="comment-open" data-uniquefeedbackid="my_different_forum_name" data-mymachineuser="10.12.13.14:2" href="javascript:">Open special forum</a>```


# To add more than one user to receive messages

Open the messaging forum in your browser.

1. Settings
2. Entering an email/Password
3. Click save
4. Settings
5. Clicking: 'Your password', then 'Advanced'
6. Edit the 'This forum's private owners' and put in each myMachineUser separated by a comma. 'sms' can be added individually to each user to optionally send an sms also.

e.g. "123.456.123.32:1200:sms,123.456.123.32:1201:sms"


# To change the theme

Add 

"cssBootstrap":"relative/url"

and

"cssFeedback":"relative/url/to/your/css"

to the ajFeedback object.

Note: your css file must be on an https server.


# To download a forum's messages programmatically

**Endpoint**
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

# Getting a live sentiment

Include the following parameters along with 1,2, and 3 above.

4. **format**

   Set to 'avg'
   
5. **duration**
 
   Period over which to average in seconds.
   
The response will be an average over the last period of all the message sentiment values.
This will be expressed as a single number eg. 5.324.
Note: it can take up to 1 minute before any new message's sentiment will be calculated.


For more details see
https://atomjump.com

