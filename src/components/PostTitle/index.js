import { Component } from "../Component";

export class PostTitle extends Component {
  constructor(title) {
    super();
    this.create(`
      <h1>${title}</h1>
    `);
  }
}
