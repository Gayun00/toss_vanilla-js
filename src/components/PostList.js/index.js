import { BaseComponent } from "../BaseComponent";
import { Post } from "../Post";
import "./index.css";

export class PostList extends BaseComponent {
  constructor(postList) {
    super(`<ul class="post_list"></ul>`);

    postList.forEach((post) => {
      const $post = new Post(post);
      $post.attachTo(this.$element);
    });
  }
}
