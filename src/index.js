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

    this.renderPostListPage();
    this.init();
  }

  init() {
    window.addEventListener("historychanged", this.renderPage);

    window.addEventListener("popstate", () => {
      this.renderPage();
    });

    Router.getInstance().init(this.routes);
  }

  renderPostListPage() {
    // TODO: delete after refactoring to redirect to post list page route path.
    const $listPage = new ListPage().render();
    this.add($listPage);
  }

  renderPage() {
    Router.getInstance().renderPage();
  }
}

new App(document.querySelector(".root"));
