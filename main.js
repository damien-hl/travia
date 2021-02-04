// Fonts
import '@fontsource/buenard/400.css'
import '@fontsource/buenard/700.css'
import '@fontsource/poppins/300.css'
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/700.css'

// Styles
import 'normalize.css'
import './assets/scss/main.scss'

// JavaScript
import { Menu } from './assets/js/Menu'
import { Modal } from './assets/js/Modal'

document.addEventListener('DOMContentLoaded', () => {

  new Menu();
  new Modal();

  window.addEventListener('scroll', () => {
    let y = window.pageYOffset / 4;
    document.querySelector('section.banner').style.backgroundPositionY = 'calc(50% - ' + y + 'px)'
  })

});
