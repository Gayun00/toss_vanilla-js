export class Router {
  #$app;
  #routes;

  constructor() {
    this.#routes = [];
    this.$notFoundPage;
    this.#$app = document.querySelector(".root");
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new Router();
    }
    return this.instance;
  }

  init(routes, $notFoundPage) {
    this.#routes = routes;
    this.$notFoundPage = $notFoundPage;
  }

  renderPage() {
    // TODO: add test
    let page = this.handleRenderPage();
    this.#$app.innerHTML = "";
    page.attachTo(this.#$app);
  }

  navigate(pathname) {
    const url = new URL(window.location);
    window.history.pushState({}, "", `/${pathname}`);
    const historyChangeEvent = new CustomEvent("historychanged", {});
    dispatchEvent(historyChangeEvent);
  }

  getPathVariables = () => {
    const path = window.location.pathname;
    // TODO: add error handler when routes doesn't exist
    for (let route of this.#routes) {
      if (this.#checkDynamicRoutePath(route.path, path)) {
        const pathVariables = this.#getMatchedPathVariables(route.path, path);
        const dynamicRouteVariables = this.#getDynamicPathVariables(route.path);
        const pathParams = this.#createPathParams(dynamicRouteVariables, pathVariables); //{ id:"12"} //createPathParams
        return pathParams;
      }
    }
  };

  handleRenderPage = () => {
    // TODO: change to private method after update test for renderPage()
    const path = window.location.pathname;
    // TODO: add error handler when routes doesn't exist
    for (let route of this.#routes) {
      if (this.#checkDynamicRoutePath(route.path, path)) {
        const pathVariables = this.#getMatchedPathVariables(route.path, path);
        if (pathVariables) return route.page;
      } else {
        if (route.path === path) return route.page;
      }
    }
    return this.$notFoundPage;
  };

  #checkDynamicRoutePath = (routePath, path) => {
    if (routePath.includes(":")) {
      if (routePath.split("/")?.length === path.split("/")?.length) {
        return true;
      }
    }
  };

  #createPathParams = (dynamicRouteVariables, pathVariables) => {
    let pathParams = {};

    for (let i = 0; i < dynamicRouteVariables?.length; i++) {
      pathParams = {
        ...pathParams,
        [dynamicRouteVariables[i]]: pathVariables[i],
      };
    }

    return pathParams;
  };

  #getMatchedPathVariables = (routePath, path) => {
    const pathRegex = this.#createPathRegex(routePath);
    const pathVariables = path.match(pathRegex);
    // if (!pathVariables) throw new Error("not supported path variable");
    pathVariables?.shift();
    // TODO: throw error when there's no matched params
    return pathVariables;
  };

  #createPathRegex = (path) => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

  #getDynamicPathVariables = (path) => {
    const dynamicRouteVarRegex = new RegExp(/(?<=:)\w+/g);
    return path.match(dynamicRouteVarRegex);
  };
}
