import { BaseComponent } from "../BaseComponent";
import "./index.css";

export class Post extends BaseComponent {
  constructor(post) {
    super(`
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

    window.addEventListener("historychange", ({ detail }) => {});

    this.$element.addEventListener("click", () => {
      const url = new URL(window.location);
      window.history.pushState({}, "", `${url}detail/${post.id}`);

      const historyChangeEvent = new CustomEvent("historychanged", {
        detail: {},
      });
      dispatchEvent(historyChangeEvent);
    });
  }
}
