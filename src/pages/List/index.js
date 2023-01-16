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

    this.fetchList().then((data) => {
      const $postList = new PostList(data).render();
      this.add($header);
      this.add($postList);
      this.add($banner);
      this.add($footer);

      $header.addEventListener("click", (e) => {
        if (e.target.className !== "hamburger") return;
        $header.classList.toggle("expanded");
      });
    });
  }

  fetchList() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch("http://localhost:5000/posts");
        const data = res.json();
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }
}
