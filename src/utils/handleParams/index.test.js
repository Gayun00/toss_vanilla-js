import {
  _createPathRegex,
  _getDynamicRoutingVar,
  _getMatchedDynamicRoutePath,
  _getMatchedRoute,
  _checkDynamicRouteVar,
} from ".";

const varRegex = /(?<=:)\w+/g;

const path = "/post";
const path2 = "/post/12";
const path3 = "/post/dev/12";
const path4 = "/post/tech/dev/12";

const routePath = "/post";
const routePath2 = "/post/:id";
const routePath3 = "/post/:category/:id";
const routePath4 = "/post/:category/:subject/:id";

const routes = [
  {
    path: routePath,
    page: "postListPage",
  },
  {
    path: routePath2,
    page: "postDetailPage",
  },
  {
    path: routePath3,
    page: "postCategoryPage",
  },
];

describe("test _createPathRegex", () => {
  test("test static route path", () => {
    expect(_createPathRegex(routePath)).toEqual(/^\/post$/);
  });

  test("test dynamic route path", () => {
    expect(_createPathRegex(routePath2)).toEqual(/^\/post\/(.+)$/);
  });

  test("test multiple dynamic route path", () => {
    expect(_createPathRegex(routePath3)).toEqual(/^\/post\/(.+)\/(.+)$/);
  });
});

describe("test _createPathRegex: matched path parameter", () => {
  test("test static route path", () => {
    const pathRegex = _createPathRegex(routePath);
    const matchedParam = path.match(pathRegex);
    expect(matchedParam).toContain("/post"); //["/post"]
  });

  test("test dynamic route path", () => {
    const pathRegex = _createPathRegex(routePath2);
    const matchedParam = path2.match(pathRegex);
    expect(matchedParam).toContain("/post/12", "12"); //["/post/12","12"]
  });

  test("test 2 multiple dynamic route path", () => {
    const pathRegex = _createPathRegex(routePath3);
    const matchedParam = path3.match(pathRegex);
    expect(matchedParam).toContain("/post/dev/12", "dev", "12"); //["/post/dev/12", "dev", "12"]
  });

  test("test 3 multiple dynamic route path", () => {
    const pathRegex = _createPathRegex(routePath4);
    const matchedParam = path4.match(pathRegex);
    expect(matchedParam).toContain("/post/tech/dev/12", "tech", "dev", "12"); //["/post/tech/dev/12", "tech", "dev", "12"]
  });

  test("test non-matched path", () => {
    const pathRegex = _createPathRegex(routePath3);
    const matchedParam = "/wrong".match(pathRegex);
    expect(matchedParam).toBe(null);
  });
});

describe("test _getDynamicRoutingVar: matched dynamic route variable", () => {
  test("test static route path", () => {
    expect(_getDynamicRoutingVar(routePath)).toBe(null);
  });

  test("test dynamic route path", () => {
    expect(_getDynamicRoutingVar(routePath2)).toContain("id");
  });

  test("test 2 multiple dynamic route path", () => {
    expect(_getDynamicRoutingVar(routePath3)).toContain("category", "id");
  });

  test("test 3 multiple dynamic route path", () => {
    expect(_getDynamicRoutingVar(routePath4)).toContain("category", "subject", "id");
  });
});

describe("test _checkDynamicRouteVar", () => {
  test("test static route path", () => {
    expect(_checkDynamicRouteVar(routes, path)).toEqual([{ page: "postListPage", path: "/post" }]);
  });

  test("test dynamic route path", () => {
    const [route, dynamicVarArr, matchedParamArr] = _checkDynamicRouteVar(routes, path2);
    expect(route).toEqual({ page: "postDetailPage", path: "/post/:id" });
    expect(dynamicVarArr).toBe("id");
    expect(matchedParamArr).toBe("12");
  });

  test("test multiple dynamic route path", () => {
    const [route, dynamicVarArr, matchedParamArr] = _checkDynamicRouteVar(routes, path3);
    expect(route).toEqual({ page: "postCategoryPage", path: "/post/:category/:id" });
    expect(dynamicVarArr).toBe("category");
    // expect(matchedParamArr).toBe("id");
  });
});
