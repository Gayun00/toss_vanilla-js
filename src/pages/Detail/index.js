import { Router } from "../../router";
import { PageComponent } from "../../components/PageComponent";
import { PostTitle } from "../../components/PostTitle";

export class DetailPage extends PageComponent {
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
    this.add($postTitle);
  }

  getParam() {
    const { id } = Router.getInstance().getPathParams();
    this.id = id;
  }
}
