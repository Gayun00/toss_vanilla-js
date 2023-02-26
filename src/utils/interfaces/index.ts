import { IMixin } from "./../../../dist/components/Mixin/index.d";

export interface IArticle {
  id: number;
  title: string;
  thumbnail: string;
  description: string;
  date: string;
}

export type IArticles = Array<IArticle>;

export interface Route {
  path: string;
  page: IMixin;
}

export type Routes = Array<Route>;

export interface IComponent {
  $element: HTMLElement;
}

export interface ApiHandlers {
  onSuccess(data: IArticles): void;
  onError(error: Error): void;
}

export interface FetchRequest {
  url: string;
  method?: string;
  param?: object;
  handler?: ApiHandlers;
}

export interface PathParams {
  [dynamicRouteVariable: string]: string | undefined | string[];
}
