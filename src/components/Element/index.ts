export class Element {
  #$element: HTMLElement | null;

  constructor($element: HTMLElement | null = null) {
    this.#$element = $element;
  }

  init($element: HTMLElement) {
    this.#$element = $element;
  }

  render(): HTMLElement | null {
    return this.#$element;
  }

  add($child: HTMLElement) {
    this.#$element?.appendChild($child);
  }

  attachTo($parent: HTMLElement) {
    if (this.#$element) $parent.appendChild(this.#$element);
  }

  set setElement(value: HTMLElement) {
    this.#$element = value;
  }

  get getElement(): HTMLElement | null {
    return this.#$element;
  }
}
