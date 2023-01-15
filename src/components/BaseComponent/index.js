export class BaseComponent {
  constructor(htmlString) {
    const $template = document.createElement("template");
    $template.innerHTML = htmlString;
    this.$element = $template.content.firstElementChild;
  }

  attachTo($parent, position = "beforeend") {
    $parent.insertAdjacentElement(position, this.$element);
  }

  setEvent(name, handler) {
    this.$element.addEventListener(name, handler);
  }
}
