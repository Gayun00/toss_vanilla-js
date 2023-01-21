import { Header } from "../../components/Header.js/index.js";
import { PageComponent } from "../../components/PageComponent/index.js";
import { PostList } from "../../components/PostList.js/index.js";
import { Banner } from "../../components/Banner/index.js";
import { Footer } from "../../components/Footer/index.js";
import "./index.css";
import { getPosts } from "../../utils/api.js";

export class ListPage extends PageComponent {
  constructor() {
    super("list_page");

    this.renderPosts();
  }

  async renderPosts() {
    const header = new Header();
    const banner = new Banner();
    const footer = new Footer();

    const data = await getPosts();
    const postList = new PostList(data);
    this.add(header.render());
    this.add(postList.render());
    this.add(banner.render());
    this.add(footer.render());

    // TODO: seperate render other section with postlist
    // guarantee rendering order using event loop

    header.render().addEventListener("click", (e) => {
      if (e.target.className !== "hamburger") return;
      $header.classList.toggle("expanded");
    });
  }
}
