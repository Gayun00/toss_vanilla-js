import { getPosts } from "../../utils/api.js";
import { PageComponent } from "../../components/PageComponent/index.js";
import { Header } from "../../components/Header/index.js";
import { ArticleList } from "../../components/ArticleList/index.js";
import { Banner } from "../../components/Banner/index.js";
import { Footer } from "../../components/Footer/index.js";
import "./index.css";

export class ArticleListPage extends PageComponent {
  constructor() {
    super("list_page");

    this.renderPosts();
  }

  async renderPosts() {
    const header = new Header();
    const banner = new Banner();
    const footer = new Footer();

    const callback = {
      onSuccess(data) {
        console.log("on success", data);
      },
      onError(err) {
        console.error("on error", err);
      },
    };

    const data = await getPosts(callback);
    const articleList = new ArticleList(data);
    this.add(header.render());
    this.add(articleList.render());
    this.add(banner.render());
    this.add(footer.render());

    // TODO: seperate render other section with ArticleList
    // guarantee rendering order using event loop

    header.render().addEventListener("click", (e) => {
      if (e.target.className !== "hamburger") return;
      $header.classList.toggle("expanded");
    });
  }
}
