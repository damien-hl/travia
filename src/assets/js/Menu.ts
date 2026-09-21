export class Menu {
  private readonly app: HTMLElement;
  private readonly openButton: HTMLElement;
  private readonly closeButton: HTMLElement;
  private readonly navMenu: HTMLElement;
  private readonly mobileMql: MediaQueryList;

  /**
   * @constructor Create a menu instance to control the navigation menu behavior
   */
  constructor() {
    const app = document.getElementById("app");
    const openButton = document.getElementById("nav-toggle-open");
    const closeButton = document.getElementById("nav-toggle-close");
    const navMenu = document.getElementById("nav-menu");
    this.mobileMql = matchMedia("(max-width: 991.98px)");

    if (!app || !openButton || !closeButton || !navMenu) {
      throw new Error("Cannot initialize Menu: required DOM elements are missing.");
    }

    this.app = app;
    this.openButton = openButton;
    this.closeButton = closeButton;
    this.navMenu = navMenu;

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
     * Prevent bubbling up to the parents
     */
    const stopPropagation = (e: Event) => {
      e.stopPropagation();
    };

    /**
     * Determine if click should close the menu
     */
    const offClick = (e: Event) => {
      if (e !== event) {
        callback({ open: false });
        this.mobileMql.removeEventListener("change", offClick);
        document.removeEventListener("click", offClick);
        document.removeEventListener("keydown", escKey);
        this.closeButton.removeEventListener("click", offClick);
        this.navMenu.removeEventListener("click", stopPropagation);
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

    this.navMenu.addEventListener("click", stopPropagation);
    this.closeButton.addEventListener("click", offClick);
    document.addEventListener("keydown", escKey);
    document.addEventListener("click", offClick);
    this.mobileMql.addEventListener("change", offClick);
  }

  /**
   * Determine what to do when the menu is clicked
   */
  onClick(event: Event) {
    /**
     * Switch classes and attributes to set the menu state
     */
    const toggleMenu = ({ open = false }: { open?: boolean }) => {
      if (open) {
        document.body.classList.add("no-scroll");
        this.navMenu.setAttribute("aria-expanded", "true");

        setTimeout(() => {
          this.app.classList.add("menu-is-open");
        }, 25);
      } else {
        this.app.classList.remove("menu-is-open");

        setTimeout(() => {
          this.navMenu.setAttribute("aria-expanded", "false");
          document.body.classList.remove("no-scroll");
        }, 500);
      }
    };

    if (!this.app.classList.contains("menu-is-open")) {
      toggleMenu({ open: true });
      this.addOffClick(event, toggleMenu);
    }
  }
}
