import { getPhotos} from './data.js';
import { renderPhotos } from './photos.js';
import './form.js';
import './photo-scale.js';
import './photo-effects.js';

renderPhotos(getPhotos());
