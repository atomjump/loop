<img src="https://atomjump.com/images/logo80.png">

# AtomJump Messaging Front-end 
**(sometimes called the 'loop' project)**

This tool provides a 'WhatsApp-like' group discussion forum from a popup on your website. It is good for general messaging, either within a company or family, in either a private or public setting. You can add this to your site easily from
http://atomjump.org/wp/add-atomjump-messaging-to-your-site/

The client software is entirely Javascript and CSS, but it refers to an AtomJump Messaging server to store messages. This is freely available as a separate project at https://src.atomjump.com/atomjump/loop-server, or you can use the AtomJump.com server, by default.

Private forums on the hosted AtomJump.com hosted platform are purchased for US$10 / year to cover the (non-profit) Foundation's costs, but public forums are free, within reason.

See the demo at <a href="http://atomjump.org">AtomJump</a>

You can adjust the styling by making changes to the CSS file for your project.




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

Or, you can add the 'comment-open' class to a link with an 'id' referring to the forum name (you also need a 'data-useid' tag):
```<a class="comment-open" id="my_different_forum_name" data-useid="true"  href="javascript:">Open special forum</a>```

Or, for further control over the owner of the forum, you can add the following data tags, and enter your own names/ips:
```<a class="comment-open" data-uniquefeedbackid="my_different_forum_name" data-mymachineuser="10.12.13.14:2" href="javascript:">Open special forum</a>```



## To open custom URLs within notifications

When the app or email setup sends notifications, it provides a clickable address for the user to go to in order to see the forum. If the usual current web address is behind a token or password, this link needs a lead-up page to allow for client-side logins. You can set this address with the 'data-notifyurl' token.

```<a class="comment-open" data-notifyurl="https://myurl.behind/?token=password-protected-page"  href="javascript:">Open with specific notification URL</a>```



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
   Your AtomJump Messaging email address from the standard interface
2. **pass**  
   Your AtomJump Messaging password
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

1. Install the ‘Header and Footer’ plugin. https://wordpress.org/plugins/insert-headers-and-footers/
2. Go into ‘Settings->Header and Footer’, and enter the two sections from http://atomjump.org/wp/add-atomjump-messaging-to-your-site/. The main block should be entered into the ‘SECTION INJECTION’ section, and the ‘comment holder’ div should be entered into the ‘BEFORE THE CLOSING TAG (FOOTER)’ section.
3. Any link’s address (i.e. the ‘href’) on the page can now start with ‘#comment-open-‘, followed by the forum name and it will open a popup.





For more details see
http://atomjump.org



# Contributing

Contributions are welcome, and they can take the shape of:

1. Core: Submit github pull requests. We will need to consider whether the feature should be in core or as an option.  It is generally a good idea to get in touch with us via our homepage at http://atomjump.org to ensure we are not already working on a similar feature.
2. Translations: We are looking for any translations of the chat-x.y.z.js files from English into your language. We have machine translated Spanish as a first step, but we need help in ensuring this is a good translation, and applying other languages.


# License

This software is open source under the MIT license. Copyright is with the AtomJump Foundation (New Zealand), a non-profit society.  You can use this software for any commercial purposes.




