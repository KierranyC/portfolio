function toggleMenu() {
  const menu = document.querySelector('.menu-links');
  const icon = document.querySelector('.hamburger-icon');
  menu.classList.toggle('open')
  icon.classList.toggle('open')
}

document.querySelector('form').addEventListener('submit', function (event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const formMessages = document.querySelector('#form-messages');

  fetch(form.action, {
    method: form.method,
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      showModal('Thank you! Your message has been sent.');
      form.reset();
    } else {
      return response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
          showModal(data.errors.map(error => error.message).join(', '));
        } else {
          showModal('Oops! There was a problem submitting your form');
        }
      });
    }
  }).catch(error => {
    showModal('Oops! There was a problem submitting your form');
  });
});

function showModal(message) {
  const modal = document.getElementById('modal');
  const modalMessage = document.getElementById('modal-message');

  modalMessage.textContent = message;
  modal.style.display = 'block';
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
}
