import { Router } from "./utils/router";
import { Element } from "./components/Element";
import { ArticleListPage } from "./pages/ArticleListPage";
import { ArticleDetailPage } from "./pages/ArticleDetailPage";
import "./css/reset.css";

class App extends Element {
  constructor($app) {
    super($app);
    this.$app = $app;

    this.routes = [
      { path: "/article", page: new ArticleListPage() },
      { path: "/article/:id", page: new ArticleDetailPage() },
    ];
    this.init();
  }

  init() {
    window.addEventListener("historychanged", this.renderPage);
    window.addEventListener("popstate", this.renderPage);
    window.addEventListener("load", this.renderPage);
    window.addEventListener("load", this.redirectToPostListPage);

    Router.getInstance().init(this.$app, this.routes);
  }

  renderPage() {
    Router.getInstance().renderPage();
  }

  redirectToPostListPage() {
    if (window.location.pathname === "/") Router.getInstance().navigate("article");
  }
}

new App(document.querySelector(".root"));
