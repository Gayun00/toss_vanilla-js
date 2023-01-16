import { Render } from "../Render";

export class BaseComponent extends Render {
  constructor() {
    super();
  }

  create(htmlString) {
    const $template = document.createElement("template");
    $template.innerHTML = htmlString;
    this.setElement = $template.content.firstElementChild;
    return this.getElement;
  }
}
