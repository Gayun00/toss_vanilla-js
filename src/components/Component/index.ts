import { mixinElement } from "../../utils/mixin";

class Component {
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

export const MixinComponent = mixinElement(Component);
