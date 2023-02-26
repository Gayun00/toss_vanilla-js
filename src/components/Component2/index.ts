export class Component2 {
  $element: HTMLElement | null;
  constructor() {
    this.$element = null;
  }

  create(htmlString: string) {
    const $template = document.createElement("template");
    $template.innerHTML = htmlString;
    this.$element = $template.content.firstElementChild as HTMLElement;
  }
}
