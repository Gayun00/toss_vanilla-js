import { Banner } from "../components/Banner/index.js";
import { Header } from "../components/Header.js/index.js";
import { PageComponent } from "../components/Page.js/index.js";

export class ListPage extends PageComponent {
  constructor() {
    super(`<ul><ul>`);
    const $header = new Header();
    const $banner = new Banner();
    $header.attachTo(this.$page);
    $banner.attachTo(this.$page);
  }
}
