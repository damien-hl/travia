class ScrollBackElement extends HTMLElement {
  #scroll = 0;
  #button: HTMLButtonElement;

  constructor() {
    super();

    const button = this.querySelector<HTMLButtonElement>('button[aria-label="Scroll to top"]');
    if (!button) {
      throw new Error("Cannot initialize ScrollBackElement: scroll button is missing.");
    }
    this.#button = button;
    this.#onScroll();
  }

  connectedCallback() {
    window.addEventListener("scroll", this.#onScroll.bind(this));
    this.#button.addEventListener("click", this.#onClick.bind(this));
  }

  disconnectedCallback() {
    this.#button.removeEventListener("click", this.#onClick.bind(this));
    window.removeEventListener("scroll", this.#onScroll.bind(this));
  }

  #onScroll() {
    this.#scroll = window.scrollY;

    if (this.#scroll > 0) {
      this.style.display = "block";
    } else {
      this.style.display = "none";
    }
  }

  #onClick() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
}

export default ScrollBackElement;
