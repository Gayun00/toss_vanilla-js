## Vanilla js project - toss

React-router의 소스코드를 살펴보고 내부 동작원리를 파악해 라우팅 기능을 학습 목적으로 구현했습니다.
toss의 기술블로그 ui를 참고했습니다.

- window의 history api를 사용한 라우팅 기능 구현 
- 대응하는 path variable과 query parameter에 대한 페이지 라우팅 기능 구현
- 의존성 주입으로 사용할 수 있도록 Router 클래스 생성
- singleton 디자인 패턴을 사용한 라우터 전역 관리
- 다양한 pathname과 동적 라우팅 경로를 고려한 unit test 코드 작성
