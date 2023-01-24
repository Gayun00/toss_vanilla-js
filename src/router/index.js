import { ListPage } from "../pages/List";
import { DetailPage } from "../pages/Detail";
import { handleRenderingPage } from "../utils/handleParams";

export class Router {
  #$app;

  constructor() {
    Router.instance = this;
    this.routes = this.initRoutes();
    this.#$app = document.querySelector(".root");
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new Router();
    }
    return this.instance;
  }

  initRoutes() {
    return [
      { path: "/post", page: new ListPage() },
      { path: "/post/:id", page: new DetailPage() },
    ];
  }

  renderPage() {
    const page = handleRenderingPage(this.routes, window.location.pathname);
    this.#$app.innerHTML = "";
    page.attachTo(this.#$app);
  }

  navigate(pathname, pathparam) {
    const url = new URL(window.location);
    window.history.pushState({}, "", `${url}${pathname}${pathparam ? pathparam : ""}`);
    const historyChangeEvent = new CustomEvent("historychanged", {});
    dispatchEvent(historyChangeEvent);
  }
}
