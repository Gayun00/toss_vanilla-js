export class Router {
  #$app;
  #routes;

  constructor() {
    this.#routes = [];
    this.#$app = document.querySelector(".root");
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new Router();
    }
    return this.instance;
  }

  init(routes) {
    this.#routes = routes;
  }

  renderPage() {
    // TODO: add test
    const page = this.handleRenderPage();
    this.#$app.innerHTML = "";
    page.attachTo(this.#$app);
  }

  navigate(pathname, pathparam) {
    const url = new URL(window.location);
    window.history.pushState({}, "", `${url}${pathname}${pathparam ? pathparam : ""}`);
    const historyChangeEvent = new CustomEvent("historychanged", {});
    dispatchEvent(historyChangeEvent);
  }

  getPathParams = () => {
    const path = window.location.pathname;
    // TODO: add error handler when routes doesn't exist
    for (let route of this.#routes) {
      if (this.#checkDynamicRoute(route.path, path)) {
        const matchedParams = this.#getMatchedParams(route.path, path);
        const dynamicVars = this.#getDynamicRoutingVar(route.path);
        const pathParams = this.#createPathParamObj(dynamicVars, matchedParams);
        return pathParams;
      }
    }
  };

  handleRenderPage = () => {
    // TODO: change to private method after update test for renderPage()
    const path = window.location.pathname;
    // TODO: add error handler when routes doesn't exist
    for (let route of this.#routes) {
      if (this.#checkDynamicRoute(route.path, path)) {
        const matchedParams = this.#getMatchedParams(route.path, path);
        if (matchedParams) return route.page;
      } else {
        if (route.path === path) return route.page;
      }
    }
  };

  #checkDynamicRoute = (routePath, path) => {
    if (routePath.includes(":")) {
      if (routePath.split("/")?.length === path.split("/")?.length) {
        return true;
      }
    }
  };

  #createPathParamObj = (dynamicVars, matchedParams) => {
    let pathParams = {};

    for (let i = 0; i < dynamicVars?.length; i++) {
      pathParams = {
        ...pathParams,
        [dynamicVars[i]]: matchedParams[i],
      };
    }

    return pathParams;
  };

  #getMatchedParams = (routePath, path) => {
    const pathRegex = this.#createPathRegex(routePath);
    const matchedParams = path.match(pathRegex);
    // if (!matchedParams) throw new Error("not supported path variable");
    matchedParams?.shift();
    // TODO: throw error when there's no matched params
    return matchedParams;
  };

  #createPathRegex = (path) => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

  #getDynamicRoutingVar = (path) => {
    const dynamicRouteVarRegex = new RegExp(/(?<=:)\w+/g);
    return path.match(dynamicRouteVarRegex);
  };
}
