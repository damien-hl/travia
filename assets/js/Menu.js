export class Menu {

  /**
   * @constructor Create a menu instance to control the navigation menu behavior
   */
  constructor() {
    this.app = document.getElementById('app');
    this.openButton = document.getElementById('nav-toggle-open');
    this.closeButton = document.getElementById('nav-toggle-close');
    this.navMenu = document.getElementById('nav-menu');
    this.mobileMql = matchMedia('(max-width: 991.98px)');

    this.setup();
  }

  /**
   * Setup listeners
   */
  setup() {
    this.openButton.addEventListener('click', this.onClick.bind(this));
  }

  /**
   * Attach outside click to the document
   * @param {Event} event 
   * @param {Function} callback 
   */
  addOffClick(event, callback) {

    /**
     * Prevent bubbling up to the parents
     * @param {Event} e 
     */
    const stopPropagation = e => {
      e.stopPropagation();
    }

    /**
     * Determine if click should close the menu 
     * @param {Event} e 
     */
    const offClick = e => {
      if (e !== event) {
        callback({ open: false });
        this.mobileMql.removeEventListener('change', offClick);
        document.removeEventListener('click', offClick);
        document.removeEventListener('keydown', escKey);
        this.closeButton.removeEventListener('click', offClick);
        this.navMenu.removeEventListener('click', stopPropagation);
      }
    }

    /**
     * Determine the 'Escape' has been pressed
     * @param {Event} e 
     */
    const escKey = e => {
      if (e.key !== 'Escape') {
        return;
      }

      offClick(e);
    }

    this.navMenu.addEventListener('click', stopPropagation);
    this.closeButton.addEventListener('click', offClick);
    document.addEventListener('keydown', escKey);
    document.addEventListener('click', offClick);
    this.mobileMql.addEventListener('change', offClick);
  }

  /**
   * Determine what to do when the menu is clicked
   * @param {Event} event 
   */
  onClick(event) {

    /**
     * Switch classes and attributes to set the menu state
     * @param {Object<string, boolean>} param 
     */
    const toggleMenu = ({ open = false }) => {
      if (open) {
        document.body.classList.add('no-scroll');
        this.navMenu.setAttribute('aria-expanded', 'true');

        setTimeout(() => {
          this.app.classList.add('menu-is-open');
        }, 25);

      } else {
        this.app.classList.remove('menu-is-open')

        setTimeout(() => {
          this.navMenu.setAttribute('aria-expanded', 'false');
          document.body.classList.remove('no-scroll')
        }, 500);

      }
    }

    if (!this.app.classList.contains('menu-is-open')) {
      toggleMenu({ open: true });
      this.addOffClick(event, toggleMenu);
    }
  }

}
