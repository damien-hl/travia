class FormElement extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.addEventListener("submit", this.#onSubmit);
  }

  disconnectedCallback() {
    this.removeEventListener("submit", this.#onSubmit);
  }

  #onSubmit(e: SubmitEvent) {
    e.preventDefault();
  }
}

export default FormElement;
