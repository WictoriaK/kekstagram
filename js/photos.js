import {showBigPhoto} from './fullPhoto.js';

const photoListElement =  document.querySelector('.pictures');
const photoTemplateElement = document.querySelector('#picture').content.querySelector('.picture');

// клонируем шаблон фото и заполняет данными
const createPhotos = ((data) => {
  const {url, likes, comments} = data;
  const photoElement = photoTemplateElement.cloneNode(true);

  photoElement.querySelector('.picture__img').src = url;
  photoElement.querySelector('.picture__likes').textContent = likes;
  photoElement.querySelector('.picture__comments').textContent = comments.length;

  photoElement.addEventListener('click', () => {
    showBigPhoto(data);
  });

  return photoElement;
});


// заполняем documentFragment фото и вставляем в список фото
const renderPhotos = (photos) => {
  const photosFragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const photoElement = createPhotos(photo);
    photosFragment.appendChild(photoElement);
  });

  photoListElement.appendChild(photosFragment);
};


export {renderPhotos};
