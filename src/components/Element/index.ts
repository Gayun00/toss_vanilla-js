export class Element {
  #$element: HTMLElement | null;

  constructor($element: HTMLElement | null = null) {
    this.#$element = $element;
  }

  init($element: HTMLElement) {
    this.#$element = $element;
  }

  render(): HTMLElement | null {
    if (!this.#$element) return null;
    return this.#$element;
  }

  add($child: HTMLElement | null) {
    if (!$child) return;
    this.#$element?.appendChild($child);
  }

  attachTo($parent: HTMLElement | null) {
    if (this.#$element) $parent?.appendChild(this.#$element);
  }

  set setElement(value: HTMLElement) {
    this.#$element = value;
  }

  get getElement(): HTMLElement | null {
    if (!this.#$element) return null;
    return this.#$element;
  }
}
