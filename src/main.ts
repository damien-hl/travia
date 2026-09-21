import AOS from "aos";

import { Menu } from "./assets/js/Menu";
import { Modal } from "./assets/js/Modal";
import { NewsletterForm } from "./assets/js/NewsletterForm";
import { ScrollToTop } from "./assets/js/ScrollToTop";

import "@fontsource/buenard/400.css";
import "@fontsource/buenard/700.css";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";

import "normalize.css";
import "aos/dist/aos.css";
import "./assets/scss/main.scss";

AOS.init({
  offset: 200,
});

document.addEventListener("DOMContentLoaded", () => {
  new Menu(document.querySelector("#nav-menu")!, document.querySelector("#nav-toggle-open")!);
  new Modal(document.querySelector("#modal-video")!, document.querySelector("#modal-video-open")!);
  new NewsletterForm(document.querySelector("#newsletter-form")!);
  new ScrollToTop(document.querySelector("#scroll-to-top")!);
});
