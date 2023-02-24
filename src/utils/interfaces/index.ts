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
  page: any; //need to change
}

export type Routes = Array<Route>;

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
  [dynamicRouteVariable: string]: number | string | undefined | string[];
}

export interface ObjectParams {
  [key: string]: number | string | undefined | string[];
}
