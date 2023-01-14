import { routes } from "../../router";

export class App {
  constructor() {
    this.$app = document.querySelector(".root");

    window.onpopstate = () => {
      this.$app.innerHTML = routes[window.location.pathname];
    };
  }

  add(dom) {
    this.$app.appendChild(dom);
  }
}
