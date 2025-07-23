const bigPhotoElement = document.querySelector('.big-picture');
const commentTemplate = document.querySelector('#social-comment').content.querySelector('.social__comment');
const commentsList = document.querySelector('.social__comments');
const body = document.querySelector('body');
const commentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const closeBigPhotoBtn = document.querySelector('.big-picture__cancel');

const createComment = ({avatar, name,  message}) => {
  const commentElement = commentTemplate.cloneNode(true);

  commentElement.querySelector('.social__picture').src = avatar;
  commentElement.querySelector('.social__picture').alt = name;
  commentElement.querySelector('.social__text').innerHTML = message;

  return commentElement;
};


const renderComments = (comments) => {
  commentsList.innerHTML = '';

  const commentsFragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const commentElement = createComment(comment);
    commentsFragment.appendChild(commentElement);
  });

  commentsList.appendChild(commentsFragment);
};

const hideBigPhoto = () => {
  bigPhotoElement.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyDown);
};

function onEscKeyDown (evt) {
  if (evt.keyCode === 27) {
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
  bigPhotoElement.classList.remove('hidden');
  body.classList.add('modal-open');
  commentsLoader.classList.add('hidden');
  commentCount.classList.add('hidden');
  document.addEventListener('keydown', onEscKeyDown);

  renderBigPhoto(data);
  renderComments(data.comments);
};

closeBigPhotoBtn.addEventListener('click', onCloseBtn);

export {showBigPhoto};
