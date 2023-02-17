import { Router } from "../../utils/router";
import { PageComponent } from "../../components/PageComponent";
import { ArticleTitle } from "../../components/ArticleTitle";

export class ArticleDetailPage extends PageComponent {
  constructor() {
    super("detail_page");
    this.init();
  }

  init() {
    window.addEventListener("historychanged", () => {
      this.getParam();
      this.render();
    });
  }

  render() {
    const $postTitle = new ArticleTitle(this.id).render();
    this.getElement.innerHTML = "";
    this.add($postTitle);
  }

  getParam() {
    const { id } = Router.getInstance().getPathVariables();
    this.id = id;
  }
}
