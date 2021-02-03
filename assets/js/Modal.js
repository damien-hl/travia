export class Modal {

  constructor() {
    this.app = document.getElementById('app');
    this.openButton = document.getElementById('modal-video-open');
    this.modal = document.getElementById('modal-video');
    this.video = this.modal.querySelector('video');

    this.setup();
  }

  setup() {
    this.openButton.addEventListener('click', this.onClick.bind(this));
  }

  addOffClick(event, callback) {
    const offClick = e => {
      if (e !== event) {
        callback({ open: false });
        document.removeEventListener('click', offClick);
        this.video.removeEventListener('ended', offClick);
      }
    }
    document.addEventListener('click', offClick);
    this.video.addEventListener('ended', offClick);
    // TODO add escape key listener
  }

  onClick(event) {
    const toggleModal = ({ open = false }) => {
      if (open) {
        document.body.classList.add('no-scroll');
        this.modal.classList.add('is-visible');

        setTimeout(() => {
          this.app.classList.add('modal-is-open');
          this.video.play();
        }, 25);

      } else {
        this.app.classList.remove('modal-is-open');
        this.video.pause();

        setTimeout(() => {
          this.modal.classList.remove('is-visible');
          document.body.classList.remove('no-scroll')
        }, 500);

      }
    }

    if (!this.app.classList.contains('menu-is-open')) {
      toggleModal({ open: true })
      this.addOffClick(event, toggleModal);
    }
  }

}
