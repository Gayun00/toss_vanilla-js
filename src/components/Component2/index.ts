export class Component2 {
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
