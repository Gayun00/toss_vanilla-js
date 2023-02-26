import { mixinElement } from "../../utils/mixin";

class PageComponent {
  $element: HTMLElement;

  constructor(className: string) {
    this.$element = document.createElement("div");
    this.$element?.classList.add(className);
  }
}

export const MixinPageComponent = mixinElement(PageComponent);
