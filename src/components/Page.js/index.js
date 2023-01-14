export class PageComponent {
  constructor(htmlString) {
    this.$element = document.createElement("ul");
    this.$element.classList.add("page");
    this.$element.innerHTML = htmlString;
  }

  attachTo($parent, position = "afterbegin") {
    $parent.insertAdjacentElement(position, this.$element);
  }
}
