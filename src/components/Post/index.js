import { Router } from "../../router";
import "./index.css";

export class Post {
  constructor(post) {
    this.id = post.id;
    this.thumbnail = post.thumbnail;
    this.title = post.title;
    this.description = post.description;
    this.date = post.date;
  }

  render() {
    return `
      <li class="post_item">
        <div>
          <img src=${this.thumbnail} class="post_thumbnail">
        </div>
        <div>
          <h2 class="post_title">
            ${this.title}
          </h2>
          <p class="post_description">${this.description}</p>
          <p class="post_date">${this.date}</p>
        </div>
      </li>`;
  }

  goToDetail() {
    const router = new Router();
    router.navigate("/detail", "id", this.id);
  }
}
