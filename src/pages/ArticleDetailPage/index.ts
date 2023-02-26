import { MixinPageComponent } from "./../../components/Mixin/index";
// import { Router } from "../../utils/router";
import { ArticleTitle } from "../../components/ArticleTitle";

export class ArticleDetailPage extends MixinPageComponent {
  id: number;
  constructor() {
    super("detail_page");
    this.init();
    this.id = 0;
  }

  init() {
    window.addEventListener("historychanged", () => {
      this.getParam();
      this.renderElement();
    });
  }

  renderElement() {
    const $postTitle = new ArticleTitle(this.id.toString()).render();
    if (this.$element) this.$element.innerHTML = "";
    if ($postTitle) this.add($postTitle);
  }

  getParam() {
    // const { id } = Router.getInstance().getPathVariables();
    // this.id = id;
  }
}
