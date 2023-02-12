import { Component } from "../Component";
import { Post } from "../Article";
import "./index.css";

export class ArticleList extends Component {
  constructor(ArticleList) {
    super();

    this.create(`
      <ul class="post_list">
        <h1 class="post_list__title">개발</h1>
      </ul>
    `);

    ArticleList.forEach((article) => {
      const $article = new Post(article).render();
      this.add($article);
    });
  }
}
