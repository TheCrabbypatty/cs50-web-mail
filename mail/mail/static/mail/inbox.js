document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);
  document.querySelector('#compose-form').addEventListener('submit', send_email);


  function send_email(event) {
    event.preventDefault();
    fetch('/emails', {
    method: 'POST',
    body: JSON.stringify({
        recipients: document.querySelector('#compose-recipients').value,
        subject: document.querySelector('#compose-subject').value,
        body: document.querySelector('#compose-body').value
      })
    })
    .then(response => response.json())
    .then(result => {
        console.log(result);

        if (result.error) {
        alert(result.error);
        return;
      }

        load_mailbox('sent');
    });
}
  

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';
  document.querySelector('#email-view').style.display = 'none';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#email-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
  fetch(`/emails/${mailbox}`)
  .then(response => response.json())
  .then(emails => {
    console.log(emails);
    emails.forEach(email => {
      const element = document.createElement("div")
      element.className = 'email-item'
      if (email.read) {
         element.classList.add("read");
      }else{
        element.classList.add("unread");
      }
      element.addEventListener('click', () => load_email(email.id));
      element.innerHTML = `
          <strong class = "sender">${email.sender}</strong> 
          ${email.subject}
          <span class = "timestamp">${email.timestamp}</span>      
        `;
      element.style.border = "1px solid grey";
      element.style.borderRadius = "10px";
      element.style.padding = "20px";
      document.querySelector('#emails-view').append(element);
    }
    )
});
}

function load_email(id) {
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#email-view').style.display = 'block';

  fetch(`/emails/${id}`, {
  method: 'PUT',
  body: JSON.stringify({
      read: true
  })
  });

  fetch(`/emails/${id}`)
    .then(response => response.json())
    .then(email => {

      console.log(email);  
      
      const element = document.createElement("button");
      if (email.archived){
        element.innerText = "Unarchive";   
        element.addEventListener('click', function() { 
        fetch(`/emails/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          archived: false
        })
        });
        load_mailbox("inbox")
        });                                                                                                                                                                                           
      }else{
        element.innerText = "Archive";
        element.addEventListener('click', function() { 
        fetch(`/emails/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          archived: true
        })
        });
        load_mailbox("archive")
        }); 
      }

      document.querySelector('#email-view').innerHTML = `
        <p><strong>From:</strong> ${email.sender}</p>
        <p><strong>To:</strong> ${email.recipients}</p>
        <p><strong>Subject:</strong> ${email.subject}</p>
        <p><strong>Timestamp:</strong> ${email.timestamp}</p>
        <p><strong>Recipients:</strong> ${email.recipients}</p>
        <hr>
        <p>${email.body}</p>
      `;

      document.querySelector('#email-view').append(element);

      const reply = document.createElement("button");
      reply.innerText = "Reply";
      reply.addEventListener('click', function(){
          compose_email();
          fetch(`/emails/${id}`)
          .then(response => response.json())
          .then(email => {
            compose_email();
            document.querySelector("#compose-recipients").value = email.sender;
            document.querySelector("#compose-recipients").value = email.sender
             let subject = email.subject;
                if (!subject.startsWith("Re:")) {
                subject = "Re: " + subject;
                }
            document.querySelector("#compose-subject").value = subject;
            document.querySelector("#compose-body").value = `On ${email.timestamp} ${email.sender} wrote: ${email.body}`

          });
          });
      document.querySelector('#email-view').append(reply);

    });
}
});
