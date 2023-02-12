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

  init($app, routes) {
    this.#routes = routes;
    this.#$app = $app;
  }

  renderPage() {
    let page = this.#handleRenderPage();
    this.#$app.innerHTML = "";
    page.attachTo(this.#$app);
  }

  navigate(pathname, search) {
    window.history.pushState({}, "", `${pathname ? "/" + pathname : ""}${search ? "?" + search : ""}`);
    const historyChangeEvent = new CustomEvent("historychanged", {});
    dispatchEvent(historyChangeEvent);
  }

  getPathVariables = () => {
    const path = window.location.pathname;
    for (let route of this.#routes) {
      if (this.#checkDynamicRoutePath(route.path, path)) {
        const pathVariables = this.#getMatchedPathVariables(route.path, path);
        const dynamicRouteVariables = this.#getDynamicPathVariables(route.path);
        const pathParams = this.#createPathParams(dynamicRouteVariables, pathVariables);
        return pathParams;
      }
    }
    throw new Error("no matched path variables");
  };

  #handleRenderPage = () => {
    const path = window.location.pathname;
    for (let route of this.#routes) {
      if (this.#checkDynamicRoutePath(route.path, path)) {
        const pathVariables = this.#getMatchedPathVariables(route.path, path);
        if (pathVariables) return route.page;
      } else {
        if (route.path === path) return route.page;
      }
    }

    return this.#routes.find((route) => route.path === "*").page;
  };

  handleSearchParams(initParams = "") {
    let searchParams = this.#createQueryString(initParams);
    const currentSearchParams = this.#createQueryString(window.location.search);

    for (let key of currentSearchParams.keys()) {
      if (!searchParams.has(key)) {
        currentSearchParams.getAll(key).forEach((value) => {
          searchParams.append(key, value);
        });
      }
    }

    const setSearchParams = (params) => {
      const newSearchParams = this.#createQueryString(params);
      this.navigate({ search: newSearchParams });
    };

    return [searchParams, setSearchParams];
  }

  #createQueryString(params = "") {
    const searchParams = new URLSearchParams(
      typeof params === "string" || Array.isArray(params) || params instanceof URLSearchParams
        ? params
        : Object.keys(params).reduce((memo, key) => {
            let value = params[key];
            return memo.concat(Array.isArray(value) ? value.map((v) => [key, v]) : [[key, value]]);
          }, [])
    );

    return searchParams;
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
