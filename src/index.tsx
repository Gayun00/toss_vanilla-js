import { Router } from "./utils/router";
import { MixinComponent } from "./components/Component2";
import { ArticleListPage } from "./pages/ArticleListPage";
import { ArticleDetailPage } from "./pages/ArticleDetailPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import "./css/reset.css";

class App extends MixinComponent {
  routes;

  constructor() {
    super();
    this.$element = document.createElement("div");
    this.routes = [
      { path: "/article", page: new ArticleListPage() },
      { path: "/article/:id", page: new ArticleDetailPage() },
      { path: "*", page: new NotFoundPage() },
    ];
    this.init();
  }

  init() {
    window.addEventListener("historychanged", this.renderPage);
    window.addEventListener("popstate", this.renderPage);
    window.addEventListener("load", this.renderPage);
    window.addEventListener("load", this.redirectToPostListPage);
    if (this.$element) Router.getInstance().init(this.$element, this.routes);
  }

  renderPage() {
    Router.getInstance().renderPage();
  }

  redirectToPostListPage() {
    if (window.location.pathname === "/") Router.getInstance().navigate("article");
  }
}
const $root = document.querySelector(".root") as HTMLElement;
const app = new App();
if ($root) app.attachTo($root);
