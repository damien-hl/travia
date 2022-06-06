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
import 'aos/dist/aos.css';
import './assets/scss/main.scss';

// JavaScript
import AOS from 'aos';
import { Menu } from './assets/js/Menu';
import { Modal } from './assets/js/Modal';
import { Form } from './assets/js/Form';
import ScrollBack from './assets/js/ScrollBack';

window.customElements.define('travia-scroll-back', ScrollBack);

AOS.init();

document.addEventListener('DOMContentLoaded', () => {

  AOS.init({
    offset: 200,
  });

  new Menu();
  new Modal();
  new Form();
  new ScrollBack();

});
