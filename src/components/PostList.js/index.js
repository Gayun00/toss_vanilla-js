import { BaseComponent } from "../BaseComponent";
import { Post } from "../Post";
import "./index.css";

export class PostList extends BaseComponent {
  constructor(postList) {
    super(`
      <ul class="post_list">
        <h1 class="post_list__title">개발</h1>
      </ul>
    `);

    postList.forEach((post) => {
      const $post = new Post(post);
      $post.attachTo(this.$element);
    });
  }
}
