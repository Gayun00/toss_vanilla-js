import { Router } from "./router";
import { Base } from "./components/Base";
import { ListPage } from "./pages/List";
import { DetailPage } from "./pages/Detail";
import "./css/reset.css";
import { NotFoundPage } from "./pages/NotFound";

class App extends Base {
  constructor($app) {
    super($app);
    this.$app = $app;

    this.routes = [
      { path: "/post", page: new ListPage() },
      { path: "/post/:id", page: new DetailPage() },
    ];
    // this.renderPostListPage(); //temporal test code
    this.init();
  }

  init() {
    window.addEventListener("historychanged", this.renderPage);
    window.addEventListener("popstate", this.renderPage);
    window.addEventListener("load", this.renderPage);

    window.addEventListener("load", this.redirectToPostListPage);

    const $notFoundPage = new NotFoundPage();
    Router.getInstance().init(this.routes, $notFoundPage);
  }

  renderPage() {
    Router.getInstance().renderPage();
  }

  // temporal test code
  // renderPostListPage() {
  //   const $listPage = new ListPage().render();
  //   this.add($listPage);
  // }

  redirectToPostListPage() {
    if (window.location.pathname === "/") Router.getInstance().navigate("post");
  }
}

new App(document.querySelector(".root"));
