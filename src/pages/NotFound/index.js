import { BaseComponent } from "../../components/BaseComponent";
import { PageComponent } from "../../components/PageComponent";
import "./index.css";

export class NotFoundPage extends PageComponent {
  constructor() {
    super("not_found_page");

    this.render();
  }

  render() {
    const $notFoundContent = new NotFoundContent().render();
    this.add($notFoundContent);
  }
}

class NotFoundContent extends BaseComponent {
  constructor() {
    super();

    this.create(`
    <div class="not">
      <h1>404</h1>
      <h2>Not Found</h2>
    </div>
    `);
  }
}
