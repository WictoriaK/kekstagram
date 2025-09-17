import {isEscapeKey} from './utils.js';

const body = document.querySelector('body');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const alertElement = errorTemplate.cloneNode(true);
const errorBtn = alertElement.querySelector('.error__button');

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const successElement = successTemplate.cloneNode(true);
const successBtn = successElement.querySelector('.success__button');

const showErrorAlert = () => {
  body.append(alertElement);
  document.addEventListener('keydown', onErrorEscKeyDown);
};

const closeErrorAlert = () => {
  alertElement.remove();
  document.removeEventListener('keydown', onErrorEscKeyDown);
};

function onErrorEscKeyDown(evt) {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    closeErrorAlert();
  }
}

const showSuccessAlert = () => {
  body.append(successElement);
  document.addEventListener('keydown', onSuccessEscKeyDown);
};

const closeSuccessAlert = () => {
  successElement.remove();
  document.removeEventListener('keydown', onSuccessEscKeyDown);
};

function onSuccessEscKeyDown(evt) {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    closeSuccessAlert();
  }
}

errorBtn.addEventListener('click', closeErrorAlert);
alertElement.addEventListener('click', closeErrorAlert);

successBtn.addEventListener('click', closeSuccessAlert);
successElement.addEventListener('click', closeSuccessAlert);

export {showErrorAlert, showSuccessAlert};
