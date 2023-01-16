import { Base } from "../Base";

export class PageComponent extends Base {
  constructor(className) {
    super();

    this.setElement = document.createElement("div");
    this.getElement.classList.add(className);
  }
}
