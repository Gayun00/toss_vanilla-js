import { Render } from "./components/Render";
import { ListPage } from "./pages/List";
import "./css/reset.css";

class App extends Render {
  constructor($app) {
    super($app);

    this.$app = $app;

    this.$listPage = new ListPage().render();
    this.add(this.$listPage);
  }
}

new App(document.querySelector(".root"));
