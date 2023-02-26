export class PageComponent2 {
  $element: HTMLElement;

  constructor(className: string) {
    this.$element = document.createElement("div");
    this.$element?.classList.add(className);
  }
}
