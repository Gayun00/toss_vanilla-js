import { PageComponent } from "../../components/PageComponent";
import { ArticleTitle } from "../../components/ArticleTitle";

export class ArticleDetailPage extends PageComponent {
  id: number;
  constructor() {
    super("detail_page");
    this.init();
    this.id = 0;
  }

  init() {
    window.addEventListener("historychanged", () => {
      this.renderElement();
    });
  }

  renderElement() {
    const $postTitle = new ArticleTitle(this.id.toString()).render();
    this.$element.innerHTML = "";
    this.add($postTitle);
  }
}
