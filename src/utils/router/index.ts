import { PageComponent } from "../../components/PageComponent";
import { Routes, SearchParams } from "./../interfaces/index";
export class Router {
  #$app: HTMLElement | null;
  #routes: Routes;
  private static instance: Router;

  constructor() {
    this.#routes = [];
    this.#$app = document.querySelector(".root");
  }

  static getInstance(): Router {
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
    if (!this.#$app) return;
    this.#$app.innerHTML = "";
    page?.attachTo(this.#$app);
  }

  navigate(pathname?: string, search?: string) {
    window.history.pushState({}, "", `${pathname ? "/" + pathname : ""}${search ? "?" + search : ""}`);
    const historyChangeEvent = new CustomEvent("historychanged", {});
    dispatchEvent(historyChangeEvent);
  }

  getPathVariables = (): SearchParams => {
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

  #handleRenderPage = (): PageComponent => {
    const path = window.location.pathname;
    for (let route of this.#routes) {
      if (this.#checkDynamicRoutePath(route.path, path)) {
        const pathVariables = this.#getMatchedPathVariables(route.path, path);
        if (pathVariables) return route.page;
      } else {
        if (route.path === path) return route.page;
      }
    }

    const matchedPage = this.#routes.find((route) => route.path === "*")?.page;
    if (!matchedPage) throw Error("no matched page");
    return matchedPage;
  };

  handleSearchParams(initParams = ""): (URLSearchParams | ((params: SearchParams) => void))[] {
    let searchParams = this.#createSearchParams(initParams);
    const currentSearchParams = this.#createSearchParams(window.location.search);

    for (let key of currentSearchParams.keys()) {
      if (!searchParams.has(key)) {
        currentSearchParams.getAll(key).forEach((value) => {
          searchParams.append(key, value);
        });
      }
    }

    const setSearchParams = (params: SearchParams) => {
      const newSearchParams = this.#createSearchParams(params).toString();
      this.navigate("", newSearchParams);
    };

    return [searchParams, setSearchParams];
  }

  #createSearchParams(params: string | SearchParams): URLSearchParams {
    let searchParams;
    if (typeof params === "string" || Array.isArray(params) || params instanceof URLSearchParams) {
      searchParams = new URLSearchParams(params);
    } else {
      searchParams = this.#handleObjectParams(params);
    }

    return searchParams;
  }

  #handleObjectParams = (params: SearchParams): URLSearchParams => {
    const searchParams = new URLSearchParams();
    const paramKeys = Object.keys(params);

    paramKeys.forEach((paramKey) => {
      const paramValue = params[paramKey];
      if (!paramValue) return searchParams;

      if (!Array.isArray(paramValue)) {
        searchParams.append(paramKey, paramValue.toString());
      } else {
        paramValue.forEach((value) => {
          searchParams.append(paramKey, value);
        });
      }
      return;
    });

    return searchParams;
  };

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

  #createPathParams = (dynamicRouteVariables: RegExpMatchArray, pathVariables: string[]): SearchParams => {
    return dynamicRouteVariables?.reduce((pathParams: SearchParams, dynamicRouteVariable, index) => {
      const pathParamValue = pathVariables[index];
      if (!pathParamValue) throw Error("no matched path param value");
      pathParams[dynamicRouteVariable] = pathParamValue;
      return pathParams;
    }, {});
  };

  #getMatchedPathVariables = (routePath: string, path: string): string[] => {
    const pathRegex = this.#createPathRegex(routePath);
    const pathVariables = path.match(pathRegex)?.slice(1);
    if (!pathVariables) throw Error("no matched path variable");
    return pathVariables;
  };

  #getDynamicPathVariables = (path: string): RegExpMatchArray => {
    const dynamicRouteVarRegex = new RegExp(/(?<=:)\w+/g);
    const matchedPath = path.match(dynamicRouteVarRegex);
    if (!matchedPath) throw new Error("no matched path");
    return matchedPath;
  };

  #createPathRegex = (path: string): RegExp => {
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
