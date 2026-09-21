export class Modal {
  private readonly video: HTMLVideoElement;

  constructor(
    private readonly modal: HTMLDivElement,
    private readonly trigger: HTMLElement,
  ) {
    const video = modal.querySelector("video");

    if (!video) {
      throw new Error("Cannot initialize Modal: required DOM elements are missing.");
    }

    this.video = video;

    this.setup();
  }

  /**
   * Setup listeners
   */
  private setup() {
    this.trigger.addEventListener("click", this.onClick);
  }

  /**
   * Dispose listeners
   */
  dispose() {
    this.trigger.removeEventListener("click", this.onClick);
  }

  /**
   * Attach outside click to the document
   */
  private addOffClick = (event: Event, callback: (state: { open?: boolean }) => void) => {
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
  };

  /**
   * Determine what to do when the modal button is clicked
   */
  private onClick = (event: Event) => {
    /**
     * Switch classes and attributes to set the modal state
     */
    const toggleModal = ({ open = false }: { open?: boolean }) => {
      if (open) {
        document.body.classList.add("no-scroll");

        this.modal.classList.add("is-visible");
        this.modal.setAttribute("aria-hidden", "false");

        setTimeout(() => {
          document.body.classList.add("modal-is-open");

          this.video.play();
        }, 25);
      } else {
        document.body.classList.remove("modal-is-open");

        this.video.pause();

        setTimeout(() => {
          this.modal.setAttribute("aria-hidden", "true");
          this.modal.classList.remove("is-visible");

          document.body.classList.remove("no-scroll");
        }, 500);
      }
    };

    if (!document.body.classList.contains("menu-is-open")) {
      toggleModal({ open: true });

      this.addOffClick(event, toggleModal);
    }
  };
}
