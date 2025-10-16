document.addEventListener('DOMContentLoaded', function () {
  var form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Honeypot check
    var gotcha = form.querySelector('input[name="_gotcha"]').value;
    var status = document.getElementById('form-status');
    if (gotcha) {
      status.textContent = 'Spam detected.';
      return;
    }

    // Basic client-side validation
    var email = form.querySelector('#email');
    if (!email.checkValidity()) {
      status.textContent = 'Please provide a valid email address.';
      email.focus();
      return;
    }

    var data = new FormData(form);

    fetch(form.action, {
      method: 'POST',
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    }).then(function (response) {
      if (response.ok) {
        // show a thank you message and remove the form
        var success = document.createElement('div');
        success.className = 'form-success';
        success.innerHTML = '<h3>Thanks — your message has been sent!</h3><p>We will get back to you shortly.</p>';
        form.parentNode.replaceChild(success, form);
      } else {
        response.json().then(function (data) {
          if (data && data.errors) {
            status.textContent = data.errors.map(function (err) { return err.message; }).join(', ');
          } else {
            status.textContent = 'Oops — there was a problem submitting the form.';
          }
        }).catch(function () {
          status.textContent = 'Oops — there was a problem submitting the form.';
        });
      }
    }).catch(function () {
      status.textContent = 'Network error — please try again later.';
    });
  });
});
