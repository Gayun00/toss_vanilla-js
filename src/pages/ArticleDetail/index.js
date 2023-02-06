import { Router } from "../../router";
import { PageComponent } from "../../components/PageComponent";
import { PostTitle } from "../../components/PostTitle";

export class ArticleDetail extends PageComponent {
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
    const $postTitle = new PostTitle(this.id).render();
    this.getElement.innerHTML = "";
    this.add($postTitle);
  }

  getParam() {
    const { id } = Router.getInstance().getPathVariables();
    this.id = id;
  }
}
