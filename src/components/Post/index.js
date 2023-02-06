import { Router } from "../../router";
import { Component } from "../Component";
import "./index.css";

export class Post extends Component {
  #post;

  constructor(post) {
    super();

    this.create(`
    <li class="post_item">
      <img src=${post.thumbnail} class="post_thumbnail">
      <div>
        <h2 class="post_title">
          ${post.title}
        </h2>
        <p class="post_description">${post.description}</p>
        <p class="post_date">${post.date}</p>
      </div>
    </li>`);

    this.#post = post;
    this.#init();
  }

  #init() {
    this.getElement.addEventListener("click", () => {
      Router.getInstance().navigate(`post/${this.#post.id}`);
    });
  }
}
