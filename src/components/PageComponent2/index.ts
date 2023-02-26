export class PageComponent2 {
  $element: HTMLElement | null;

  constructor(className: string) {
    this.$element = document.createElement("div");
    this.$element?.classList.add(className);
  }
}
