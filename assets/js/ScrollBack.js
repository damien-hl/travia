export class ScrollBack {

  constructor() {
    this.element = document.getElementById('scroll-back');
    this.button = this.element.children.item(0);
    this.triggerY = document.querySelector('section.banner').clientHeight;

    this.setup();
  }

  setup() {
    window.addEventListener('scroll', this.onScroll.bind(this));
    this.button.addEventListener('click', this.onClick.bind(this));
    this.onScroll();
  }

  onScroll() {
    this.scrollY = window.scrollY;
    if (this.scrollY > this.triggerY) {
      this.element.style.display = 'block'
    } else {
      this.element.style.display = 'none'
    }
  }

  onClick() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

}