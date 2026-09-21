export class ScrollToTop {
  constructor(private readonly triggerElement: HTMLButtonElement) {
    this.#setup()
  }

  /**
   * Setup listeners
   */
  #setup() {
    window.addEventListener('scroll', this.#onScroll.bind(this))
    this.triggerElement.addEventListener('click', this.#onClick.bind(this))

    this.#onScroll()
  }

  dispose() {
    this.triggerElement.removeEventListener('click', this.#onClick)
    window.removeEventListener('scroll', this.#onScroll)
  }

  #onScroll = () => {
    const scroll = window.scrollY

    if (scroll > 0) {
      this.triggerElement.style.display = 'block'
    } else {
      this.triggerElement.style.display = 'none'
    }
  }

  #onClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
}
