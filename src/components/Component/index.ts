export class Component {
  $element: HTMLElement;

  constructor() {
    this.$element = document.createElement("div");
  }

  render() {
    return this.$element;
  }

  add($child: HTMLElement) {
    this.$element.appendChild($child);
  }

  attachTo($parent: HTMLElement) {
    $parent.appendChild(this.$element);
  }

  create(htmlString: string) {
    const $template = document.createElement("template");
    $template.innerHTML = htmlString;
    this.$element = $template.content.firstElementChild as HTMLElement;
    return this.$element;
  }
}
