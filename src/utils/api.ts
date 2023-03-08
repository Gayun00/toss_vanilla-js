import { IArticles } from "./interfaces";
import { API_SERVER } from "./constants";
import { axios, AxiosOptions } from "./axios";

interface GetArticlesParams {
  size: number;
  page: number;
}

export const getArticles = (params: GetArticlesParams, handler: AxiosOptions<IArticles>) =>
  axios.get<GetArticlesParams, IArticles>({
    url: `${API_SERVER}/posts`,
    options: handler,
    params,
  });
