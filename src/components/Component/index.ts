import { IComponent } from "../../utils/interfaces";
import { mixinElementMethods } from "../../utils/mixin";

class OriginComponent implements IComponent {
  $element: HTMLElement;

  constructor() {
    this.$element = document.createElement("div");
  }

  create(htmlString: string) {
    const $template = document.createElement("template");
    $template.innerHTML = htmlString;
    this.$element = $template.content.firstElementChild as HTMLElement;
  }
}

export const Component = mixinElementMethods(OriginComponent);
