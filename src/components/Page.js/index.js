import { Render } from "../Render";

export class PageComponent extends Render {
  constructor(className) {
    super();

    this.setElement = document.createElement("div");
    this.getElement.classList.add(className);
  }
}
