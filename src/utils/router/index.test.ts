/**
 * @jest-environment jsdom
 */

import { Router } from ".";
import { articles } from "../constants";
import { ArticleDetailPage } from "../../pages/ArticleDetailPage";
import { ArticleListPage } from "../../pages/ArticleListPage";
import { NotFoundPage } from "../../pages/NotFoundPage";

const page = "page";
const page2 = "page2";
const page3 = "page3";
const page4 = "page4";
const page5 = "page5";

const path2 = "/article/12";
const path3 = "/article/dev/12";
const path4 = "/article/tech/dev/12";
const path5 = "/article-category/dev/12/4";

const routePath = "/article";
const routePath2 = "/article/:id";
const routePath3 = "/article/:category/:id";
const routePath4 = "/article/:category/:subject/:id";
const routePath5 = "/article-category/:title/12/:id";

const initSearch = "category=phone";
const $app = document.createElement("div");

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
  {
    path: routePath5,
    page: page5,
  },
];

Object.defineProperty(window, "location", {
  value: {
    pathname: "",
  },
  writable: true,
});

describe("test getPathVariables", () => {
  let temp = window.location.pathname;
  const $app = document.createElement("div");
  Router.getInstance().init($app, routes);

  beforeEach(() => {});

  afterEach(() => {
    window.location.pathname = temp;
  });

  test("test static route path", () => {
    window.location.pathname = routePath;
    expect(() => Router.getInstance().getPathVariables()).toThrowError("no matched path variables");
  });

  test("test dynamic route path", () => {
    window.location.pathname = path2;
    expect(Router.getInstance().getPathVariables()).toEqual({ id: "12" });
  });

  test("test 2 multiple dynamic route path", () => {
    window.location.pathname = path3;
    expect(Router.getInstance().getPathVariables()).toEqual({ category: "dev", id: "12" });
  });

  test("test 3 multiple dynamic route path", () => {
    window.location.pathname = path4;
    expect(Router.getInstance().getPathVariables()).toEqual({ category: "tech", subject: "dev", id: "12" });
  });

  test("test non-serial dynamic route path", () => {
    window.location.pathname = path5;
    expect(Router.getInstance().getPathVariables()).toEqual({ id: "4", title: "dev" });
  });
});

describe("test handleSearchParams", () => {
  let temp = window.location.search;
  const $app = document.createElement("div");
  Router.getInstance().init($app, routes);

  beforeEach(() => {
    window.location.search = initSearch;
  });

  afterEach(() => {
    window.location.search = temp;
  });

  test("test handleSearchParams init", () => {
    expect(window.location.search).toBe(initSearch);
    const [searchParams] = Router.getInstance().handleSearchParams("sort=price");
    expect(searchParams?.toString()).toBe(`sort=price&${initSearch}`);
  });
});

describe("test renderPage", () => {
  let temp = window.location.pathname;

  global.fetch = jest.fn(
    (): Promise<any> =>
      Promise.resolve({
        json: () => Promise.resolve(articles),
      })
  );

  const articleDetailPage = new ArticleDetailPage();
  const articleListPage = new ArticleListPage();
  const notFoundPage = new NotFoundPage();

  const routes = [
    { path: "/articles", page: articleListPage },
    { path: "/article", page: articleDetailPage },
    { path: "*", page: notFoundPage },
  ];

  beforeEach(() => {
    Router.getInstance().init($app, routes);
  });

  afterEach(() => {
    window.location.pathname = temp;
  });

  test("test articleListPage", () => {
    window.location.pathname = "/articles";
    Router.getInstance().renderPage();
    expect($app.querySelector(".list_page")).toBeTruthy();
  });

  test("test articleListPage component render", () => {
    window.location.pathname = "/articles";
    Router.getInstance().renderPage();

    expect($app.querySelector(".list_page")).toBeTruthy();
    expect($app.querySelector(".header")).toBeTruthy();
    expect($app.querySelector(".post_list")).toBeTruthy();
    expect($app.querySelector(".banner")).toBeTruthy();
    expect($app.querySelector(".footer")).toBeTruthy();
  });

  test("test articleDetailPage", () => {
    window.location.pathname = "/article";
    Router.getInstance().renderPage();
    expect($app.querySelector(".detail_page")).toBeTruthy();
  });

  test("test notFoundPage", () => {
    window.location.pathname = "/wrongPath";
    Router.getInstance().renderPage();
    expect($app.querySelector(".not_found_page")).toBeTruthy();
  });
});
