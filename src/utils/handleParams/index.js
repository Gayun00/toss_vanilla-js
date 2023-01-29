import { URLSearchParams } from "url";

export const handleQueryParams = () => {
  const searchParams = new URLSearchParams(window.location.search);
  // TODO: add handleQueryParams
};

export const getPathParams = (routes, path) => {
  if (!routes) return;
  try {
    const [_, pathParams] = _handleRoutePath(routes, path);
    return pathParams;
  } catch (err) {
    console.error(err);
  }
};

export const handleRenderPage = (routes, path) => {
  try {
    const [route] = _handleRoutePath(routes, path);
    return route.page;
  } catch (err) {
    console.error(err);
  }
};

export const _handleRoutePath = (routes, path) => {
  for (let route of routes) {
    if (route.path.includes(":")) {
      if (route.path.split("/").length === path.split("/").length) {
        const pathRegex = _createPathRegex(route.path);
        const matchedParams = path.match(pathRegex);
        if (!matchedParams) throw new Error("not supported path variable");
        matchedParams.shift();
        const dynamicVarArr = _getDynamicRoutingVar(route.path);

        let pathParams = {};

        for (let i = 0; i < dynamicVarArr.length; i++) {
          pathParams = {
            ...pathParams,
            [dynamicVarArr[i]]: matchedParams[i],
          };
        }

        return [route, pathParams];
      }
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
  return path.match(dynamicRouteVarRegex);
};
