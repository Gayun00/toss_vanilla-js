import { ListPage } from "../pages/List";
import { DetailPage } from "../pages/Detail";
import { handleRenderingPage } from "../utils/handleParams";

export class Router {
  #$app;
  #$listPage;
  #$detailPage;

  constructor() {
    this.#$app = document.querySelector(".root");
    this.#$listPage = new ListPage();
    this.#$detailPage = new DetailPage();
    this.routes = [
      { path: "/post", page: this.#$listPage },
      { path: "/post/:id", page: this.#$detailPage },
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
