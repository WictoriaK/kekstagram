
import { renderPhotos } from './photos.js';
import {onFormSubmit, hideUploadOverlay } from './form.js';
import './photo-scale.js';
import './photo-effects.js';
import {getData} from './api.js';


getData((photos) => renderPhotos(photos));

onFormSubmit(hideUploadOverlay);
