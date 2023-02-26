import { IComponent } from "../../utils/interfaces";
import { mixinComponentMethods } from "../../utils/mixin";

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

export const Component = mixinComponentMethods(OriginComponent);
