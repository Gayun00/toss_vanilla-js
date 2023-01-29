export class Base {
  #$element;

  constructor(element) {
    this.#$element = element;
  }

  render() {
    return this.#$element;
  }

  add($child) {
    this.#$element.appendChild($child);
  }

  attachTo($parent) {
    $parent.appendChild(this.#$element);
  }

  set setElement(value) {
    this.#$element = value;
  }

  get getElement() {
    return this.#$element;
  }
}
