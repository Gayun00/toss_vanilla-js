import { Element } from "../Element";

export class PageComponent extends Element {
  constructor(className) {
    super();

    this.setElement = document.createElement("div");
    this.getElement.classList.add(className);
  }
}
