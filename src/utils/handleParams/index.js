import { URLSearchParams } from "url";

export const handleQueryParams = () => {
  const searchParams = new URLSearchParams(window.location.search);
  // TODO: add handleQueryParams
};

export const getPathParams = (routes, path) => {
  // TODO: handle path that has more than one dynamic route path variable.
  for (let route of routes) {
    if (route.path.includes(":")) {
      const pathRegex = createPathRegex(route.path);
      const matchedParam = path.match(pathRegex)[1];
      if (!matchedParam) return;

      return {
        [getDynamicRoutingVar(route.path)]: matchedParam,
      };
    }
  }
};

export const createPathRegex = (path) => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

export const getDynamicRoutingVar = (path) => {
  const dynamicRouteVarRegex = new RegExp(/(?<=:)\w+/g);
  return dynamicRouteVarRegex.exec(path).toString();
};
