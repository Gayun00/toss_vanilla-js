import { Router } from ".";
import {
  _createPathRegex,
  _getDynamicRoutingVar,
  _getMatchedDynamicRoutePath,
  _handleRoutePath,
  _getMatchedParams,
  _createPathParamObj,
} from "../utils/handleParams";

const page = "page";
const page2 = "page2";
const page3 = "page3";
const page4 = "page4";

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

describe("test getPathParams", () => {
  let temp = window.location.pathname;
  Router.getInstance().init(routes);

  beforeEach(() => {
    delete window.location;
  });

  afterEach(() => {
    window.location.pathname = temp;
  });

  test("test static route path", () => {
    window.location = { pathname: routePath };
    expect(Router.getInstance().getPathParams()).toBe(undefined);
  });

  test("test dynamic route path", () => {
    window.location = { pathname: path2 };
    expect(Router.getInstance().getPathParams()).toEqual({ id: "12" });
  });

  test("test 2 multiple dynamic route path", () => {
    window.location = { pathname: path3 };
    expect(Router.getInstance().getPathParams()).toEqual({ category: "dev", id: "12" });
  });

  test("test 3 multiple dynamic route path", () => {
    window.location = { pathname: path4 };
    expect(Router.getInstance().getPathParams()).toEqual({ category: "tech", subject: "dev", id: "12" });
  });
});

describe("test handleRenderPage", () => {
  let temp = window.location.pathname;
  Router.getInstance().init(routes);

  beforeEach(() => {
    delete window.location;
  });

  afterEach(() => {
    window.location.pathname = temp;
  });

  test("test static route path", () => {
    window.location = { pathname: routePath };
    expect(Router.getInstance().handleRenderPage()).toBe(page);
  });

  test("test dynamic route path", () => {
    window.location = { pathname: routePath2 };
    expect(Router.getInstance().handleRenderPage()).toBe(page2);
  });

  test("test dynamic route path", () => {
    window.location = { pathname: routePath3 };
    expect(Router.getInstance().handleRenderPage()).toBe(page3);
  });

  test("test dynamic route path", () => {
    window.location = { pathname: routePath4 };
    expect(Router.getInstance().handleRenderPage()).toBe(page4);
  });
});
