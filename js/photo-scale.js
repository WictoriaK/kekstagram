const SCALE_STEP = 25;
const MAX_SCALE_NUMBER = 100;
const MIN_SCALE_NUMBER = 25;
const DEFAULT_SCALE_NUMBER = 100;

const scaleControlSmallerElement = document.querySelector('.scale__control--smaller');
const scaleControlBiggerElement = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imageUploadPreviewElement = document.querySelector('.img-upload__preview img');

const scaleImage = (value) => {
  imageUploadPreviewElement.style.transform = `scale(${value / 100})`;
  scaleControlValue.value = `${value}%`;
};

const onSmallerButtonClick = () => {
  scaleImage(
    Math.max(parseInt(scaleControlValue.value, 10) - SCALE_STEP, MIN_SCALE_NUMBER)
  );
};

const onBiggerButtonClick = () => {
  scaleImage(
    Math.min(parseInt(scaleControlValue.value, 10) + SCALE_STEP, MAX_SCALE_NUMBER)
  );
};

const resetScaleImage = () => {
  scaleImage(DEFAULT_SCALE_NUMBER);
};

scaleControlSmallerElement.addEventListener('click', onSmallerButtonClick);
scaleControlBiggerElement.addEventListener('click',onBiggerButtonClick);

export {resetScaleImage};


