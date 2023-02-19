import { ApiHandlers, IArticles } from "./../../utils/interfaces/index";
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

    const callback: ApiHandlers = {
      onSuccess(data: IArticles) {
        console.log("on success", data);
      },
      onError(err: Error) {
        console.error("on error", err);
      },
    };

    const data = await getPosts(callback);
    const articleList = new ArticleList(data);
    this.add(header.render());
    this.add(articleList.render());
    this.add(banner.render());
    this.add(footer.render());

    const $header = header.render();
    $header?.addEventListener("click", (e: MouseEvent) => {
      const clickedTarget = e.target as HTMLElement;
      if (clickedTarget.className !== "hamburger") return;
      $header.classList.toggle("expanded");
    });
  }
}
