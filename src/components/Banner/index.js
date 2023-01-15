import { BaseComponent } from "../BaseComponent";
import "./index.css";

export class Banner extends BaseComponent {
  constructor() {
    super(`
      <article class="banner">
        <div class="banner_contianer">
          <img class="banner_img" src="https://static.toss.im/3d/website_code_blue_alpha.png" alt="">
          <div class="banner_text">
            <div class="banner_text__container">
              <h3 class="banner_text--title">토스팀이 만드는 수많은 혁신의 순간들</h3>
              <p class="banner_text--subtitle">당신과 함께 만들고 싶습니다. \n지금 토스팀에 합류하세요</p>
            </div>
            <button class="banner_button">채용 중인 공고 보기</button>
          </div>
        </div>
      </article>
    `);
  }
}
