<h1>CS50 Mail</h1>

This project is a front-end email client built for Harvard’s CS50 Web Programming with Python and JavaScript. It communicates with a provided API to send, receive, archive, and reply to emails. The interface is implemented as a single-page application using vanilla JavaScript.

<h2>Features</h2>
<h3>Mailboxes</h3>

* Inbox, Sent, and Archive views
* Emails display sender, subject, and timestamp
* Read emails are visually distinguished from unread emails
* Clicking an email loads the full message view
  
<h3>Compose Email</h3>

* Users can send new emails through a form
* Supports multiple recipients
* Redirects to the Sent mailbox after sending
  
<h3>View Email</h3>

* Displays full details: sender, recipients, subject, timestamp, and body
* Marks the email as read when opened
* Provides Archive/Unarchive and Reply buttons
  
<h3>Archive / Unarchive</h3>

* Toggles the archived state of an email using a PUT request
* Returns the user to the appropriate mailbox after updating
  
<h3>Reply</h3>
Opens the compose form pre-filled with:

	The original sender as the recipient
	A subject prefixed with “Re:” if needed
	A quoted line containing the original timestamp, sender, and message body
	
* Users can edit the message before sending
  
<h2>JavaScript Overview</h2>
The application uses JavaScript to:

* Fetch mailbox and email data from the API
* Update email state with PUT requests
* Dynamically switch between views
* Build DOM elements for mailbox listings and email details
* Handle form submissions for sending new emails
  
<h2>Key Functions</h2>

* load_mailbox(mailbox) — loads inbox, sent, or archive
* compose_email() — shows the compose form
* send_email() — sends a POST request to create a new email
* load_email(id) — loads a single email and attaches archive/reply buttons


## Last Updated

<!-- TIMESTAMP_START -->
_Last updated: 2026-09-05 09:00 UTC_
<!-- TIMESTAMP_END -->
