interface Route {
  path: string;
  page: any; // need to replace to other type
}

interface Routes extends Array<Route>{}

export class Router {
  #$app: HTMLElement | null;
  #routes: Routes;
  private static instance: Router;

  constructor() {
    this.#routes = [];
    this.#$app = document.querySelector(".root");
  }

  static getInstance():Router {
    if (!this.instance) {
      this.instance = new Router();
    }
    return this.instance;
  }

  init($app: HTMLElement, routes:Routes) {
    this.#routes = routes;
    this.#$app = $app;
  }

  renderPage() {
    let page = this.#handleRenderPage();
    if(this.#$app) this.#$app.innerHTML = "";
    page.attachTo(this.#$app);
  }

  navigate(pathname:string, search?:string) {
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

    return this.#routes.find((route:Route) => route.path === "*").page;
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

    const setSearchParams = (params: any) => {
      const newSearchParams = this.#createQueryString(params);
      this.navigate( newSearchParams.toString() );
    };

    return [searchParams, setSearchParams];
  }

  #createQueryString(params = ""):URLSearchParams {
    const searchParams = new URLSearchParams(
      typeof params === "string" || Array.isArray(params) || params as any instanceof URLSearchParams
        ? params
        : Object.keys(params).reduce((memo, key) => {
            let value = params[key];
            return memo.concat(Array.isArray(value) ? value.map((v) => [key, v]) : [[key, value]]);
          }, [])
    );

    return searchParams;
  }

  #checkDynamicRoutePath = (routePath:string, path:string):boolean|undefined => {
    if (routePath.includes(":")) {
      if (routePath.split("/").length === path.split("/").length) {
        const pathRegex = this.#createPathRegex(routePath);
        const matchedParams = path.match(pathRegex);
        if (matchedParams) return true;
      }
    }
  };

  #createPathParams = (dynamicRouteVariables: RegExpMatchArray, pathVariables: string[]) => {
    return dynamicRouteVariables.reduce((pathParams: {}, dynamicRouteVariable, index) => {
      pathParams[dynamicRouteVariable] = pathVariables[index];
      return pathParams;
    }, {});
  };

  #getMatchedPathVariables = (routePath:string, path:string):string[]|undefined => {
    const pathRegex = this.#createPathRegex(routePath);
    const pathVariables = path.match(pathRegex)?.slice(1);
    return pathVariables;
  };

  #getDynamicPathVariables = (path:string):RegExpMatchArray|null => {
    const dynamicRouteVarRegex = new RegExp(/(?<=:)\w+/g);
    return path.match(dynamicRouteVarRegex);
  };

  #createPathRegex = (path:string) => {
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
