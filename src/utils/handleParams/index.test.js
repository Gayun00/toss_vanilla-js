import { getParams, handlePathParams } from ".";

const routes = [
  {
    path: "/post",
    page: "postListPage",
  },
  {
    path: "/post/:id",
    page: "postDetailPage",
  },
];

const path = "/post";
const path2 = "/post/12";

describe("test handlePathParams", () => {
  test("find matched path", () => {
    expect(handlePathParams(routes, path)).toBe("postListPage");
  });

  test("test regexp", () => {
    expect(handlePathParams(routes, path2)).toBe("postDetailPage");
  });
});

describe("test getParams", () => {
  test("dsdf", () => {
    expect(getParams(routes, path2)).toBe("12");
  });
});
