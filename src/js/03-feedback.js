import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
const email = document.querySelector('input');
const message = document.querySelector('textarea');

feedbackForm.addEventListener('input', throttle(handlerInput, 500));
feedbackForm.addEventListener('submit', handlerSubmit);

const data = JSON.parse(localStorage.getItem('feedback-form-state'));
let feedbackFormState = data || {};

fillForm();

function handlerInput({ target }) {
  feedbackFormState[target.name] = target.value;

  localStorage.setItem(
    'feedback-form-state',
    JSON.stringify(feedbackFormState)
  );
}

function fillForm() {
  if (data) {
    email.value = data.email || '';
    message.value = data.message || '';
  }
}

function handlerSubmit(event) {
  event.preventDefault();
  if (email.value === '' || message.value === '') {
    return alert('All fields should be completed');
  }
  console.log(feedbackFormState);
  localStorage.removeItem('feedback-form-state');
  feedbackForm.reset();
  feedbackFormState = {};
}
