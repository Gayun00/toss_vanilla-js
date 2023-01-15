import { ListPage } from "../pages/List";
import { DetailPage } from "../pages/Detail";

export class Router {
  #routes;
  #$app;
  #$listPage;
  #$detailPage;

  constructor() {
    this.#$app = document.querySelector(".root");
    this.#$listPage = new ListPage();
    this.#$detailPage = new DetailPage();

    this.#routes = { "/": this.#$listPage, "/detail": this.#$detailPage };
  }

  renderPage() {
    const [_, pathname, id] = window.location.pathname.split("/");
    const page = this.#routes[`/${pathname}`];
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
