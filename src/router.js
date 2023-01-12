import { DetailPage } from "./pages/Detail/index.js";
import { ListPage } from "./pages/List/index.js";

const listPage = new ListPage();
const detailPage = new DetailPage();

const routes = {
  "/": listPage.render(),
  "/detail": detailPage.render(),
};

export class Router {
  constructor() {
    //
  }

  render(pathName) {
    const $app = document.querySelector(".root");
    $app.innerHTML = routes[pathName];
  }

  navigate = (pathName) => {
    window.history.pushState({}, "", window.location.origin + pathName);
    this.render(pathName);
  };
}
