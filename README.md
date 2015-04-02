# loop
**Smart Feedback**

This tool provides a 'WhatsApp-like' group discussion forum from a popup on your website. It is ideal for feedback, but can also be used as a live discussion tool, or a CRM.  We actually run our entire operation off one page with several of these popups on it.

The client software is entirely Javascript and CSS, but it refers to an AtomJump server to store messages.  Supported platforms: IE8 upwards, Chrome, Firefox, Safari, Android Native, Android Chrome, Android Firefox, iPad, iPhone, Opera. There may be other supported platforms we haven't tested on.

See the demo at <a href="https://atomjump.com">AtomJump</a>

You are most welcome to adjust the styling by making changes to the CSS file for your project.




# Installation Instructions

1. Unpack into a web path. Run index.html in your browser.  You should see a 'Click me for comments' link. Click this to see the pop-up.

2. Look carefully at the index.html example.  

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
	
3. Copy the contents of /css into your own css path and adjust any references to suit your project's path.
4. Copy the contents of /js into your own js path and adjust any references to suit your project's path. 
Note: jQuery ver 1.9.1 is used.  Other jQuery versions will likely work also.
5. Adjust 'uniqueFeedbackId' value to a unique value to suit your feedback.  This can be unique per page or the same throughout the whole site.
6. Obtain the 'myMachineUser' value for each user by following the sub-steps below:

	1. Settings
	2. Entering an email/Password
	3. Click save
	4. Settings
	5. Clicking: 'Your password', then 'Developer Tools'
	6. Copy the myMachineUser into the myMachineUser value in your html file.

  This ensures only you as a logged in users will receive feedback from your site.
  Separate multiple users with a comma, e.g. "123.456.123.32:1200,123.456.123.32:1201"
  
7. If you wish to, you can send us your mobile phone number to receive SMS messages when there is any feedback
(at a cost of 16c per message. Messages within 5 minutes of each other do not trigger an SMS).  If you want to 
include an sms for the group modify the myMachineUser string on your page to include the 3rd term 'sms'
e.g. "123.456.123.32:1200:sms,123.456.123.32:1201:sms".  If you don't include an 'sms' for any one user, they
won't receive sms messages 

If you wish to send SMS messages, we will keep track of messages sent, and charge independently based on usage, on a monthly basis.


# To have more than one feedback forum on a single page

Add the following data tags, and enter your own names/ips:
```<a class="comment-open" data-uniquefeedbackid="my_different_forum_name" data-mymachineuser="10.12.13.14:2" href="javascript:">Open special forum</a>```


For more details see
https://atomjump.com

