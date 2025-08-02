import { isEscapeKey } from './utils.js';

const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAGS_AMOUNT = 5;


const errorMessages = {
  INVALID_COUNT: `Максимальное количество хэштегов ${MAX_HASHTAGS_AMOUNT}`,
  NOT_UNIQ: 'Хэштеги не должны повторяться',
  INVALID_PATTERN: 'Хэш-тег должен начинается с символа #, состоять из букв и чисел и не может содержать пробелы, спецсимволы, символы пунктуации эмодзи и т. д..'
};

const photoUploadFormElement = document.querySelector('.img-upload__form');
const uploadPhotoElement =photoUploadFormElement.querySelector('#upload-file');
const hashtagField = document.querySelector('.text__hashtags');
const commentTextField = document.querySelector('.text__description');
const editPhotoElement = photoUploadFormElement.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const cancelPhotoUpload = photoUploadFormElement.querySelector('#upload-cancel');


const isFocused = () => document.activeElement === hashtagField || document.activeElement === commentTextField;


const pristine = new Pristine(photoUploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
}, true);


const convertTags = (tagString) => tagString.trim().split(' ').filter((tag) => tag.trim().length);

const isTagValid = (value) => convertTags(value).every((tag) => HASHTAG_REGEX.test(tag));

const isCountValid = (value) => convertTags(value).length <= MAX_HASHTAG_LENGTH;

const isUniq = (value) => {
  const lowerCaseTags = convertTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};


const uploadNewPhoto = () => {
  editPhotoElement.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onEscKeydown);
};

const hideUploadOverlay = () => {
  photoUploadFormElement.reset();
  pristine.reset();
  editPhotoElement.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeydown);
};

const onCloseUploadBtn = () => {
  hideUploadOverlay();
};


function onEscKeydown (evt) {
  if (isEscapeKey(evt) && !isFocused()) {
    evt.preventDefault();
    hideUploadOverlay();
  }
}


pristine.addValidator(
  hashtagField,
  isTagValid,
  errorMessages.INVALID_PATTERN,
  1,
  true
);

pristine.addValidator(
  hashtagField,
  isCountValid,
  errorMessages.INVALID_COUNT,
  2,
  true
);


pristine.addValidator(
  hashtagField,
  isUniq,
  errorMessages.NOT_UNIQ,
  3,
  true
);

const onFormSubmit = (evt) => {
  evt.preventDefault();
  const isValid =  pristine.validate();

  if(isValid) {
    console.log('good');
  } else {
    console.log('bad');
  }

};


uploadPhotoElement.addEventListener('change', uploadNewPhoto);
cancelPhotoUpload.addEventListener('click', onCloseUploadBtn);
photoUploadFormElement.addEventListener('submit', onFormSubmit);
