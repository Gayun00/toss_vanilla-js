import { Component } from "../Component";

export class ArticleTitle extends Component {
  constructor(title: string) {
    super();
    this.create(`
      <h1>${title}</h1>
    `);
  }
}
