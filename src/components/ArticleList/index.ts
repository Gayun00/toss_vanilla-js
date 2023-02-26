import { MixinComponent } from "./../Mixin/index";
import { IArticle } from "../../utils/interfaces";
import { Article } from "../Article";
import "./index.css";

export class ArticleList extends MixinComponent {
  constructor(ArticleList: Array<IArticle>) {
    super();

    this.create(`
      <ul class="post_list">
        <h1 class="post_list__title">개발</h1>
      </ul>
    `);

    ArticleList.forEach((article: IArticle) => {
      const $article = new Article(article).render();
      if ($article) this.add($article);
    });
  }
}
