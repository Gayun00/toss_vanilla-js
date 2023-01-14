import { PageComponent } from "../../components/Page.js/index.js";
import { Header } from "../../components/Header.js/index.js";
import { Banner } from "../../components/Banner/index.js";
import { Footer } from "../../components/Footer/index.js";
import { PostList } from "../../components/PostList.js/index.js";

import "./index.css";

export class ListPage extends PageComponent {
  constructor() {
    super("list_page");

    const $header = new Header();
    const $banner = new Banner();
    const $footer = new Footer();

    this.createList().then((data) => {
      const $postList = new PostList(data);
      $header.attachTo(this.$page);
      $postList.attachTo(this.$page);
      $banner.attachTo(this.$page);
      $footer.attachTo(this.$page);
    });
  }

  createList() {
    return new Promise((resolve, reject) => {
      fetch("http://localhost:5000/posts")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          resolve(data);
        });
    });
  }
}
