export class Router {
  #$app;
  #$notFoundPage;
  #routes;

  constructor() {
    this.#routes = [];
    this.#$notFoundPage;
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
    this.#$notFoundPage = $notFoundPage;
  }

  renderPage() {
    // TODO: add test
    let page = this.#handleRenderPage();
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

  #handleRenderPage = () => {
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
    return this.#$notFoundPage;
  };

  handleSearchParams(init = "") {
    return new URLSearchParams(
      typeof init === "string" || Array.isArray(init) || init instanceof URLSearchParams
        ? init
        : Object.keys(init).reduce((memo, key) => {
            let value = init[key];
            return memo.concat(Array.isArray(value) ? value.map((v) => [key, v]) : [[key, value]]);
          }, [])
    );
  }

  #checkDynamicRoutePath = (routePath, path) => {
    if (routePath.includes(":")) {
      if (routePath.split("/").length === path.split("/").length) {
        const pathRegex = this.#createPathRegex(routePath);
        const matchedParams = path.match(pathRegex);
        if (matchedParams) return true;
      }
    }
  };

  #createPathParams = (dynamicRouteVariables, pathVariables) => {
    return dynamicRouteVariables.reduce((pathParams, dynamicRouteVariable, index) => {
      pathParams[dynamicRouteVariable] = pathVariables[index];
      return pathParams;
    }, {});
  };

  #getMatchedPathVariables = (routePath, path) => {
    const pathRegex = this.#createPathRegex(routePath);
    const pathVariables = path.match(pathRegex).slice(1);
    // if (!pathVariables) throw new Error("not supported path variable");
    // TODO: throw error when there's no matched params
    return pathVariables;
  };

  #getDynamicPathVariables = (path) => {
    const dynamicRouteVarRegex = new RegExp(/(?<=:)\w+/g);
    return path.match(dynamicRouteVarRegex);
  };

  #createPathRegex = (path) => {
    const paramNames = [];
    const regexpSource =
      "^" +
      path.replace(/^\/*/, "/").replace(/\/:(\w+)/g, (_, paramName) => {
        paramNames.push(paramName);
        return "/([^\\/]+)";
      });
    return new RegExp(regexpSource, "i");
  };
}
