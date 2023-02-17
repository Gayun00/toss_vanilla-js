import { Component } from "../Component";

export class ArticleTitle extends Component {
  constructor(title) {
    super();
    this.create(`
      <h1>${title}</h1>
    `);
  }
}
