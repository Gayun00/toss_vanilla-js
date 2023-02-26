import { IComponent } from "../../utils/interfaces";
import { mixinElementMethods } from "../../utils/mixin";

class OriginPageComponent implements IComponent {
  $element: HTMLElement;

  constructor(className: string) {
    this.$element = document.createElement("div");
    this.$element?.classList.add(className);
  }
}

export const PageComponent = mixinElementMethods(OriginPageComponent);
