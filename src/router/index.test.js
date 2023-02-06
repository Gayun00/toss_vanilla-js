import { Router } from ".";

const page = "page";
const page2 = "page2";
const page3 = "page3";
const page4 = "page4";

const path = "/article";
const path2 = "/article/12";
const path3 = "/article/dev/12";
const path4 = "/article/tech/dev/12";

const routePath = "/article";
const routePath2 = "/article/:id";
const routePath3 = "/article/:category/:id";
const routePath4 = "/article/:category/:subject/:id";

const routes = [
  {
    path: routePath,
    page: page,
  },
  {
    path: routePath2,
    page: page2,
  },
  {
    path: routePath3,
    page: page3,
  },
  {
    path: routePath4,
    page: page4,
  },
];

const notFoundPage = "notFoundPage";

describe("test getPathVariables", () => {
  let temp = window.location.pathname;
  Router.getInstance().init(routes, notFoundPage);

  beforeEach(() => {
    delete window.location;
  });

  afterEach(() => {
    window.location.pathname = temp;
  });

  test("test static route path", () => {
    window.location = { pathname: routePath };
    expect(Router.getInstance().getPathVariables()).toBe(undefined);
  });

  test("test dynamic route path", () => {
    window.location = { pathname: path2 };
    expect(Router.getInstance().getPathVariables()).toEqual({ id: "12" });
  });

  test("test 2 multiple dynamic route path", () => {
    window.location = { pathname: path3 };
    expect(Router.getInstance().getPathVariables()).toEqual({ category: "dev", id: "12" });
  });

  test("test 3 multiple dynamic route path", () => {
    window.location = { pathname: path4 };
    expect(Router.getInstance().getPathVariables()).toEqual({ category: "tech", subject: "dev", id: "12" });
  });
});
