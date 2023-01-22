import { URLSearchParams } from "url";

export const handleQueryParams = () => {
  const searchParams = new URLSearchParams(window.location.search);
  // TODO: add handleQueryParams
};

export const getPathParams = (routes, path) => {
  // TODO: handle path that has more than one dynamic route path variable.
  const [route, matchedParam] = _handleDynamicRoute(routes, path);

  return {
    [_getDynamicRoutingVar(route.path)]: matchedParam,
  };
};

export const handleRenderingPage = (routes, path) => {
  const [route] = _handleDynamicRoute(routes, path);
  return route.page;
};

export const _handleDynamicRoute = (routes, path) => {
  for (let route of routes) {
    if (route.path.includes(":")) {
      const pathRegex = _createPathRegex(route.path);
      const matchedParam = path.match(pathRegex)[1];
      if (!matchedParam) return;

      return [route, matchedParam];
    }
  }
};

export const _createPathRegex = (path) => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

export const _getDynamicRoutingVar = (path) => {
  const dynamicRouteVarRegex = new RegExp(/(?<=:)\w+/g);
  return dynamicRouteVarRegex.exec(path).toString();
};
