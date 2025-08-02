import { getPhotos} from './data.js';
import { renderPhotos } from './photos.js';
import './form.js';


renderPhotos(getPhotos());
