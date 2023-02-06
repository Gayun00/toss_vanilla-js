import { Component } from "../Component";
import { Post } from "../Post";
import "./index.css";

export class PostList extends Component {
  constructor(postList) {
    super();

    this.create(`
      <ul class="post_list">
        <h1 class="post_list__title">개발</h1>
      </ul>
    `);

    postList.forEach((post) => {
      const $post = new Post(post).render();
      this.add($post);
    });
  }
}
