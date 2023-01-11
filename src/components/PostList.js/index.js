import { Post } from "../Post";

export class PostList {
  constructor(postList) {
    this.postList = postList;
  }

  create() {
    const $postList = document.createElement("ul");

    this.postList.forEach((post) => {
      const $post = new Post(post).create();
      $postList.appendChild($post);
    });

    return $postList;
  }
}
