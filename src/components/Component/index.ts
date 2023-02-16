import { Element } from "../Element";

export class Component extends Element {
  constructor() {
    super();
  }

  create(htmlString: string) {
    const $template = document.createElement("template");
    $template.innerHTML = htmlString;
    this.setElement = $template.content.firstElementChild as HTMLElement;
    return this.getElement;
  }
}
