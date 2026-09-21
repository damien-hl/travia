export class Modal {
  private readonly app: HTMLElement;
  private readonly openButton: HTMLElement;
  private readonly modal: HTMLElement;
  private readonly video: HTMLVideoElement;

  /**
   * @constructor Create a modal instance to display a video
   */
  constructor() {
    const app = document.getElementById("app");
    const openButton = document.getElementById("modal-video-open");
    const modal = document.getElementById("modal-video");
    const video = modal?.querySelector("video");

    if (!app || !openButton || !modal || !video) {
      throw new Error("Cannot initialize Modal: required DOM elements are missing.");
    }

    this.app = app;
    this.openButton = openButton;
    this.modal = modal;
    this.video = video;

    this.setup();
  }

  /**
   * Setup listeners
   */
  setup() {
    this.openButton.addEventListener("click", this.onClick.bind(this));
  }

  /**
   * Attach outside click to the document
   */
  addOffClick(event: Event, callback: (state: { open?: boolean }) => void) {
    /**
     * Determine if click should close the modal
     */
    const offClick = (e: Event) => {
      if (e !== event) {
        callback({ open: false });
        document.removeEventListener("click", offClick);
        document.removeEventListener("keydown", escKey);
        this.video.removeEventListener("ended", offClick);
      }
    };

    /**
     * Determine the 'Escape' has been pressed
     */
    const escKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") {
        return;
      }

      offClick(e);
    };
    document.addEventListener("click", offClick);
    document.addEventListener("keydown", escKey);
    this.video.addEventListener("ended", offClick);
  }

  /**
   * Determine what to do when the modal button is clicked
   */
  onClick(event: Event) {
    /**
     * Switch classes and attributes to set the modal state
     */
    const toggleModal = ({ open = false }: { open?: boolean }) => {
      if (open) {
        document.body.classList.add("no-scroll");
        this.modal.classList.add("is-visible");
        this.modal.setAttribute("aria-hidden", "false");

        setTimeout(() => {
          this.app.classList.add("modal-is-open");
          this.video.play();
        }, 25);
      } else {
        this.app.classList.remove("modal-is-open");
        this.video.pause();

        setTimeout(() => {
          this.modal.setAttribute("aria-hidden", "true");
          this.modal.classList.remove("is-visible");
          document.body.classList.remove("no-scroll");
        }, 500);
      }
    };

    if (!this.app.classList.contains("menu-is-open")) {
      toggleModal({ open: true });
      this.addOffClick(event, toggleModal);
    }
  }
}
