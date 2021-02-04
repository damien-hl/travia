export class Form {

  /**
   * @constructor Create a form instance to handle form submission
   */
  constructor() {
    this.element = document.getElementById('newsletter-form');

    this.setup();
  }

  /**
   * Setup listeners
   */
  setup() {
    this.element.addEventListener('submit', this.preventDefault.bind(this));
  }

  /**
   * Prevent default submission behavior
   * @param {Event} e 
   */
  preventDefault(e) {
    e.preventDefault();
  }

}