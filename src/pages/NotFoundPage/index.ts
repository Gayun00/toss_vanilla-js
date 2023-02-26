import { MixinComponent } from "../../components/Component";
import { MixinPageComponent } from "../../components/PageComponent";
import "./index.css";

export class NotFoundPage extends MixinPageComponent {
  constructor() {
    super("not_found_page");

    this.renderElement();
  }

  renderElement() {
    const $notFoundContent = new NotFoundContent().render();
    if ($notFoundContent) this.add($notFoundContent);
  }
}

class NotFoundContent extends MixinComponent {
  constructor() {
    super();

    this.create(`
    <div class="not_found_container">
      <h1>404</h1>
      <h2>Not Found</h2>
    </div>
    `);
  }
}
