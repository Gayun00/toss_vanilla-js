import { DetailPage } from "./pages/Detail/index.js";
import { ListPage } from "./pages/List/index.js";

const listPage = new ListPage();
const detailPage = new DetailPage();

export const routes = {
  "/": listPage.render(),
  "/detail": detailPage.render(),
};

export class Router {
  constructor() {
    this.$app = document.querySelector(".root");
  }

  render(pathName) {
    this.$app.innerHTML = routes[pathName];
  }

  navigate = (pathName, queryKey, queryVal) => {
    const url = new URL(window.location);
    url.searchParams.set(queryKey, queryVal);
    window.history.pushState({}, "", url + pathName);
    this.render(pathName);
  };
}
