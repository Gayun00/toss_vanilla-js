import { Component } from "../Component";

export class PageComponent extends Component {
  constructor(className: string) {
    super();

    this.$element = document.createElement("div");
    this.$element.classList.add(className);
  }
}
