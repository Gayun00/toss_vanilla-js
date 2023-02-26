import { MixinComponent } from "./../Mixin/index";

export class ArticleTitle extends MixinComponent {
  constructor(title: string) {
    super();
    this.create(`
      <h1>${title}</h1>
    `);
  }
}
