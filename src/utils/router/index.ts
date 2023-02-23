import { PathParams, Routes } from "./../interfaces/index";
export class Router {
  #$app;
  #routes: Routes;
  private static instance: Router;

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

  init($app: HTMLElement, routes: Routes) {
    this.#routes = routes;
    this.#$app = $app;
  }

  renderPage() {
    let page = this.#handleRenderPage();
    if (this.#$app) this.#$app.innerHTML = "";
    page.attachTo(this.#$app);
  }

  navigate(pathname?: string, search?: string) {
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

    return this.#routes.find((route) => route.path === "*")?.page;
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
      //need to change
      const newSearchParams = this.#createQueryString(params).toString();
      this.navigate("", newSearchParams);
    };

    return [searchParams, setSearchParams];
  }

  #createQueryString(params: string | PathParams = "") {
    const searchParams = new URLSearchParams(
      typeof params === "string" || Array.isArray(params) || params instanceof URLSearchParams
        ? params
        : Object.keys(params).reduce((searchParams: string[][], key) => {
            //has to rename searchParams
            let value = params[key]; //to const
            if (!value) return searchParams;

            if (Array.isArray(value)) {
              return searchParams.concat(value.map((searchParam) => [key, searchParam]));
            } else {
              return searchParams.concat([[key, value]]); //이중 배열
            }
          }, [])
    );

    return searchParams;
  }

  #checkDynamicRoutePath = (routePath: string, path: string): boolean => {
    if (routePath.includes(":")) {
      if (routePath.split("/").length === path.split("/").length) {
        const pathRegex = this.#createPathRegex(routePath);
        const matchedParams = path.match(pathRegex);
        if (matchedParams) return true;
      }
    }
    return false;
  };

  #createPathParams = (dynamicRouteVariables: RegExpMatchArray | null, pathVariables: string[] | undefined) => {
    return dynamicRouteVariables?.reduce((pathParams: PathParams, dynamicRouteVariable, index) => {
      pathParams[dynamicRouteVariable] = pathVariables?.[index];
      return pathParams;
    }, {});
  };

  #getMatchedPathVariables = (routePath: string, path: string) => {
    const pathRegex = this.#createPathRegex(routePath);
    const pathVariables = path.match(pathRegex)?.slice(1);
    return pathVariables;
  };

  #getDynamicPathVariables = (path: string): RegExpMatchArray | null => {
    const dynamicRouteVarRegex = new RegExp(/(?<=:)\w+/g);
    return path.match(dynamicRouteVarRegex);
  };

  #createPathRegex = (path: string) => {
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
