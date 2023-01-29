import { Base } from "./components/Base";
import { ListPage } from "./pages/List";
import { Router } from "./router";
import "./css/reset.css";

class App extends Base {
  constructor($app) {
    super($app);
    this.$listPage = new ListPage().render();
    this.add(this.$listPage);
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
    Router.getInstance().renderPage();
  }
}

new App(document.querySelector(".root"));
