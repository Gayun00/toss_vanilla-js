export class Render {
  constructor(element) {
    this.$element = element;
  }

  render() {
    return this.$element;
  }

  add($child) {
    this.$element.appendChild($child);
  }
}
