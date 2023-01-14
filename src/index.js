import { App } from "./components/App.js";
import { ListPage } from "./pages/List/index.js";
import "./css/reset.css";

const $app = new App();

const $listPage = new ListPage();
$app.add($listPage.render());
