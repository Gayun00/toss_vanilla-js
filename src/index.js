import { Router } from "./Router";
import { Element } from "./components/Element";
import { ArticleListPage } from "./pages/ArticleList";
import { ArticleDetail } from "./pages/ArticleDetail";
import { NotFoundPage } from "./pages/NotFound";
import "./css/reset.css";

class App extends Element {
  constructor($app) {
    super($app);
    this.$app = $app;

    this.routes = [
      { path: "/article", page: new ArticleListPage() },
      { path: "/article/:id", page: new ArticleDetail() },
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
  //   const $ArticleListPage = new ArticleListPage().render();
  //   this.add($ArticleListPage);
  // }

  redirectToPostListPage() {
    if (window.location.pathname === "/") Router.getInstance().navigate("article");
  }
}

new App(document.querySelector(".root"));
