const styleEffect = {
  DEFAULT: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
};

const filterEffects = {
  [styleEffect.DEFAULT]: {
    style: 'none',
    unit: ''
  },
  [styleEffect.CHROME]: {
    style: 'grayscale',
    unit: ''
  },
  [styleEffect.SEPIA]: {
    style: 'sepia',
    unit: ''
  },
  [styleEffect.MARVIN]: {
    style: 'invert',
    unit: '%'
  },
  [styleEffect.PHOBOS]: {
    style: 'blur',
    unit: 'px'
  },
  [styleEffect.HEAT]: {
    style: 'brightness',
    unit: ''
  },
};

const sliderOptionsEffect = {
  [styleEffect.DEFAULT]: {
    min: 0,
    max: 100,
    step: 1
  },
  [styleEffect.CHROME]: {
    min: 0,
    max: 1,
    step: 0.1
  },
  [styleEffect.SEPIA]: {
    min: 0,
    max: 1,
    step: 0.1
  },
  [styleEffect.MARVIN]: {
    min: 0,
    max: 100,
    step: 1
  },
  [styleEffect.PHOBOS]: {
    min: 0,
    max: 3,
    step: 0.1
  },
  [styleEffect.HEAT]: {
    min: 1,
    max: 3,
    step: 0.1
  },
};


const imageUploadPreview = document.querySelector('.img-upload__preview img');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const effectsList = document.querySelector('.effects__list');
const effectLevelValue = document.querySelector('.effect-level__value');

// set effect
let chosenEffect = styleEffect.DEFAULT;

const showSlider = () => {
  sliderContainer.classList.remove('hidden');
};

const hideSlider = () => {
  sliderContainer.classList.add('hidden');
};

const isDefaultEffect = () => chosenEffect === styleEffect.DEFAULT;

const setImageEffect = () => {
  if(isDefaultEffect()) {
    imageUploadPreview.style.filter = null;
    return;
  }

  const { value } = effectLevelValue;
  const { style, unit } = filterEffects[chosenEffect];

  imageUploadPreview.style.filter = `${style}(${value}${unit})`;
  imageUploadPreview.classList.add(`effects__preview--${chosenEffect}`);
};

const onSliderUpdate = () => {
  effectLevelValue.value = sliderElement.noUiSlider.get();
  setImageEffect();
};

const createSlider = ({min, max, step}) => {
  noUiSlider.create(sliderElement, {
    range: {
      min,
      max
    },
    start: min,
    step,
    connect: 'lower',
    format: {
      to: (value) => Number(value),
      from: (value) => Number(value),
    }
  });

  sliderElement.noUiSlider.on('update', onSliderUpdate);
};

const updateSliderOptions = ({min, max, step}) => {
  sliderElement.noUiSlider.updateOptions({
    range: {min, max},
    step,
    start: min,
  });
};

const setSlider = () => {
  if(isDefaultEffect()) {
    hideSlider();
  } else {
    showSlider();
    updateSliderOptions(sliderOptionsEffect[chosenEffect]);
  }
};

const setPhotoEffect = (effect) => {
  chosenEffect = effect;
  setSlider();
  setImageEffect();
};

const resetSliderEffect = () => {
  setPhotoEffect(styleEffect.DEFAULT);
};

const onPhotoEffectChange = (evt) => {
  imageUploadPreview.className = '';
  setPhotoEffect(evt.target.value);
};

const initSliderEffect = () => {
  createSlider(sliderOptionsEffect[chosenEffect]);
  effectsList.addEventListener('change', onPhotoEffectChange);
};


export  {initSliderEffect, resetSliderEffect}
