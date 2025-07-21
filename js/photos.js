const photoListElement =  document.querySelector('.pictures');
const photoTemplateElement = document.querySelector('#picture').content.querySelector('.picture');

// клонируем щ=шаблон фото и заполняет данными
const createPhotos = (({url, likes, comments}) => {
  const photoElement = photoTemplateElement.cloneNode(true);

  photoElement.querySelector('.picture__img').src = url;
  photoElement.querySelector('.picture__likes').textContent = likes;
  photoElement.querySelector('.picture__comments').textContent = comments.length;

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
