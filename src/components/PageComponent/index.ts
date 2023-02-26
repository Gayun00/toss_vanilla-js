import { mixinElementMethods } from "../../utils/mixin";

class OriginPageComponent {
  $element: HTMLElement;

  constructor(className: string) {
    this.$element = document.createElement("div");
    this.$element?.classList.add(className);
  }
}

export const PageComponent = mixinElementMethods(OriginPageComponent);
