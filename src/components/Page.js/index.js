export class PageComponent {
  constructor(htmlString) {
    this.$page = document.createElement("ul");
    this.$page.classList.add("page");
    this.$page.innerHTML = htmlString;
  }

  attachTo($parent, position = "afterbegin") {
    $parent.insertAdjacentElement(position, this.$page);
  }
}
