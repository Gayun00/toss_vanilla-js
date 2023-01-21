import { Base } from "../Base";

export class BaseComponent extends Base {
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
