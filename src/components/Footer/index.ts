import { MixinComponent } from "./../Mixin/index";
import "./index.css";

export class Footer extends MixinComponent {
  constructor() {
    super();

    this.create(`
      <footer class="footer">
        <div class="footer_container">
          <div class="footer_menu">
            <ul class="footer_menu__category">
              <li>토스테크</li>
              <li>
                <a href="mailto:techblog@toss.im">의견 보내기</a>
              </li>
            </ul>
            <ul class="footer_menu__category">
              <li>토스</li>
              <li>
                <a href="https://toss.im">홈페이지</a>
              </li>
              <li>
                <a href="https://team.toss.im">회사 소개</a>
              </li>
              <li>
                <a href="https://toss.im/career">채용</a>
              </li>
            </ul>
            <ul class="footer_menu__category">
              <li>고객센터</li>
              <li>
                <a href="tel:1599-4905">전화: 1599-4905 (24시간 연중무휴)</a>
              </li>
              <li>
                <a href="mailto:support.toss.im">이메일: support@toss.im</a>
              </li>
              <li>
                <a href="https://goto.kakao.com/@toss">카카오톡: @toss</a>
              </li>
            </ul>
          </div>
          <address class="footer__address">
            <p class="footer__address__company-name">㈜비바리퍼블리카</p>
            <p>Copyright © Viva Republica, Inc. All Rights Reserved.</p>
          </address>
          <ul class="footer__social-list">
            <li class="footer__social-list-item">
              <a aria-label="Toss Facebook" target="_blank" href="https://www.facebook.com/toss.revolution">
                <img src="https://static.toss.im/assets/homepage/safety/icn-facebook.svg" alt="Toss Facebook">
              </a>
            </li>
            <li class="footer__social-list-item">
              <a aria-label="Toss blog" target="_blank" href="https://blog.toss.im">
                <img src="https://static.toss.im/assets/homepage/safety/icn-blog.svg" alt="Toss blog">
              </a>
            </li>
            <li class="footer__social-list-item">
              <a aria-label="Toss Naver Post" target="_blank" href="https://article.naver.com/tossblog">
                <img src="https://static.toss.im/assets/homepage/safety/icn-naver.svg" alt="Toss Naver Post">
              </a>
            </li>
            <li class="footer__social-list-item">
              <a aria-label="Toss Twitter" target="_blank" href="https://twitter.com/toss__official">
                <img src="https://static.toss.im/assets/homepage/safety/icn-twitter.svg" alt="Toss Twitter">
              </a>
            </li>
            <li class="footer__social-list-item">
              <a aria-label="Toss Instagram" target="_blank" href="https://www.instagram.com/toss.im/">
                <img src="https://static.toss.im/assets/homepage/safety/icn-instagram.svg" alt="Toss Instagram">
              </a>
            </li>
          </ul>
        </div>
      </footer>
    `);
  }
}
