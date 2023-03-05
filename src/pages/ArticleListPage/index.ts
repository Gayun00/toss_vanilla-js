import { getArticles } from "../../utils/api";
import { ApiHandlers, IArticles } from "../../utils/interfaces";
import { ArticleList } from "../../components/ArticleList";
import { Banner } from "../../components/Banner";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { PageComponent } from "../../components/PageComponent";
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

    const data = await getArticles(callback);
    const articleList = new ArticleList(data);
    this.add(header.render());
    this.add(articleList.render());
    this.add(banner.render());
    this.add(footer.render());

    const $header = header.render();
    $header.addEventListener("click", (e: MouseEvent) => {
      const clickedTarget = e.target as HTMLElement;
      if (clickedTarget.className !== "hamburger") return;
      $header.classList.toggle("expanded");
    });
  }
}
