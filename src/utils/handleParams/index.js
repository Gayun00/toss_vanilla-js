import { URLSearchParams } from "url";

export const handleQueryParams = () => {
  const searchParams = new URLSearchParams(window.location.search);
  // TODO: add handleQueryParams
};

export const getPathParams = (routes, path) => {
  // TODO: add error handler when routes doesn't exist
  try {
    for (let route of routes) {
      if (route.path.includes(":")) {
        if (route.path.split("/")?.length === path.split("/")?.length) {
          const matchedParams = _getMatchedParams(route.path, path);
          const dynamicVars = _getDynamicRoutingVar(route.path);
          const pathParams = _createPathParamObj(dynamicVars, matchedParams);
          return pathParams;
        }
      }
    }
  } catch (err) {
    console.error(err);
  }
};

export const validatePath = (path) => {
  //TODO: add error handling
};

export const _createPathParamObj = (dynamicVars, matchedParams) => {
  let pathParams = {};

  for (let i = 0; i < dynamicVars?.length; i++) {
    pathParams = {
      ...pathParams,
      [dynamicVars[i]]: matchedParams[i],
    };
  }

  return pathParams;
};

export const _getMatchedParams = (routePath, path) => {
  const pathRegex = _createPathRegex(routePath);
  const matchedParams = path.match(pathRegex);
  // if (!matchedParams) throw new Error("not supported path variable");
  matchedParams?.shift();
  // TODO: throw error when there's no matched params
  return matchedParams;
};

export const handleRenderPage = (routes, path) => {
  // TODO: add error handler when routes doesn't exist
  try {
    for (let route of routes) {
      if (route.path.includes(":")) {
        if (route.path.split("/")?.length === path.split("/")?.length) {
          const matchedParams = _getMatchedParams(route.path, path);
          if (matchedParams) return route.page;
        }
      } else {
        if (route.path === path) return route.page;
      }
    }
  } catch (err) {
    console.error(err);
  }
};

export const _createPathRegex = (path) => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

export const _getDynamicRoutingVar = (path) => {
  const dynamicRouteVarRegex = new RegExp(/(?<=:)\w+/g);
  return path.match(dynamicRouteVarRegex);
};
