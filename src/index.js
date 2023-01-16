import { ListPage } from "./pages/List";
import { Router } from "./router";
import "./css/reset.css";

class App {
  constructor($app) {
    this.$listPage = new ListPage();
    this.$listPage.attachTo($app);
    this.$app = $app;

    this.router = new Router();
    this.init();
  }

  init() {
    window.addEventListener("historychanged", this.renderPage);

    window.addEventListener("popstate", this.renderPage);
  }

  renderPage() {
    this.router.renderPage();
  }
}

new App(document.querySelector(".root"));
