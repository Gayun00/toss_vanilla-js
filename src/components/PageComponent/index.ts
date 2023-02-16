import { Element } from "../Element";

export class PageComponent extends Element {
  constructor(className: string) {
    super();

    this.setElement = document.createElement("div");
    this.getElement?.classList.add(className);
  }
}
