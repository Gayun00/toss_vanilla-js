import {
  _createPathRegex,
  _getDynamicRoutingVar,
  getPathParams,
  _getMatchedDynamicRoutePath,
  handleRenderingPage,
  _handleDynamicRoute,
} from ".";

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

describe("test _createPathRegex", () => {
  test("test create dynamic route path to regex", () => {
    expect(_createPathRegex("/post/:id")).toEqual(/^\/post\/(.+)$/);
  });

  test("test get matched route path", () => {
    const pathRegex = _createPathRegex("/post/:id");
    const matchedParam = path2.match(pathRegex)[1];
    expect(matchedParam).toBe("12");
  });
});

describe("test getPathParams", () => {
  test("get matched route path with created path regex", () => {
    expect(getPathParams(routes, path2)).toEqual({
      id: "12",
    });
  });

  // TODO: add test case when route path doesn't have dynamic route variable.

  test("test _getDynamicRoutingVar", () => {
    expect(_getDynamicRoutingVar("/post/:id").toString()).toBe("id");
  });

  test("test handleDynamicRoute", () => {
    expect(_handleDynamicRoute(routes, path2)).toEqual([{ page: "postDetailPage", path: "/post/:id" }, "12"]);
  });

  test("test handleRenderingPage", () => {
    expect(handleRenderingPage(routes, path2)).toEqual("postDetailPage");
  });
});
