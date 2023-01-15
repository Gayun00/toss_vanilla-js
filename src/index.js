import { ListPage } from "./pages/List";
import { routes } from "./router";
import "./css/reset.css";

class App {
  constructor($app) {
    this.$listPage = new ListPage();
    this.$listPage.attachTo($app);
    this.$app = $app;

    this.init();
  }

  init() {
    window.addEventListener("historychanged", () => {
      const [_, pathname, id] = window.location.pathname.split("/");
      const page = routes[`/${pathname}`];
      this.$app.innerHTML = "";
      page.attachTo(this.$app);
    });
  }
}

new App(document.querySelector(".root"));
