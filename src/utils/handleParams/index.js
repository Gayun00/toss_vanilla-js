import { URLSearchParams } from "url";

// handle QueryParams
export const handleQueryParams = () => {
  const searchParams = new URLSearchParams(window.location.search);
  // TODO: add handleQueryParams
};

// handle pathParams
export const handlePathParams = (routes, path) => {
  for (let route of routes) {
    if (route.path.includes(":")) {
      const dynamicRouteVarRegex = new RegExp(/:\w+/g);
      const dynamicRouteVarIdx = route.path.search(dynamicRouteVarRegex);
      const beforeVarPath = path.substr(0, dynamicRouteVarIdx - 1);
      const beforeVarRoutePath = route.path.substr(0, dynamicRouteVarIdx - 1);
      if (beforeVarPath === beforeVarRoutePath) return route.page;
    }
    if (route.path === path) return route.page;
  }
};

export const getParams = (routes, path, param) => {
  for (let route of routes) {
    if (route.path.includes(":")) {
      const dynamicRouteVarRegex = new RegExp(/:\w/g);
      const dynamicRouteVarIdx = route.path.search(dynamicRouteVarRegex);
      const beforeVarPath = path.substr(dynamicRouteVarIdx, path.length - 1);
      return beforeVarPath;
    }
  }
};
