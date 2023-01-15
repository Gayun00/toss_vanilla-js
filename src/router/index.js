import { ListPage } from "../pages/List";
import { DetailPage } from "../pages/Detail";

export class Router {
  constructor() {
    this.$app = document.querySelector(".root");
    this.$listPage = new ListPage();
    this.$detailPage = new DetailPage();
  }

  get routes() {
    return { "/": this.$listPage, "/detail": this.$detailPage };
  }

  renderPage() {
    const [_, pathname, id] = window.location.pathname.split("/");
    const page = this.routes[`/${pathname}`];
    this.$app.innerHTML = "";
    page.attachTo(this.$app);
  }
}
