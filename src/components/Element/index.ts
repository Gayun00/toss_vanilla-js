export class Element {
  #$element: HTMLElement;

  constructor() {
    this.#$element = document.createElement("div");
  }

  render() {
    return this.#$element;
  }

  add($child: HTMLElement) {
    if (!$child) return;
    this.#$element?.appendChild($child);
  }

  attachTo($parent: HTMLElement) {
    if (this.#$element) $parent?.appendChild(this.#$element);
  }

  set setElement(value: HTMLElement) {
    this.#$element = value;
  }

  get getElement() {
    return this.#$element;
  }
}
