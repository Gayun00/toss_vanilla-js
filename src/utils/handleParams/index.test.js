import {
  _createPathRegex,
  _getDynamicRoutingVar,
  _getMatchedDynamicRoutePath,
  _handleRoutePath,
  handleRenderPage,
  getPathParams,
  _getMatchedParams,
  _createPathParamObj,
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
    page: "page",
  },
  {
    path: routePath2,
    page: "page2",
  },
  {
    path: routePath3,
    page: "page3",
  },
  {
    path: routePath4,
    page: "page4",
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

describe("test handleRenderPage", () => {
  test("test static route path", () => {
    expect(handleRenderPage(routes, path)).toBe("page");
  });

  test("test dynamic route path", () => {
    expect(handleRenderPage(routes, path2)).toBe("page2");
  });

  test("test 2 multiple dynamic route path", () => {
    expect(handleRenderPage(routes, path3)).toBe("page3");
  });

  test("test 3 multiple dynamic route path", () => {
    expect(handleRenderPage(routes, path4)).toBe("page4");
  });
});

describe("test _getMatchedParams", () => {
  test("test static path", () => {
    // expect(_getMatchedParams(path, routePath)).toContain([]);
  });

  test("test dynamic path", () => {
    expect(_getMatchedParams(routePath2, path2)).toContain("12");
  });

  test("test 2 multiple dynamic path", () => {
    expect(_getMatchedParams(routePath3, path3)).toContain("dev", "12");
  });

  test("test 3 multiple dynamic path", () => {
    expect(_getMatchedParams(routePath4, path4)).toContain("tech", "dev", "12");
  });
});

describe("test _createPathParamObj", () => {
  // TODO: add testing static path
  test("test dynamic path", () => {
    const matchedParams = _getMatchedParams(routePath2, path2);
    const dynamicVars = _getDynamicRoutingVar(routePath2);
    expect(_createPathParamObj(dynamicVars, matchedParams)).toEqual({
      id: "12",
    });
  });

  test("test 2 multiple dynamic path", () => {
    const matchedParams = _getMatchedParams(routePath3, path3);
    const dynamicVars = _getDynamicRoutingVar(routePath3);
    expect(_createPathParamObj(dynamicVars, matchedParams)).toEqual({
      category: "dev",
      id: "12",
    });
  });

  test("test 3 multiple dynamic path", () => {
    const matchedParams = _getMatchedParams(routePath4, path4);
    const dynamicVars = _getDynamicRoutingVar(routePath4);
    expect(_createPathParamObj(dynamicVars, matchedParams)).toEqual({
      category: "tech",
      subject: "dev",
      id: "12",
    });
  });
});

describe("test getPathParams", () => {
  test("test static path", () => {
    expect(getPathParams(routes, path)).toEqual(undefined);
  });

  test("test dynamic path", () => {
    expect(getPathParams(routes, path2)).toEqual({ id: "12" });
  });

  test("test 2 multiple dynamic path", () => {
    expect(getPathParams(routes, path3)).toEqual({ category: "dev", id: "12" });
  });

  test("test 3 multiple dynamic path", () => {
    expect(getPathParams(routes, path4)).toEqual({ category: "tech", subject: "dev", id: "12" });
  });
});
