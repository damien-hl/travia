export class NewsletterForm {
  private timer: number | undefined;
  private restoreControls: (() => void) | undefined;

  constructor(private readonly formElement: HTMLFormElement) {
    this.setup();
  }

  /**
   * Setup listeners
   */
  private setup() {
    this.formElement.addEventListener("submit", this.onSubmit);
    this.formElement.addEventListener("input", this.onInput);
  }

  /**
   * Dispose listeners
   */
  dispose() {
    this.formElement.removeEventListener("submit", this.onSubmit);
    this.formElement.removeEventListener("input", this.onInput);

    window.clearTimeout(this.timer);

    this.timer = undefined;

    this.restoreControls?.();
    this.restoreControls = undefined;

    this.setStatus("");
  }

  private setStatus(message: string) {
    const status = this.formElement.querySelector<HTMLElement>('[role="status"]');
    if (status) {
      status.textContent = message;
    }
  }

  private onInput = () => {
    if (this.timer === undefined) {
      this.setStatus("");
    }
  };

  private onSubmit = (event: SubmitEvent) => {
    event.preventDefault();

    const form = event.target;
    if (!(form instanceof HTMLFormElement) || this.timer !== undefined) {
      return;
    }

    const email = form.querySelector<HTMLInputElement>('input[type="email"]');
    const submit = form.querySelector<HTMLInputElement>('input[type="submit"]');
    if (!email || !submit || !form.reportValidity()) {
      return;
    }

    const originalLabel = submit.value;
    const wasReadOnly = email.readOnly;
    const wasDisabled = submit.disabled;
    const wasBusy = form.getAttribute("aria-busy");

    this.restoreControls = () => {
      email.readOnly = wasReadOnly;
      submit.disabled = wasDisabled;
      submit.value = originalLabel;

      if (wasBusy === null) {
        form.removeAttribute("aria-busy");
      } else {
        form.setAttribute("aria-busy", wasBusy);
      }
    };

    email.readOnly = true;
    submit.disabled = true;
    submit.value = "Sending…";

    form.setAttribute("aria-busy", "true");

    this.setStatus("Submitting your subscription…");

    // Simulate a request without sending or storing the email address.
    this.timer = window.setTimeout(() => {
      this.timer = undefined;

      this.restoreControls?.();
      this.restoreControls = undefined;

      form.reset();

      this.setStatus(
        "Subscription simulated successfully. Demo only — no email was sent or saved.",
      );
    }, 1500);
  };
}
