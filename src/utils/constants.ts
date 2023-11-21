import { IArticle } from "./interfaces";

export const API_SERVER = "http://localhost:5000";

export const articles: Array<IArticle> = [
  {
    id: 0,
    thumbnail: "https://toss.tech/wp-content/uploads/2022/12/01-1.png",
    title: "토스증권 QA 문화 ‘통합테스트’를 아시나요? (feat. 해외주식)",
    description:
      "토스증권 해외주식 출시 전에 사내 임직원 대상으로 진행한 ‘통합테스트’에 대해 소개합니다. 통합테스트 진행 방식을 참고하여 간단한 규칙과 사용자 시나리오를 활용해 사용자의 반응을 미리 확인해 보세요.",
    date: "2022. 12. 12",
  },
  {
    id: 1,
    thumbnail: "https://toss.tech/wp-content/uploads/2022/11/tech-article-nest-js-02.png",
    title: "NestJS 환경에 맞는 Custom Decorator 만들기",
    description:
      "NestJS에서 데코레이터를 만들기 위해서는 NestJS의 DI와 메타 프로그래밍 환경 등을 고려해야 합니다. 어떻게 하면 이러한 NestJS 환경에 맞는 데코레이터를 만들 수 있을지 고민해보았습니다.",
    date: "2022. 11. 22",
  },
  {
    id: 2,
    thumbnail: "https://toss.tech/wp-content/uploads/2022/10/tech-article-ts.png",
    title: "TypeScript 타입 시스템 뜯어보기: 타입 호환성",
    description:
      "타입호환성은 무엇이며 왜 필요할까요? 타입호환이 지원되지 않는 경우가 존재한다는 것을 아셨나요? 평소 익숙했던 개념들에 대해 질문을 던져가며 TypeScript 타입 시스템에 관해 심도있게 알아보고자 합니다. ",
    date: "2022. 10. 26",
  },
];
