import { MixinComponent } from "../Component2";

export class ArticleTitle extends MixinComponent {
  constructor(title: string) {
    super();
    this.create(`
      <h1>${title}</h1>
    `);
  }
}
