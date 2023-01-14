export class PageComponent {
  constructor(className) {
    this.$page = document.createElement("div");
    this.$page.classList.add(className);
  }

  attachTo($parent, position = "afterbegin") {
    $parent.insertAdjacentElement(position, this.$page);
  }
}
