import { Router } from "../../router";
import { Post } from "../Post";

export class PostList {
  constructor(postList) {
    this.postList = postList;
    this.router = new Router();
  }

  render() {
    const $postList = document.createElement("ul");

    $postList.innerHTML = this.postList
      .map((post) => {
        return new Post(post).render();
      })
      .join("");

    return $postList;
  }
}
