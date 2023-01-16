import { ListPage } from "./pages/List";
import { Router } from "./router";
import "./css/reset.css";

class App {
  constructor($app) {
    this.$listPage = new ListPage();
    this.$listPage.attachTo($app);
    this.$app = $app;

    this.init();
  }

  init() {
    window.addEventListener("historychanged", this.renderPage);

    window.addEventListener("popstate", () => {
      this.renderPage();
    });
  }

  renderPage() {
    const router = new Router();
    router.renderPage();
  }
}

new App(document.querySelector(".root"));
