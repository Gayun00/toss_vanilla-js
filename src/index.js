import { ListPage } from "./pages/List.js";

class App {
  constructor($appRoot) {
    this.$listPage = new ListPage();
    this.$listPage.attachTo($appRoot);
  }
}

new App(document.querySelector(".root"));
