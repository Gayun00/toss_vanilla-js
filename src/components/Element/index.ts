export class Element {
  #$element;

  constructor(element: HTMLElement) {
    this.#$element = element;
  }

  render() {
    return this.#$element;
  }

  add($child:HTMLElement) {
    this.#$element.appendChild($child);
  }

  attachTo($parent:HTMLElement) {
    $parent.appendChild(this.#$element);
  }

  set setElement(value:HTMLElement) {
    this.#$element = value;
  }

  get getElement() {
    return this.#$element;
  }
}
