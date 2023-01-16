import { Render } from "../Render";

export class BaseComponent extends Render {
  #$element;

  constructor() {
    super();
    this.$element;
  }

  create(htmlString) {
    const $template = document.createElement("template");
    $template.innerHTML = htmlString;
    this.#$element = $template.content.firstElementChild;
    return this.#$element;
  }
}
