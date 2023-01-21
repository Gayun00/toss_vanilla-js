import { Render } from "../Render";

export class PageComponent extends Render {
  constructor(className) {
    super();

    this.$element = document.createElement("div");
    this.$element.classList.add(className);
  }
}
