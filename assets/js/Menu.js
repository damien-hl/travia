export class Menu {

  constructor() {
    this.app = document.getElementById('app');
    this.openButton = document.getElementById('nav-toggle-open');
    this.closeButton = document.getElementById('nav-toggle-close');
    this.navMenu = document.getElementById('nav-menu');
    this.mobileMql = matchMedia('(max-width: 991.98px)');

    this.setup();
  }

  setup() {
    this.openButton.addEventListener('click', this.onClick.bind(this));
    this.closeButton.addEventListener('click', this.onClick.bind(this));
  }

  addOffClick(event, callback) {
    const offClick = e => {
      if (e !== event) {
        callback({ open: false });
        this.mobileMql.removeEventListener('change', offClick);
        document.removeEventListener('click', offClick);
      }
    }
    this.mobileMql.addEventListener('change', offClick);
    document.addEventListener('click', offClick);
  }

  onClick(event) {
    const toggleMenu = ({ open = false }) => {
      if (open) {
        document.body.classList.add('no-scroll');
        this.navMenu.setAttribute('aria-expanded', 'true');

        setTimeout(() => {
          this.app.classList.add('open');
        }, 25);

      } else {
        this.app.classList.remove('open')

        setTimeout(() => {
          this.navMenu.setAttribute('aria-expanded', 'false');
          document.body.classList.remove('no-scroll')
        }, 500);

      }
    }

    if (!this.app.classList.contains('open')) {
      toggleMenu({ open: true })
      this.addOffClick(event, toggleMenu);
    }
  }

}
