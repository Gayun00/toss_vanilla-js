import { URLSearchParams } from "url";

export const handleQueryParams = () => {
  const searchParams = new URLSearchParams(window.location.search);
  // TODO: add handleQueryParams
};

export const getPathParams = (routes, path) => {
  if (!routes) return;
  const [route, matchedParam] = _getMatchedRoute(routes, path);
  return {
    [_getDynamicRoutingVar(route.path)]: matchedParam,
  };
};

export const handleRenderingPage = (routes, path) => {
  if (!routes) return;
  const [route] = _getMatchedRoute(routes, path);
  return route.page;
};

export const _getMatchedRoute = (routes, path) => {
  for (let route of routes) {
    if (route.path.includes(":")) {
      const pathRegex = _createPathRegex(route.path);
      const matchedParam = path.match(pathRegex) ? path.match(pathRegex)[1] : null;
      if (!matchedParam) throw new Error("not supported path variable");

      return [route, matchedParam];
    } else {
      if (route.path === path) {
        return [route];
      }
    }
  }
};

export const _createPathRegex = (path) => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

export const _getDynamicRoutingVar = (path) => {
  const dynamicRouteVarRegex = new RegExp(/(?<=:)\w+/g);
  return dynamicRouteVarRegex.exec(path)?.toString();
};
