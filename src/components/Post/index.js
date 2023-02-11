import { Router } from "../../Router";
import { Component } from "../Component";
import "./index.css";

export class Post extends Component {
  #article;

  constructor(article) {
    super();

    this.create(`
    <li class="post_item">
      <img src=${article.thumbnail} class="post_thumbnail">
      <div>
        <h2 class="post_title">
          ${article.title}
        </h2>
        <p class="post_description">${article.description}</p>
        <p class="post_date">${article.date}</p>
      </div>
    </li>`);

    this.#article = article;
    this.#init();
  }

  #init() {
    this.getElement.addEventListener("click", () => {
      Router.getInstance().navigate(`article/${this.#article.id}`);
    });
  }
}
