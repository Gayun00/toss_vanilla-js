import { URLSearchParams } from "url";

export const handleQueryParams = () => {
  const searchParams = new URLSearchParams(window.location.search);
  // TODO: add handleQueryParams
};

export const getPathParams = (routes, path) => {
  if (!routes) return;
  const [route, dynamicVarArr, matchedParamArr] = _getDynamicRoutingVar(routes, path);
  // TODO: refactor func
  // const paramArr = _getDynamicRoutingVar(route.path).splice(0, 1);
  // let obj = {};
  // for (let i = 0; i < dynamicVarArr.length; i++) {
  //   obj = {
  //     ...obj,
  //     [dynamicVarArr[i]]: matchedParamArr[i],
  //   };
  // }

  // return obj;
};

export const handleRenderingPage = (routes, path) => {
  if (!routes) return;
  const [route] = _getMatchedRoute(routes, path);
  return route.page;
};

// TODO: delete func
export const _getMatchedRoute = (routes, path) => {
  for (let route of routes) {
    _checkDynamicRouteVar(route, path);
  }
};

export const _checkDynamicRouteVar = (routes, path) => {
  for (let route of routes) {
    if (route.path.includes(":")) {
      if (route.path.split("/").length === path.split("/").length) {
        const pathRegex = _createPathRegex(route.path);
        const matchedParamArr = path.match(pathRegex);
        matchedParamArr?.splice(0, 1);
        const dynamicVarArr = _getDynamicRoutingVar(route.path);
        if (!matchedParamArr) throw new Error("not supported path variable");

        return [route, ...dynamicVarArr, ...matchedParamArr];
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
