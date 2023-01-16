import { Header } from "../../components/Header.js/index.js";
import { PageComponent } from "../../components/PageComponent/index.js";
import { PostList } from "../../components/PostList.js/index.js";
import { Banner } from "../../components/Banner/index.js";
import { Footer } from "../../components/Footer/index.js";
import "./index.css";

export class ListPage extends PageComponent {
  constructor() {
    super("list_page");

    const $header = new Header().render();
    const $banner = new Banner().render();
    const $footer = new Footer().render();

    this.#createList().then((data) => {
      const $postList = new PostList(data);
      this.add($header.render());
      this.add($postList.render());
      this.add($banner.render());
      this.add($footer.render());

      $header.addEventListener("click", (e) => {
        if (e.target.className !== "hamburger") return;
        $header.classList.toggle("expanded");
      });
    });
  }

  #createList() {
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
