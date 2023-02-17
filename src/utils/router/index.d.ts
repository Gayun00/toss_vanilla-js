import Router from "./src/utils/Router/index.ts";

interface IRoute {
  path: string;
  page: any;
}

type IRoutes = Array<Iroute>;

interface Config {
  $app: HTMLElement;
  routes: IRoutes;
}

declare module Router {
  export function getInstance(): Router;
  export function init(config: Config): void;
  export function renderPage(): void;
  export function navigate(pathname: string, search: string);
  export function getPathVariables(): any;
}
