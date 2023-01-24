import { PageComponent } from "../../components/PageComponent";
import { PostTitle } from "../../components/PostTitle";
import { Router } from "../../router";

export class DetailPage extends PageComponent {
  constructor() {
    super("detail_page");
    this.id = null;
    this.init();
  }

  init() {
    window.addEventListener("historychanged", () => {
      this.getParam();
    });
  }

  render(id) {
    const $postTitle = new PostTitle(id).render();
    this.add($postTitle);
  }

  getParam() {
    const { id } = Router.getInstance().getParam();
    this.id = id;
    this.render(id);
  }
}
