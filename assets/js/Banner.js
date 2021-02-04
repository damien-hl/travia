import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)

export class Banner {
  constructor() {
    this.element = document.querySelector('section.banner');

    this.setup();
  }
}