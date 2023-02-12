import { Component } from "../../components/Component";
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

class NotFoundContent extends Component {
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
