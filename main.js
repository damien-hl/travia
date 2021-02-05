// Fonts
import '@fontsource/buenard/400.css';
import '@fontsource/buenard/700.css';
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';

// Styles
import 'normalize.css';
import './assets/scss/main.scss';

// JavaScript
import { Menu } from './assets/js/Menu';
import { Modal } from './assets/js/Modal';
import { Form } from './assets/js/Form';

document.addEventListener('DOMContentLoaded', () => {

  new Menu();
  new Modal();
  new Form();

});
