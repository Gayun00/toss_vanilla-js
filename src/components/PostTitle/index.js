import { BaseComponent } from "../BaseComponent";

export class PostTitle extends BaseComponent {
  constructor(title) {
    super();
    this.create(`
      <h1>${title}</h1>
    `);
  }
}
