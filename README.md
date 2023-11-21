## Vanilla js로 웹 페이지 및 라우팅 기능 구현하기
- React DOM Router의 작동원리에 대한 학습 목적으로 소스코드를 참고하여 페이지 라우팅 기능 구현
- 클래스 상속을 통해 vanilla JS로 React component 구현


*toss의 기술블로그 웹페이지 UI 참고해 개발

<br>

<img width="368" alt="스크린샷 2023-09-13 오후 4 44 16" src="https://github.com/Gayun00/toss_vanilla-js/assets/67543454/6932eaee-8ecf-46ab-b6b0-f8ad4df38f1c">

<br>
<br>

### Vanilla js로 컴포넌트 구현
class문법을 사용해 프레임워크를 사용하지 않고 vanilla js로 컴포넌트 및 웹페이지를 구현했습니다.

<br>

### Router 구현
window의 history api를 사용해 라우팅 기능을 구현했습니다.
- 대응하는 path variable과 query parameter에 대한 페이지 라우팅 기능 구현
- 의존성 주입으로 사용할 수 있도록 Router 클래스 생성
- singleton 디자인 패턴을 사용한 라우터 전역 관리
- 다양한 pathname과 동적 라우팅 경로를 고려한 unit test 코드 작성




