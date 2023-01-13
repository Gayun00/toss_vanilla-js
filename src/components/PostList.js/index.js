import { Post } from "../Post";

export class PostList {
  constructor(postList) {
    this.postList = postList;
  }

  render() {
    const $postList = document.createElement("ul");
    $postList.innerHTML = this.postList
      .map((post) => {
        return new Post(post).render();
      })
      .join();

    return $postList;
  }
}
