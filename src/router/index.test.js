/**
 * @jest-environment jsdom
 */

import { Router } from ".";
import { ArticleDetail } from "../pages/ArticleDetail";
import { ArticleListPage } from "../pages/ArticleList";
import { articles } from "../utils/constants";

const page = "page";
const page2 = "page2";
const page3 = "page3";
const page4 = "page4";
const page5 = "page5";

const path = "/article";
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

describe("test getPathVariables", () => {
  let temp = window.location.pathname;
  const $app = document.createElement("div");
  Router.getInstance().init($app, routes);

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

  test("test non-serial dynamic route path", () => {
    window.location = { pathname: path5 };
    expect(Router.getInstance().getPathVariables()).toEqual({ id: "4", title: "dev" });
  });
});

describe("test handleSearchParams", () => {
  let temp = window.location.search;
  const $app = document.createElement("div");
  Router.getInstance().init($app, routes);

  beforeEach(() => {
    delete window.location;
    window.location = { search: initSearch };
  });

  afterEach(() => {
    window.location.search = temp;
  });

  test("test handleSearchParams init", () => {
    expect(window.location.search).toBe(initSearch);
    const [searchParams] = Router.getInstance().handleSearchParams("sort=price");
    expect(searchParams.toString()).toBe(`sort=price&${initSearch}`);
  });
});

describe("test renderPage", () => {
  let temp = window.location.pathname;

  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(articles),
    })
  );

  const articleDetailPage = new ArticleDetail();
  const articleListPage = new ArticleListPage();

  const routes = [
    { path: "/articles", page: articleListPage },
    { path: "/article", page: articleDetailPage },
  ];

  beforeEach(() => {
    fetch.mockClear();
    delete window.location;
  });

  afterEach(() => {
    window.location.pathname = temp;
  });

  it("test renderPage()", () => {
    window.location = { pathname: "/articles" };
    const $app = document.createElement("div");
    Router.getInstance().init($app, routes);
    Router.getInstance().renderPage();
    expect($app.querySelector(".list_page")).toBeTruthy();
  });
});
