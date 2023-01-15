import { BaseComponent } from "../BaseComponent";
import "./index.css";

export class Header extends BaseComponent {
  constructor() {
    super(`
      <nav class="header">
        <div class="header_container">
          <span class="logo">toss tech</span>
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
