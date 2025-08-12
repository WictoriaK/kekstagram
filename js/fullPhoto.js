import { isEscapeKey } from './utils.js';

const COMMENTS_AMOUNT_TO_SHOW = 5;
const bigPhotoElement = document.querySelector('.big-picture');
const commentTemplate = document.querySelector('#social-comment').content.querySelector('.social__comment');
const commentsList = document.querySelector('.social__comments');
const body = document.querySelector('body');
const commentCount = document.querySelector('.social__comment-count');
const commentsLoaderBtn = document.querySelector('.comments-loader');
const closeBigPhotoBtn = document.querySelector('.big-picture__cancel');

let shownComments = 0;
let allComments = [];

const createComment = ({avatar, name,  message}) => {
  const commentElement = commentTemplate.cloneNode(true);

  commentElement.querySelector('.social__picture').src = avatar;
  commentElement.querySelector('.social__picture').alt = name;
  commentElement.querySelector('.social__text').innerHTML = message;

  return commentElement;
};

const renderComments = () => {
  const commentsFragment = document.createDocumentFragment();
  const commentToRender = allComments.slice(shownComments, shownComments + COMMENTS_AMOUNT_TO_SHOW);

  commentToRender.forEach((comment) => {
    const commentElement = createComment(comment);
    commentsFragment.append(commentElement);
  });

  commentsList.appendChild(commentsFragment);
  shownComments += commentToRender.length;

  commentCount.firstChild.textContent = `${shownComments} из `;

  if(shownComments >= allComments.length) {
    commentsLoaderBtn.classList.add('hidden');
  } else {
    commentsLoaderBtn.classList.remove('hidden');
  }
};

const onCommentLoaderClick = () => {
  renderComments();
};


const hideBigPhoto = () => {
  bigPhotoElement.classList.add('hidden');
  body.classList.remove('modal-open');
  commentsLoaderBtn.classList.add('hidden');
  commentCount.classList.add('hidden');
  document.removeEventListener('keydown', onBigPhotoEscKeyDown);
};

function onBigPhotoEscKeyDown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideBigPhoto();
  }
}

const onCloseBtn = () => {
  hideBigPhoto();
};


const renderBigPhoto = ({url, likes, description, comments}) => {
  bigPhotoElement.querySelector('.big-picture__img img').src = url;
  bigPhotoElement.querySelector('.big-picture__img img').alt = description;
  bigPhotoElement.querySelector('.likes-count').textContent = likes;
  bigPhotoElement.querySelector('.comments-count').textContent = comments.length;
  bigPhotoElement.querySelector('.social__caption').textContent = description;
};

const showBigPhoto = (data) => {
  allComments = data.comments;
  shownComments = 0;
  commentsList.innerHTML = '';

  bigPhotoElement.classList.remove('hidden');
  body.classList.add('modal-open');
  commentCount.classList.remove('hidden');
  document.addEventListener('keydown', onBigPhotoEscKeyDown);

  renderBigPhoto(data);
  renderComments();
  commentsLoaderBtn.addEventListener('click', onCommentLoaderClick);
};


closeBigPhotoBtn.addEventListener('click', onCloseBtn);

export {showBigPhoto};
