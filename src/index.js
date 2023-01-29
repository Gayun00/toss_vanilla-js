import { Router } from "./router";
import { Base } from "./components/Base";
import { ListPage } from "./pages/List";
import { DetailPage } from "./pages/Detail";
import "./css/reset.css";

class App extends Base {
  constructor($app) {
    super($app);
    this.$app = $app;

    this.routes = [
      { path: "/post", page: new ListPage() },
      { path: "/post/:id", page: new DetailPage() },
    ];

    this.init();
  }

  init() {
    window.addEventListener("historychanged", this.renderPage);
    window.addEventListener("popstate", this.renderPage);
    window.addEventListener("load", this.redirectToPostListPage);

    Router.getInstance().init(this.routes);
  }

  renderPage() {
    Router.getInstance().renderPage();
  }

  redirectToPostListPage() {
    Router.getInstance().navigate("post");
  }
}

new App(document.querySelector(".root"));
