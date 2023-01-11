export class App {
  constructor() {
    this.$root = document.querySelector(".root");
  }

  add(dom) {
    this.$root.appendChild(dom);
  }
}
