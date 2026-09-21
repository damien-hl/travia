export class Menu {
  private readonly closeTigger: HTMLButtonElement
  private readonly mobileMql: MediaQueryList

  /**
   * @constructor Create a menu instance to control the navigation menu behavior
   */
  constructor(
    private readonly navMenu: HTMLDivElement,
    private readonly openTrigger: HTMLButtonElement,
  ) {
    const closeTigger = navMenu.querySelector<HTMLButtonElement>('#nav-toggle-close')

    if (!closeTigger) {
      throw new Error('Cannot initialize Menu: required DOM elements are missing.')
    }

    this.mobileMql = matchMedia('(max-width: 991.98px)')

    this.closeTigger = closeTigger

    this.setup()
  }

  /**
   * Setup listeners
   */
  private setup() {
    this.openTrigger.addEventListener('click', this.onClick)
  }

  /**
   * Dispose listeners
   */
  dispose() {
    this.openTrigger.removeEventListener('click', this.onClick)
  }

  /**
   * Attach outside click to the document
   */
  private addOffClick = (event: Event, callback: (state: { open?: boolean }) => void) => {
    /**
     * Prevent bubbling up to the parents
     */
    const stopPropagation = (e: Event) => {
      e.stopPropagation()
    }

    /**
     * Determine if click should close the menu
     */
    const offClick = (e: Event) => {
      if (e !== event) {
        callback({ open: false })

        this.mobileMql.removeEventListener('change', offClick)

        document.removeEventListener('click', offClick)
        document.removeEventListener('keydown', escKey)

        this.closeTigger.removeEventListener('click', offClick)

        this.navMenu.removeEventListener('click', stopPropagation)
      }
    }

    /**
     * Determine the 'Escape' has been pressed
     */
    const escKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') {
        return
      }

      offClick(e)
    }

    this.navMenu.addEventListener('click', stopPropagation)

    this.closeTigger.addEventListener('click', offClick)

    document.addEventListener('keydown', escKey)
    document.addEventListener('click', offClick)

    this.mobileMql.addEventListener('change', offClick)
  }

  /**
   * Determine what to do when the menu is clicked
   */
  private onClick = (event: Event) => {
    /**
     * Switch classes and attributes to set the menu state
     */
    const toggleMenu = ({ open = false }: { open?: boolean }) => {
      if (open) {
        document.body.classList.add('no-scroll')
        this.navMenu.setAttribute('aria-expanded', 'true')

        setTimeout(() => {
          document.body.classList.add('menu-is-open')
        }, 25)
      } else {
        document.body.classList.remove('menu-is-open')

        setTimeout(() => {
          this.navMenu.setAttribute('aria-expanded', 'false')

          document.body.classList.remove('no-scroll')
        }, 500)
      }
    }

    if (!document.body.classList.contains('menu-is-open')) {
      toggleMenu({ open: true })

      this.addOffClick(event, toggleMenu)
    }
  }
}
