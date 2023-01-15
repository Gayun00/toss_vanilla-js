import { ListPage } from "../pages/List";
import { DetailPage } from "../pages/Detail";

export class Router {
  constructor() {
    this.$listPage = new ListPage();
    this.$detailPage = new DetailPage();
  }

  get routes() {
    return { "/": this.$listPage, "/detail": this.$detailPage };
  }
}
