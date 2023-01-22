import { createPathRegex, getDynamicRoutingVar, getPathParams } from ".";

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

describe("test createPathRegex", () => {
  test("test create dynamic route path to regex", () => {
    expect(createPathRegex("/post/:id")).toEqual(/^\/post\/(.+)$/);
  });

  test("test get matched route path", () => {
    const pathRegex = createPathRegex("/post/:id");
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

  test("getDynamicRoutingVar", () => {
    expect(getDynamicRoutingVar("/post/:id").toString()).toBe("id");
  });
});
