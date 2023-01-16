export class Render {
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

  set setElement(value) {
    this.#$element = value;
  }

  get getElement() {
    return this.#$element;
  }
}
