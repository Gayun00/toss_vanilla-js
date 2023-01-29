import { URLSearchParams } from "url";

export const handleQueryParams = () => {
  const searchParams = new URLSearchParams(window.location.search);
  // TODO: add handleQueryParams
};

export const getPathParams = (routes, path) => {
  if (!routes) return;
  try {
    const [_, pathParamObj] = _handleRoutePath(routes, path);
    return pathParamObj;
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
        const matchedParamArr = path.match(pathRegex);
        if (!matchedParamArr) throw new Error("not supported path variable");
        matchedParamArr.shift();
        const dynamicVarArr = _getDynamicRoutingVar(route.path);

        let pathParamObj = {};

        for (let i = 0; i < dynamicVarArr.length; i++) {
          pathParamObj = {
            ...pathParamObj,
            [dynamicVarArr[i]]: matchedParamArr[i],
          };
        }

        return [route, pathParamObj];
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
