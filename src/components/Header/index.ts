import { MixinComponent } from "../Component2";
import "./index.css";

export class Header extends MixinComponent {
  constructor() {
    super();

    this.create(`
      <nav class="header">
        <div class="header_container">
          <div class="header_top">
            <span class="logo">toss tech</span>
            <button class="hamburger">button</button>
          </div>
          <span class="menu">
            <button class="menu_button">디자인</button>
            <button class="menu_button">개발</button>
            <button class="menu_button highlighted">채용 바로가기</button>
          </span>
          </div>
      </nav>
    `);
  }
}
