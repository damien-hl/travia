class FormElement extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.addEventListener('submit', this.#onSubmit);
    }

    disconnectedCallback() {
        this.removeEventListener('submit', this.#onSubmit);
    }

    /**
     * @param {Event} e 
     */
    #onSubmit(e) {
        e.preventDefault();
    }
}
export default FormElement;