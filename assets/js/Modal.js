export class Modal {

  /**
   * @constructor Create a modal instance to display a video
   */
  constructor() {
    this.app = document.getElementById('app');
    this.openButton = document.getElementById('modal-video-open');
    this.modal = document.getElementById('modal-video');
    this.video = this.modal.querySelector('video');

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
     * Determine if click should close the modal 
     * @param {Event} e 
     */
    const offClick = e => {
      if (e !== event) {
        callback({ open: false });
        document.removeEventListener('click', offClick);
        document.removeEventListener('keydown', escKey);
        this.video.removeEventListener('ended', offClick);
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
    document.addEventListener('click', offClick);
    document.addEventListener('keydown', escKey);
    this.video.addEventListener('ended', offClick);
  }

  /**
   * Determine what to do when the modal button is clicked
   * @param {Event} event 
   */
  onClick(event) {

    /**
     * Switch classes and attributes to set the modal state
     * @param {Object<string, boolean>} param 
     */
    const toggleModal = ({ open = false }) => {
      if (open) {
        document.body.classList.add('no-scroll');
        this.modal.classList.add('is-visible');
        this.modal.setAttribute('aria-hidden', 'false');

        setTimeout(() => {
          this.app.classList.add('modal-is-open');
          this.video.play();
        }, 25);

      } else {
        this.app.classList.remove('modal-is-open');
        this.video.pause();

        setTimeout(() => {
          this.modal.setAttribute('aria-hidden', 'true');
          this.modal.classList.remove('is-visible');
          document.body.classList.remove('no-scroll')
        }, 500);

      }
    }

    if (!this.app.classList.contains('menu-is-open')) {
      toggleModal({ open: true });
      this.addOffClick(event, toggleModal);
    }
  }

}
