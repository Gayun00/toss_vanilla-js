import Router from "./src/utils/Router/index.ts";

interface Config {
  $app: HTMLElement;
  routes: Routes;
}

declare module Router {
  export function getInstance(): Router;
  export function init(config: Config): void;
  export function renderPage(): void;
  export function navigate(pathname: string, search: string);
  export function getPathVariables(): any;
}
