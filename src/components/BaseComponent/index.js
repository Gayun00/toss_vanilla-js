import { Render } from "../Render";

export class BaseComponent extends Render {
  constructor(htmlString) {
    super();

    const $template = document.createElement("template");
    $template.innerHTML = htmlString;
    this.$element = $template.content.firstElementChild;
  }

  setEvent(name, handler) {
    this.$element.addEventListener(name, handler);
  }
}
