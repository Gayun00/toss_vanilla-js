import { PageComponent } from "../components/Page.js/index.js";
import { Header } from "../components/Header.js/index.js";
import { Banner } from "../components/Banner/index.js";
import { Footer } from "../components/Footer/index.js";

export class ListPage extends PageComponent {
  constructor() {
    super(`<ul><ul>`);
    const $header = new Header();
    const $banner = new Banner();
    const $footer = new Footer();

    $header.attachTo(this.$page);
    $banner.attachTo(this.$page);
    $footer.attachTo(this.$page);
  }
}
